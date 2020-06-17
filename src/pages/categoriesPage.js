import React from "react";
import { View, Text, Image } from "react-native";
import { connect } from "react-redux";
import style from "../style";
import {
  requestAllProjects,
  requestProjectTasks,
  requestCompletedTasks
} from "../redux/actions";
import { getAllProjects } from "../redux/selectors";
import ProjectsList from "../components/projectsList";
import DataHandler from "../api/dataHandler";

class CategoriesPage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { requestAllProjects } = this.props;
    requestAllProjects();
  }

  onProjectPress = (id, title) => {
    const { navigation, requestProjectTasks } = this.props;
    requestProjectTasks(id, title);
    navigation.navigate("ProjectTasks", {
      ProjectTitle: title
    });
  };

  onCompletedTasksPressed = (id, title) => {
    const { navigation, requestCompletedTasks } = this.props;
    requestCompletedTasks(title);
    navigation.navigate("ProjectTasks", {
      ProjectTitle: title
    });
  };

  render() {
    const { allProjects } = this.props;
    if (allProjects.length == 0) {
      return (
        <View style={{ display: "flex", height: "100%" }}>
          <View
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Image
              source={require("../assets/NoteBook_empty.png")}
              style={{ margin: 70 }}
            />
            <Text style={style.headerText}>No Projects</Text>
            <Text style={style.text}>You have no projects set up</Text>
          </View>
        </View>
      );
    } else {
      return (
        <View style={{ backgroundColor: "#F9FCFF" }}>
          <ProjectsList
            data={allProjects}
            onProjectPress={this.onProjectPress}
            onCompletedTasksPressed={this.onCompletedTasksPressed}
            dataHandler={DataHandler}
          />
        </View>
      );
    }
  }
}

const mapStateToProps = state => ({
  allProjects: getAllProjects(state)
});

const reduxConnect = connect(mapStateToProps, {
  requestAllProjects,
  requestProjectTasks,
  requestCompletedTasks
});

export default reduxConnect(CategoriesPage);
