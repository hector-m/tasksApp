import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true
  })
});

export default class NotificationsClient {
  static toggleNotification = async (task, shouldSetNotification) => {
    if (shouldSetNotification) {
      return this.scheduleNotification(task.id, task.title, task.start_time);
    }
    return this.cancelNotification(task.id);
  };

  static scheduleNotification = async (id, titleText, time) => {
    let trigger = new Date(time);
    trigger.setSeconds(0, 0);
    if (trigger < new Date()) {
      return;
    }

    return Notifications.scheduleNotificationAsync({
      identifier: String(id),
      content: {
        sound: "default",
        title: titleText
      },
      trigger
    });
  };

  static cancelNotification = async id => {
    return Notifications.cancelScheduledNotificationAsync(id);
  };
}
