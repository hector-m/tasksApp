import React from "react";
import { View, Text, Image } from "react-native";

export default class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { user } = this.props;
    return (
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignContent: "center",
          width: "90%",
          marginBottom: 10
          //   height: 106
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around"
          }}
        >
          <Text style={{ fontSize: 17, color: "white" }}>
            Hello {user.first_name}!
          </Text>
          {this.getTodaysReminders()}
        </View>
        <Image
          source={require("../assets/profile.jpg")}
          style={{ width: 40, height: 40, borderRadius: 40 / 2 }}
        />
      </View>
    );
  }

  getTodaysReminders() {
    let { todaysReminderCount } = this.props;
    if (todaysReminderCount > 0) {
      return (
        <Text style={{ fontSize: 10, color: "white" }}>
          Today you have {todaysReminderCount} reminders
        </Text>
      );
    }
    return (
      <Text style={{ fontSize: 10, color: "white" }}>
        Today you have no reminders
      </Text>
    );
  }
}
