import React from "react";
import { connect } from "react-redux";
import { View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { enterAddTask } from "../redux/actions";
import {
  getHasOpenReminders,
  getTodaysReminders,
  getIcon,
  getName
} from "../redux/selectors";
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

  getRemindersHeader() {
    const { todaysReminders } = this.props;
    // TODO: FIX HEADER
    // if (this.props.hasOpenReminders) {
    //   return <RemindersHeader todaysReminders={todaysReminders} />;
    // }
    return null;
  }

  onProfilePressed = () => {
    const { navigation } = this.props;

    const { routeName } = navigation.state;
    if (routeName === "SetUp") {
      navigation.navigate("App");
    } else {
      navigation.navigate("SetUp");
    }
  };

  render() {
    const { name, icon, todaysReminders } = this.props;
    return (
      <View style={{ width: "100%" }}>
        <LinearGradient
          colors={["#3867D5", "#81C7F5"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{
            display: "flex",
            alignItems: "center",
            paddingTop: 39
          }}
        >
          {this.getBackgroundBubbles()}
          <Header
            userName={name}
            icon={icon}
            todaysReminderCount={todaysReminders.length}
            onProfilePressed={this.onProfilePressed}
          />
          {this.getRemindersHeader()}
        </LinearGradient>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  hasOpenReminders: getHasOpenReminders(state),
  todaysReminders: getTodaysReminders(state),
  name: getName(state),
  icon: getIcon(state)
});

const reduxConnect = connect(mapStateToProps, {
  openNewTaskPanel: enterAddTask
});

export default reduxConnect(HeaderContainer);
