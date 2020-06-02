import {
  ENTER_ADD_TASK,
  EXIT_ADD_TASK,
  CREATE_NEW_TASK,
  SWIPED_ALL_REMINDERS,
  PROJECT_TYPE_CLICKED
} from "./types";

const initialState = {
  isNewTaskPanelOpen: true,
  hasOpenReminders: true,
  newProject: {
    title: "",
    project: 1,
    data: null
  }
};

function reducer(state = initialState, action) {
  console.log(action.type);
  switch (action.type) {
    case ENTER_ADD_TASK:
      return { ...state, isNewTaskPanelOpen: true };
    case EXIT_ADD_TASK:
      return { ...state, isNewTaskPanelOpen: false };
    case CREATE_NEW_TASK:
      return { ...state, isNewTaskPanelOpen: false };
    case SWIPED_ALL_REMINDERS:
      return { ...state, hasOpenReminders: false };
    case PROJECT_TYPE_CLICKED:
      return { ...state };
    default:
      return state;
  }
}

export default reducer;
