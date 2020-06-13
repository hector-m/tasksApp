import json_data from "../api/sorted_data.json";
import {
  getAllTasks,
  addTask,
  updateTask,
  deleteTask,
  setReminderForTask,
  setCompleteForTask,
  getTasksInProject
} from "./tasksDao";
import { getAllProjects } from "./projectsDao";

export default class DataHandler {
  static loadedReminders(dispatchSuccess) {
    getAllTasks(dispatchSuccess);
  }

  static loadedProjects(dispatchSuccess) {
    getAllProjects(dispatchSuccess);
  }

  static loadUser() {
    return json_data.User;
  }

  static loadedRemindersForProject(projectId, title, dispatchSuccess) {
    getTasksInProject(projectId, title, dispatchSuccess);
  }

  static getTodaysReminders() {
    let tasksByDay = json_data.Tasks;
    let response = [];
    for (let dayObject of tasksByDay) {
      if (dayObject.day == "Today") {
        response = dayObject.tasks.filter(x => x.reminder == true);
      }
    }
    return response;
  }

  static addTaskToList(title, start_time, end_date, project, reminder) {
    addTask(title, start_time, end_date, project, reminder);
  }

  static updateTaskInList(id, title, start_time, end_date, project, reminder) {
    updateTask(id, title, start_time, end_date, project, reminder);
  }

  static deleteTaskFromList(id) {
    deleteTask(id);
  }

  static setReminderOptionForTask(id, isReminder) {
    setReminderForTask(id, isReminder);
  }

  static setCompleteOptionForTask(id, isReminder) {
    setCompleteForTask(id, isReminder);
  }

  // static reminderForId(reminderId) {
  //   return this.loadedReminders().find(x => x.id === reminderId);
  // }
}
