import React from "react";
import { View, Text, Image } from "react-native";
import style from "../style";
import ProjectsList from "../components/projectsList";
import Header from "../components/header";
import DataHandler from "../api/dataHandler";

export default class CategoriesPage extends React.Component {

  render() {
    let projects = DataHandler.loadedProjects();
    if (projects.length == 0) {
      return (
        <View style={{ display: "flex", height:"100%" }}>
          <View style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
            <Image source={require('../assets/NoteBook_empty.png')} style={{ margin: 70 }} />
            <Text style={style.headerText}>No Projects</Text>
            <Text style={style.text}>You have no projects set up</Text>
          </View>
        </View>
      );
    } else {
      return (
        <View style={{ backgroundColor: "#F9FCFF" }}>
          <Header />
          <ProjectsList data={projects} />
        </View>
      );
    }

  }
}
