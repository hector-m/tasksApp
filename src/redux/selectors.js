import { createSelector } from "reselect";

const getIsNewTaskPanelOpenState = state => state.isNewTaskPanelOpen;
const getHasOpenRemindersState = state => state.hasOpenReminders;
const getProjectIdSelectedState = state => state.newProjectType;

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
