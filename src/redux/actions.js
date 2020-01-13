import { ENTER_ADD_TASK, EXIT_ADD_TASK, CREATE_NEW_TASK } from './types';

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

const actionCreators = {
    enterAddTask,
    exitAddTask,
    createNewTask
}

export { actionCreators };