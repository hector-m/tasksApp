import React from "react";
import { View, Text, Image } from "react-native";
import style from "../style";
import TasksList from "../components/tasksList";
import Header from "../components/header";
import DataHandler from "../api/dataHandler";

export default class HomePage extends React.Component {

  render() {
    let tasks = DataHandler.loadedReminders();
    if (tasks.length == 0) {
      return (
        <View style={{ display: "flex", height:"100%" }}>
          <Header />
          <View style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
            <Image source={require('../assets/NoteBook_empty.png')} style={{ margin: 70 }} />
            <Text style={style.headerText}>No tasks</Text>
            <Text style={style.text}>You have no tasks to do</Text>
          </View>
        </View>
      );
    } else {
      return (
        <View style={{ backgroundColor: "#F9FCFF" }}>
          <Header />
          <TasksList data={tasks} />
        </View>
      );
    }

  }
}
