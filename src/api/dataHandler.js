import json_data from '../api/sorted_data.json';


export default class DataHandler {
    static loadedReminders() {
        return json_data.Tasks; 
    }

    static loadedProjects() {
        return json_data.Projects; 
    }

    static loadedRemindersForProject(projectId, title) {
        let tasks = json_data.Tasks[0].tasks.find(x => x.project === projectId)
        return [{"day": title, "tasks": [tasks]}]
    }

    // static reminderForId(reminderId) {
    //   return this.loadedReminders().find(x => x.id === reminderId);
    // }

  }