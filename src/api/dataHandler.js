import json_data from '../api/sorted_data.json';


export default class DataHandler {
    static loadedReminders() {
    //   return store.getState().reminders.present;
        return json_data.Tasks; 
    }

    static loadedProjects() {
        return json_data.Projects; 
    }

    static loadedRemindersForProject(Project) {
        return this.loadedReminders.find(x => x.project === Project)
    }

    // static reminderForId(reminderId) {
    //   return this.loadedReminders().find(x => x.id === reminderId);
    // }

  }