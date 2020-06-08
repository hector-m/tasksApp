import React from "react";
import { connect } from "react-redux";
import { View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { enterAddTask } from "../redux/actions";
import { getHasOpenReminders, getTodaysReminders } from "../redux/selectors";
import DataHandler from "../api/dataHandler";
import Header from "../components/header";
import RemindersHeader from "../components/remindersHeader";

class HeaderContainer extends React.Component {
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

  getRemindersHeader(todaysReminders) {
    if (this.props.hasOpenReminders) {
      return <RemindersHeader todaysReminders={todaysReminders} />;
    }
    return null;
  }

  render() {
    const { todaysReminders } = this.props;
    let user = this.getUserData();
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
          {this.getRemindersHeader(todaysReminders)}
        </LinearGradient>
      </View>
    );
  }

  getUserData() {
    return DataHandler.loadUser();
  }
}

const mapStateToProps = state => ({
  hasOpenReminders: getHasOpenReminders(state),
  todaysReminders: getTodaysReminders(state)
});

const reduxConnect = connect(mapStateToProps, {
  openNewTaskPanel: enterAddTask
});

export default reduxConnect(HeaderContainer);
