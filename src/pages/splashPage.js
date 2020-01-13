import React from "react";
import { View, Text, Image } from "react-native";

export default class SplashScreen extends React.Component {
  performTimeConsumingTask = async () => {
    return new Promise(resolve =>
      setTimeout(
        () => {
          resolve("result");
        },
        // TODO: Add code to get data
        0
      )
    );
  };

  async componentDidMount() {
    // Preload data from an external API
    // Preload data using AsyncStorage
    const data = await this.performTimeConsumingTask();

    if (data !== null) {
      this.props.navigation.navigate("App");
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
