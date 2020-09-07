import moment from "moment";
import {
  getAllTasks,
  addTask,
  updateTask,
  deleteTask,
  setReminderForTask,
  setCompleteForTask,
  getTasksInProject,
  getCompletedTasks,
  getTaskCountForProjects
} from "./tasksDao";
import { getAllProjects } from "./projectsDao";

export default class DataHandler {
  static loadedReminders = async dispatchSuccess => {
    const tasks = await getAllTasks();
    let formated = this.formatTasks(tasks);
    dispatchSuccess(formated);
  };

  static loadedProjects = async dispatchSuccess => {
    let response = [];
    const projects = await getAllProjects();
    const taskCountForProjects = await getTaskCountForProjects();
    projects.forEach(project => {
      project.count = taskCountForProjects.has(project.id)
        ? taskCountForProjects.get(project.id)
        : 0;
      response.push(project);
    });
    dispatchSuccess(projects);
  };

  static loadedRemindersForProject = async (
    projectId,
    title,
    dispatchSuccess
  ) => {
    const tasks = await getTasksInProject(projectId);
    let formated = { title: title, days: this.formatTasks(tasks) };
    dispatchSuccess(formated);
  };

  static loadedCompletedReminders = async (title, dispatchSuccess) => {
    const tasks = await getCompletedTasks(title, dispatchSuccess);
    let formated = { title: title, days: this.formatTasks(tasks) };
    dispatchSuccess(formated);
  };

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

  static formatTasks(data) {
    let responseMap = new Map();
    let hasReminders = false;
    data.forEach(task => {
      let time = moment(task.start_time).calendar({
        sameDay: "[Today]",
        nextDay: "[Tomorrow]",
        nextWeek: "dddd",
        lastDay: "[Yesterday]",
        lastWeek: "[Last] dddd",
        sameElse: "MMMM Do"
      });
      if (
        !hasReminders &&
        task.reminder &&
        moment(task.start_time).isBefore(moment().add(1, "day"))
      ) {
        hasReminders = true;
      }
      if (!moment(task.start_time).isValid()) {
        time = "";
      }
      responseMap.has(time)
        ? responseMap.get(time).push(task)
        : responseMap.set(time, [task]);
    });

    let responseTasksByDay = [];
    responseMap.forEach((value, key) => {
      responseTasksByDay.push({ day: key, data: value });
    });

    return { tasks: responseTasksByDay, hasReminders: hasReminders };
  }
}
