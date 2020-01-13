import { ENTER_ADD_TASK, EXIT_ADD_TASK, CREATE_NEW_TASK } from "./types";

const initialState = {
  isNewTaskPanelOpen: false
};

function openNewTaskPanel(state) {
  return {
    ...state,
    isNewTaskPanelOpen: true
  };
}

function closeNewTaskPanel(state) {
  return {
    ...state,
    isNewTaskPanelOpen: false
  };
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case ENTER_ADD_TASK:
      console.log("open");
      return openNewTaskPanel(state);
    case EXIT_ADD_TASK:
      console.log("close");
      return closeNewTaskPanel(state);
    case CREATE_NEW_TASK:
      return closeNewTaskPanel(state);
    default:
      return state;
  }
}

export default reducer;
