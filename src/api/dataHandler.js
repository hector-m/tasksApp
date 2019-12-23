import json_data from '../api/sorted_data.json';


export default class DataHandler {
    static loadedReminders() {
        return json_data.Tasks; 
    }

    static loadedProjects() {
        return json_data.Projects; 
    }

    static loadUser() {
        return json_data.User; 
    }

    static loadedRemindersForProject(projectId, title) {
        let tasksByDay = json_data.Tasks
        let response = {"title": title, "days": []}
        tasksByDay.forEach( dayObject => {
            let tasks = dayObject.tasks.find(x => x.project === projectId)
            if (tasks != undefined) {
                response.days.push({"day": dayObject.day, "tasks": [tasks]})
            }
        })
        return response
    }

    // static reminderForId(reminderId) {
    //   return this.loadedReminders().find(x => x.id === reminderId);
    // }

  }