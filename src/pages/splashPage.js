import React from "react";
import { connect } from "react-redux";
import { View, Text, Image } from "react-native";
import {
  onGetNameAndIconFromStorage,
  requestAllTasks,
  requestAllProjects
} from "../redux/actions";
import AsyncStorage from "@react-native-community/async-storage";

class SplashScreen extends React.Component {
  performTimeConsumingTask = async () => {
    const {
      onGetNameAndIconFromStorage,
      requestAllTasks,
      requestAllProjects
    } = this.props;
    let name, icon;
    try {
      const storedName = await AsyncStorage.getItem("@Name");
      if (storedName !== null) {
        name = storedName;
      }
      const storedIcon = await AsyncStorage.getItem("@Icon");
      if (storedIcon !== null) {
        icon = storedIcon;
      }
      onGetNameAndIconFromStorage({ name, icon });
    } catch (e) {
      console.log(e);
    }
    requestAllTasks();
    requestAllProjects();
    return icon;
  };

  async componentDidMount() {
    // Preload data from an external API
    // Preload data using AsyncStorage
    const data = await this.performTimeConsumingTask();
    if (data) {
      this.props.navigation.navigate("App");
    } else {
      this.props.navigation.navigate("SetUp");
    }
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#F9FCFF"
        }}
      >
        <Image source={require("../assets/NoteBook_full.png")} />
        <Text
          style={{
            fontSize: 22,
            color: "#554E8F",
            fontWeight: "600",
            marginBottom: 10
          }}
        >
          Reminders made simple
        </Text>
      </View>
    );
  }
}

const mapStateToProps = state => ({});

const reduxConnect = connect(mapStateToProps, {
  onGetNameAndIconFromStorage,
  requestAllTasks,
  requestAllProjects
});

export default reduxConnect(SplashScreen);
