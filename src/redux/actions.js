import {
  ENTER_ADD_TASK,
  EXIT_ADD_TASK,
  CREATE_NEW_TASK,
  SWIPED_ALL_REMINDERS
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

const actionCreators = {
  enterAddTask,
  exitAddTask,
  createNewTask,
  swipedAllReminders
};

export { actionCreators };
