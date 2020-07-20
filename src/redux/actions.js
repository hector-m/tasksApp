import DataHandler from "../api/dataHandler";
import NotificationsClient from "../api/NotificationsClient";
import { RequestStates } from "../constants/RequestStates";
import keyMirror from "keymirror";

export const types = keyMirror({
  SET_NAME: null,
  SET_ICON: null,
  SAVE_TO_ASYNC_STORAGE: null,
  GET_ASYNC_STORAGE: null,
  ENTER_ADD_TASK: null,
  EXIT_ADD_TASK: null,
  CREATE_NEW_TASK: null,
  UPDATE_TASK: null,
  SWIPED_ALL_REMINDERS: null,
  SWIPED_REMINDER: null,
  PROJECT_TITLE_CHANGED: null,
  PROJECT_TYPE_CLICKED: null,
  PROJECT_DATE_CLICKED: null,
  PROJECT_DATE_CHANGED: null,
  REQUEST_ALL_TASKS: null,
  REQUEST_PROJECT_TASKS: null,
  REQUEST_ALL_PROJECTS: null,
  DELETE_TASK: null,
  EDIT_TASK: null,
  SET_REMINDER_OPTION: null,
  SET_COMPLETED_OPTION: null,
  OPEN_PROJECT_PAGE: null
});

const requestActions = type => ({
  request: () => ({
    type,
    payload: RequestStates.REQUESTING
  }),
  success: data => ({
    type,
    payload: RequestStates.SUCCEEDED,
    data
  }),
  failure: error => ({
    type,
    payload: isExpiredTokenResponseText(error)
      ? RequestStates.FAILED_EXPIRED
      : RequestStates.FAILED
  })
});

const updateAction = type => payload => ({ type, payload });

export const onNameChanged = updateAction(types.SET_NAME);
export const onIconChanged = updateAction(types.SET_ICON);
export const onSaveNameAndIconToStorage = updateAction(
  types.SAVE_TO_ASYNC_STORAGE
);
export const onGetNameAndIconFromStorage = updateAction(
  types.GET_ASYNC_STORAGE
);
export const enterAddTask = updateAction(types.ENTER_ADD_TASK);
export const exitAddTask = updateAction(types.EXIT_ADD_TASK);
export const swipedAllReminders = updateAction(types.SWIPED_ALL_REMINDERS);
export const swipedReminder = updateAction(types.SWIPED_REMINDER);
export const onProjectTypeClicked = updateAction(types.PROJECT_TYPE_CLICKED);
export const onProjectDateClicked = updateAction(types.PROJECT_DATE_CLICKED);
export const onProjectDateChanged = updateAction(types.PROJECT_DATE_CHANGED);
export const onProjectTitleChanged = updateAction(types.PROJECT_TITLE_CHANGED);
export const editTask = updateAction(types.EDIT_TASK);
export const onOpenProjectPage = updateAction(types.OPEN_PROJECT_PAGE);

function updateTasks(dispatch, state) {
  if (state.projectPageId != null) {
    state.projectPageId == 0
      ? updateCompletedTasks("", dispatch)
      : updateProjectTasks(state.projectPageId, "", dispatch);
  }
  let dispatchSuccess = data => dispatch(GetAllTasks.success(data));
  DataHandler.loadedReminders(dispatchSuccess);
}
const GetAllTasks = requestActions(types.REQUEST_ALL_TASKS);
export const requestAllTasks = () => (dispatch, getState) => {
  updateTasks(dispatch, getState());
};

function updateProjectTasks(id, title, dispatch) {
  let dispatchSuccess = data => dispatch(GetProjectTasks.success(data));
  DataHandler.loadedRemindersForProject(id, title, dispatchSuccess);
}
const GetProjectTasks = requestActions(types.REQUEST_PROJECT_TASKS);
export const requestProjectTasks = (id, title) => dispatch => {
  dispatch(onOpenProjectPage(id));
  updateProjectTasks(id, title, dispatch);
};

function updateCompletedTasks(title, dispatch) {
  let dispatchSuccess = data => dispatch(GetProjectTasks.success(data));
  DataHandler.loadedCompletedReminders(title, dispatchSuccess);
}
export const requestCompletedTasks = title => dispatch => {
  dispatch(onOpenProjectPage(0));
  updateCompletedTasks(title, dispatch);
};

const GetAllProjects = requestActions(types.REQUEST_ALL_PROJECTS);
export const requestAllProjects = () => dispatch => {
  let dispatchSuccess = data => dispatch(GetAllProjects.success(data));
  DataHandler.loadedProjects(dispatchSuccess);
};

const CreateNewTask = requestActions(types.CREATE_NEW_TASK);
export const createNewTask = (
  title,
  start_time,
  end_date,
  project,
  reminder
) => (dispatch, getState) => {
  dispatch(CreateNewTask.request());
  DataHandler.addTaskToList(title, start_time, end_date, project, reminder);
  updateTasks(dispatch, getState());
  dispatch(exitAddTask());
  dispatch(CreateNewTask.success());
};

const UpdateTask = requestActions(types.UPDATE_TASK);
export const updateTask = (
  id,
  title,
  start_time,
  end_date,
  project,
  reminder
) => (dispatch, getState) => {
  dispatch(UpdateTask.request());
  DataHandler.updateTaskInList(
    id,
    title,
    start_time,
    end_date,
    project,
    reminder
  );
  if (reminder) {
    NotificationsClient.toggleNotification({ id, title, start_time }, reminder);
  }
  updateTasks(dispatch, getState());
  dispatch(exitAddTask());
  dispatch(UpdateTask.success());
};

const DeleteTask = requestActions(types.DELETE_TASK);
export const deleteTask = id => (dispatch, getState) => {
  dispatch(DeleteTask.request());
  DataHandler.deleteTaskFromList(id);
  updateTasks(dispatch, getState());
  dispatch(DeleteTask.success());
};

const SetReminderOptionForTask = requestActions(types.SET_REMINDER_OPTION);
export const setReminderOptionForTask = (task, isReminder) => (
  dispatch,
  getState
) => {
  dispatch(SetReminderOptionForTask.request());
  NotificationsClient.toggleNotification(task, isReminder)
    .then(DataHandler.setReminderOptionForTask(task.id, isReminder))
    .then(updateTasks(dispatch, getState()))
    .then(dispatch(SetReminderOptionForTask.success()));
};

const SetCompletedOptionForTask = requestActions(types.SET_COMPLETED_OPTION);
export const setCompletedOptionForTask = (task, isComplete) => (
  dispatch,
  getState
) => {
  dispatch(SetCompletedOptionForTask.request());
  if (task.reminder) {
    NotificationsClient.cancelNotification(task.id);
  }
  DataHandler.setCompleteOptionForTask(task.id, isComplete);
  updateTasks(dispatch, getState());
  dispatch(SetCompletedOptionForTask.success());
};
