import React from "react";
import { View, Text, Image } from "react-native";
import DataHandler from "../api/dataHandler";
import Header from "../components/header";



export default class HeaderContainer extends React.Component {


    render() {
        let user = this.getUserData()
        let todaysReminders = this.getTodaysReminders()
        return <Header user={user} todaysReminderCount={todaysReminders}/>
    }


    getUserData() {
        return DataHandler.loadUser()
    }

    getTodaysReminders() {
        let firstReminderDay = DataHandler.loadedReminders()[0]
        if (firstReminderDay.day == "Today") {
            return firstReminderDay.tasks.length
        }
        return 0
    }
}
