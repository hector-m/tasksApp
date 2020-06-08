import DataHandler from "../api/dataHandler";
import { RequestStates } from "../constants/RequestStates";
import keyMirror from "keymirror";

export const types = keyMirror({
  ENTER_ADD_TASK: null,
  EXIT_ADD_TASK: null,
  CREATE_NEW_TASK: null,
  SWIPED_ALL_REMINDERS: null,
  PROJECT_TITLE_CHANGED: null,
  PROJECT_TYPE_CLICKED: null,
  PROJECT_DATE_CLICKED: null,
  PROJECT_DATE_CHANGED: null,
  REQUEST_ALL_TASKS: null,
  REQUEST_PROJECT_TASKS: null,
  REQUEST_ALL_PROJECTS: null,
  DELETE_TASK: null,
  SET_REMINDER_OPTION: null,
  SET_COMPLETED_OPTION: null
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

export const enterAddTask = updateAction(types.ENTER_ADD_TASK);
export const exitAddTask = updateAction(types.EXIT_ADD_TASK);
export const swipedAllReminders = updateAction(types.SWIPED_ALL_REMINDERS);
export const onProjectTypeClicked = updateAction(types.PROJECT_TYPE_CLICKED);
export const onProjectDateClicked = updateAction(types.PROJECT_DATE_CLICKED);
export const onProjectDateChanged = updateAction(types.PROJECT_DATE_CHANGED);
export const onProjectTitleChanged = updateAction(types.PROJECT_TITLE_CHANGED);

function updateTasks(dispatch) {
  let dispatchSuccess = data => dispatch(GetAllTasks.success(data));
  DataHandler.loadedReminders(dispatchSuccess);
}
const GetAllTasks = requestActions(types.REQUEST_ALL_TASKS);
export const requestAllTasks = () => dispatch => {
  updateTasks(dispatch);
};

const GetProjectTasks = requestActions(types.REQUEST_PROJECT_TASKS);
export const requestProjectTasks = (id, title) => {
  let projectTasks = DataHandler.loadedRemindersForProject(id, title);
  return GetProjectTasks.success(projectTasks);
};

const GetAllProjects = requestActions(types.REQUEST_ALL_PROJECTS);
export const requestAllProjects = () => {
  return GetAllProjects.success(DataHandler.loadedProjects());
};

const CreateNewTask = requestActions(types.CREATE_NEW_TASK);
export const createNewTask = (
  title,
  start_time,
  end_date,
  project,
  reminder
) => dispatch => {
  dispatch(CreateNewTask.request());
  DataHandler.addTaskToList(title, start_time, end_date, project, reminder);
  updateTasks(dispatch);
  dispatch(exitAddTask());
  dispatch(CreateNewTask.success());
};

const DeleteTask = requestActions(types.DELETE_TASK);
export const deleteTask = id => dispatch => {
  dispatch(DeleteTask.request());
  DataHandler.deleteTaskFromList(id);
  updateTasks(dispatch);
  dispatch(DeleteTask.success());
};

const SetReminderOptionForTask = requestActions(types.SET_REMINDER_OPTION);
export const setReminderOptionForTask = (id, isReminder) => dispatch => {
  dispatch(SetReminderOptionForTask.request());
  DataHandler.setReminderOptionForTask(id, isReminder);
  updateTasks(dispatch);
  dispatch(SetReminderOptionForTask.success());
};

const SetCompletedOptionForTask = requestActions(types.SET_COMPLETED_OPTION);
export const setCompletedOptionForTask = (id, isComplete) => dispatch => {
  dispatch(SetCompletedOptionForTask.request());
  DataHandler.setCompleteOptionForTask(id, isComplete);
  updateTasks(dispatch);
  dispatch(SetCompletedOptionForTask.success());
};
