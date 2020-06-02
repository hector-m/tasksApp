import {
  ENTER_ADD_TASK,
  EXIT_ADD_TASK,
  CREATE_NEW_TASK,
  SWIPED_ALL_REMINDERS,
  PROJECT_TYPE_CLICKED
} from "./types";

function enterAddTask() {
  return {
    type: ENTER_ADD_TASK
  };
}

function exitAddTask() {
  return {
    type: EXIT_ADD_TASK
  };
}

function createNewTask() {
  return {
    type: CREATE_NEW_TASK
  };
}

function swipedAllReminders() {
  return {
    type: SWIPED_ALL_REMINDERS
  };
}

function projectTypeClicked(projectId) {
  return {
    type: PROJECT_TYPE_CLICKED
  };
}

const actionCreators = {
  enterAddTask,
  exitAddTask,
  createNewTask,
  swipedAllReminders,
  projectTypeClicked
};

export { actionCreators };
