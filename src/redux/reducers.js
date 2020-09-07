import { Asset } from "expo-asset";
import { types } from "./actions";
import {
  RequestStates,
  requestSucceeded,
  requestFailed
} from "../constants/RequestStates";

const initialState = {
  hasAsyncStorageSet: false,
  name: "",
  icon: Asset.fromModule(require("../assets/defaultIcon.jpg")).uri,
  allTasks: [],
  allProjects: [],
  projectTasks: { days: { hasReminders: false, tasks: [] }, title: "" },
  isPanelOpen: false,
  isSettingNewTask: false,
  isEditingTask: false,
  taskEditingId: null,
  hasOpenReminders: false,
  todaysReminders: [],
  cardIndex: 0,
  newProjectTitle: "",
  newProjectType: 1,
  isPickingProjectDate: false,
  newProjectDate: null,
  isProjectReminder: false,
  projectPageId: null
};

export default function reducer(state = initialState, action) {
  // console.log(action.type, "Payload: ", action.payload);
  switch (action.type) {
    case types.SET_NAME:
      return { ...state, name: action.payload };
    case types.SET_ICON:
      return { ...state, icon: action.payload };
    case types.SAVE_TO_ASYNC_STORAGE:
      return { ...state, hasAsyncStorageSet: true };
    case types.GET_ASYNC_STORAGE:
      if (action.payload.icon) {
        return {
          ...state,
          name: action.payload.name,
          icon: action.payload.icon
        };
      }
      return { ...state };
    case types.ENTER_ADD_TASK:
      return { ...state, isPanelOpen: true, isSettingNewTask: true };
    case types.EXIT_ADD_TASK:
      return {
        ...state,
        isPanelOpen: false,
        isSettingNewTask: false,
        isEditingTask: false,
        newProjectTitle: "",
        newProjectType: 1,
        isPickingProjectDate: false,
        newProjectDate: null,
        isProjectReminder: false,
        taskEditingId: null
      };
    case types.CREATE_NEW_TASK:
      return {
        ...state,
        newProjectTitle: "",
        newProjectType: 1,
        isPickingProjectDate: false,
        newProjectDate: null,
        isProjectReminder: false
      };
    case types.SWIPED_ALL_REMINDERS:
      return { ...state, hasOpenReminders: false };
    case types.SWIPED_REMINDER:
      let all_reminders = state.todaysReminders;
      // all_reminders.splice(0, 1);
      return {
        ...state,
        todaysReminders: all_reminders,
        cardIndex: 1
      };
    case types.PROJECT_TITLE_CHANGED:
      return { ...state, newProjectTitle: action.payload };
    case types.PROJECT_TYPE_CLICKED:
      return { ...state, newProjectType: action.payload };
    case types.PROJECT_DATE_CLICKED:
      let date = state.newProjectDate ? state.newProjectDate : new Date();
      return {
        ...state,
        isPickingProjectDate: !state.isPickingProjectDate,
        newProjectDate: date
      };
    case types.PROJECT_DATE_CHANGED:
      return { ...state, newProjectDate: action.payload };
    case types.REQUEST_ALL_TASKS:
      let allTasks = action.data.tasks;
      if (!action.data.hasReminders) {
        return {
          ...state,
          allTasks,
          hasOpenReminders: false,
          todaysReminders: []
        };
      }
      let reminders = [];
      for (dayTasks of allTasks) {
        dayTasks.data.forEach(task => {
          task.reminder && !task.complete ? reminders.push(task) : null;
        });
        if (dayTasks.day == "Today") {
          break;
        }
      }
      return {
        ...state,
        allTasks,
        hasOpenReminders: reminders.length != 0,
        todaysReminders: reminders,
        cardIndex: 0
      };
    case types.REQUEST_ALL_PROJECTS:
      return { ...state, allProjects: action.data };
    case types.REQUEST_PROJECT_TASKS:
      return { ...state, projectTasks: action.data };
    case types.EDIT_TASK:
      return {
        ...state,
        isPanelOpen: true,
        isEditingTask: true,
        isPickingProjectDate: false,
        taskEditingId: action.payload.id,
        newProjectTitle: action.payload.title,
        newProjectType: action.payload.project,
        newProjectDate: action.payload.start
          ? new Date(action.payload.start)
          : null,
        isProjectReminder: action.payload.reminder
      };
    case types.OPEN_PROJECT_PAGE:
      return { ...state, projectPageId: action.payload };
    default:
      return state;
  }
}
