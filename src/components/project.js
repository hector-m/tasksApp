import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";

export default class Project extends React.Component {
  onpress = () => {
    tasks = this.props.onProjectPress(this.props.id, this.props.title);
  };

  render() {
    const { title, taskCount, color, icon } = this.props;
    return (
      <TouchableOpacity onPress={this.onpress}>
        <View style={styles.card}>
          <Icon
            name={icon}
            reverse
            type="font-awesome"
            color={color + "36"}
            reverseColor={color}
            size={35}
          />
          <Text style={styles.text}>{title}</Text>
          <Text style={styles.subtext}>
            {taskCount > 0 ? taskCount : "No"} Task{taskCount == 1 ? null : "s"}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    width: 160,
    height: 180,
    backgroundColor: "white",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
    shadowColor: "#BBBBBB",
    shadowOffset: { width: 0, height: 7 },
    shadowRadius: 11,
    shadowOpacity: 0.35,
    borderRadius: 5
  },
  text: {
    fontSize: 17,
    fontWeight: "500",
    color: "#686868"
  },
  subtext: {
    fontSize: 10,
    color: "#A1A1A1"
  }
});
