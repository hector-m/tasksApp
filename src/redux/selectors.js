import { createSelector } from "reselect";

export const getIsNewTaskPanelOpen = state => state.isNewTaskPanelOpen;
export const getHasOpenReminders = state => state.hasOpenReminders;
export const getProjectIdSelected = state => state.newProjectType;
export const getIsPickingProjectDate = state => state.isPickingProjectDate;
export const getNewProjectDate = state => state.newProjectDate;
export const getNewProjectTitle = state => state.newProjectTitle;
export const getAllTasks = state => state.allTasks;
export const getAllProjects = state => state.allProjects;
export const getProjectTasks = state => state.projectTasks;
export const getNewProjectIsReminder = state => state.isProjectReminder;
