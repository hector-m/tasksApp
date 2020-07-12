import * as Notifications from "expo-notifications";

export default class NotificationsClient {
  static toggleNotification = async (task, shouldSetNotification) => {
    if (shouldSetNotification) {
      return this.scheduleNotification(task.id, task.title, task.start_time);
    }
    return this.cancelNotification(task.id);
  };

  static scheduleNotification = async (id, titleText, time) => {
    let now = Date.now();
    now.setSeconds(0);
    let trigger = new Date(time - now);

    return Notifications.scheduleNotificationAsync({
      identifier: id,
      content: {
        title: titleText
      },
      trigger
    });
  };

  static cancelNotification = async id => {
    return Notifications.cancelScheduledNotificationAsync(id);
  };
}
