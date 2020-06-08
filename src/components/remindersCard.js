import React from "react";
import { View, Text, Image } from "react-native";
import moment from "moment";

export default class RemindersCard extends React.Component {
  constructor(props) {
    super(props);
  }

  getTitle() {
    const { title } = this.props;
    if (title.length > 20) {
      return title.substr(0, 20) + "...";
    }
    return title;
  }

  render() {
    const { startTime } = this.props;
    return (
      <View
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignContent: "center",
          width: "100%",
          height: 106,
          borderRadius: 5,
          backgroundColor: "#83A8E8",
          //   opacity: 0.31
          flexDirection: "row",
          paddingHorizontal: 10
        }}
      >
        <View
          style={{
            display: "flex",
            justifyContent: "space-around",
            paddingVertical: 20
          }}
        >
          <Text style={{ fontSize: 24, color: "white" }}>
            {this.getTitle()}
          </Text>
          <Text style={{ fontSize: 17, color: "white" }}>
            {moment(startTime).format("h:mm")}
          </Text>
        </View>

        <Image
          source={require("../assets/remindersBell.png")}
          style={{ width: 66, alignSelf: "center" }}
        />
      </View>
    );
  }
}
