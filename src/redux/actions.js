export const types = {
  ENTER_ADD_TASK: "ENTER_ADD_TASK",
  EXIT_ADD_TASK: "EXIT_ADD_TASK",
  CREATE_NEW_TASK: "CREATE_NEW_TASK",
  SWIPED_ALL_REMINDERS: "SWIPED_ALL_REMINDERS",
  PROJECT_TYPE_CLICKED: "PROJECT_TYPE_CLICKED",
  PROJECT_DATE_CLICKED: "PROJECT_DATE_CLICKED",
  PROJECT_DATE_CHANGED: "PROJECT_DATE_CHANGED"
};

const requestActions = type => ({
  request: () => ({
    type,
    payload: RequestStates.REQUESTING
  }),
  success: data => ({
    type,
    payload: RequestStates.SUCCEEDED,
    data
  }),
  failure: error => ({
    type,
    payload: isExpiredTokenResponseText(error)
      ? RequestStates.FAILED_EXPIRED
      : RequestStates.FAILED
  })
});

const updateAction = type => payload => ({ type, payload });

export const enterAddTask = updateAction(types.ENTER_ADD_TASK);
export const exitAddTask = updateAction(types.EXIT_ADD_TASK);
export const createNewTask = updateAction(types.CREATE_NEW_TASK);
export const swipedAllReminders = updateAction(types.SWIPED_ALL_REMINDERS);
export const onProjectTypeClicked = updateAction(types.PROJECT_TYPE_CLICKED);
export const onProjectDateClicked = updateAction(types.PROJECT_DATE_CLICKED);
export const onProjectDateChanged = updateAction(types.PROJECT_DATE_CHANGED);
