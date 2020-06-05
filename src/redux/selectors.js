import { createSelector } from "reselect";

const getIsNewTaskPanelOpenState = state => state.isNewTaskPanelOpen;
const getHasOpenRemindersState = state => state.hasOpenReminders;
const getProjectIdSelectedState = state => state.newProjectType;
const getIsPickingProjectDateState = state => state.isPickingProjectDate;
const getNewProjectDateState = state => state.newProjectDate;

export const getIsNewTaskPanelOpen = createSelector(
  [getIsNewTaskPanelOpenState],
  isNewTaskPanelOpen => {
    return isNewTaskPanelOpen;
  }
);

export const getHasOpenReminders = createSelector(
  [getHasOpenRemindersState],
  hasOpenReminders => {
    return hasOpenReminders;
  }
);

export const getProjectIdSelected = createSelector(
  [getProjectIdSelectedState],
  projectIdSelected => {
    return projectIdSelected;
  }
);

export const getIsPickingProjectDate = createSelector(
  [getIsPickingProjectDateState],
  isPickingProjectDateState => {
    return isPickingProjectDateState;
  }
);

export const getNewProjectDate = createSelector(
  [getNewProjectDateState],
  newProjectDateState => {
    return newProjectDateState;
  }
);
