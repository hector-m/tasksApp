import { types } from "./actions";

const initialState = {
  isNewTaskPanelOpen: true,
  hasOpenReminders: true,
  newProjectTitle: "",
  newProjectType: 1,
  newProjectDate: null
};

export default function reducer(state = initialState, action) {
  console.log(action.type, "Payload: ", action.payload);
  switch (action.type) {
    case types.ENTER_ADD_TASK:
      return { ...state, isNewTaskPanelOpen: true };
    case types.EXIT_ADD_TASK:
      return { ...state, isNewTaskPanelOpen: false };
    case types.CREATE_NEW_TASK:
      return { ...state, isNewTaskPanelOpen: false };
    case types.SWIPED_ALL_REMINDERS:
      return { ...state, hasOpenReminders: false };
    case types.PROJECT_TYPE_CLICKED:
      return { ...state, newProjectType: action.payload };
    default:
      return state;
  }
}
