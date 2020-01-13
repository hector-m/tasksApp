import React from "react";
import { View } from "react-native";
import DataHandler from "../api/dataHandler";
import Header from "../components/header";
import RemindersHeader from "../components/remindersHeader";
import { LinearGradient } from "expo-linear-gradient";

export default class HeaderContainer extends React.Component {
  getBackgroundBubbles() {
    return (
      <View
        style={{
          position: "absolute",
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between"
        }}
      >
        <View
          style={{
            backgroundColor: "'rgba(255, 255, 255, .17)'",
            height: 211,
            width: 211,
            borderRadius: 211 / 2,
            marginTop: -105,
            marginLeft: -80
          }}
        />
        <View
          style={{
            backgroundColor: "'rgba(255, 255, 255, .17)'",
            height: 93,
            width: 93,
            borderRadius: 93 / 2,
            marginTop: -18,
            marginLeft: -18
          }}
        />
      </View>
    );
  }

  render() {
    let user = this.getUserData();
    let todaysReminders = this.getTodaysReminders();
    return (
      <View style={{ width: "100%" }}>
        <LinearGradient
          colors={["#3867D5", "#81C7F5"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{
            display: "flex",
            alignItems: "center",
            paddingTop: 55
          }}
        >
          {this.getBackgroundBubbles()}
          <Header user={user} todaysReminderCount={todaysReminders.length} />
          <RemindersHeader todaysReminders={todaysReminders} />
        </LinearGradient>
      </View>
    );
  }

  getUserData() {
    return DataHandler.loadUser();
  }

  getTodaysTasks() {
    let firstReminderDay = DataHandler.loadedReminders()[0];
    if (firstReminderDay.day == "Today") {
      return firstReminderDay.tasks;
    }
    return [];
  }

  getTodaysReminders() {
    return DataHandler.getTodaysReminders();
  }
}
