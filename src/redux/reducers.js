import { types } from "./actions";

const initialState = {
  isNewTaskPanelOpen: true,
  hasOpenReminders: true,
  newProjectTitle: "",
  newProjectType: 1,
  isPickingProjectDate: false,
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
    default:
      return state;
  }
}
