import {
  ENTER_ADD_TASK,
  EXIT_ADD_TASK,
  CREATE_NEW_TASK,
  SWIPED_ALL_REMINDERS
} from "./types";

const initialState = {
  isNewTaskPanelOpen: true,
  hasOpenReminders: true
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case ENTER_ADD_TASK:
      console.log("ENTER_ADD_TASK");
      return { ...state, isNewTaskPanelOpen: true };
    case EXIT_ADD_TASK:
      console.log("EXIT_ADD_TASK");
      return { ...state, isNewTaskPanelOpen: false };
    case CREATE_NEW_TASK:
      console.log("CREATE_NEW_TASK");
      return { ...state, isNewTaskPanelOpen: false };
    case SWIPED_ALL_REMINDERS:
      console.log("SWIPED_ALL_REMINDERS");
      return { ...state, hasOpenReminders: false };
    default:
      return state;
  }
}

export default reducer;
