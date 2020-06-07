import json_data from "../api/sorted_data.json";
import { getAllTasks, addTask, deleteTask } from "./tasksDao";

export default class DataHandler {
  static loadedReminders(dispatchSuccess) {
    getAllTasks(dispatchSuccess);
  }

  static loadedProjects() {
    return json_data.Projects;
  }

  static loadUser() {
    return json_data.User;
  }

  static loadedRemindersForProject(projectId, title) {
    let tasksByDay = json_data.Tasks;
    let response = { title: title, days: [] };
    tasksByDay.forEach(dayObject => {
      let tasks = dayObject.tasks.find(x => x.project === projectId);
      if (tasks != undefined) {
        response.days.push({ day: dayObject.day, tasks: [tasks] });
      }
    });
    return response;
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

  static deleteTaskFromList(id) {
    deleteTask(id);
  }

  // static reminderForId(reminderId) {
  //   return this.loadedReminders().find(x => x.id === reminderId);
  // }
}
