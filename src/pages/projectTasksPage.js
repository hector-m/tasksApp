import React from "react";
import { View, Text, Image } from "react-native";
import { connect } from "react-redux";
import style from "../style";
import {} from "../redux/actions";
import { getProjectTasks } from "../redux/selectors";
import TasksList from "../components/tasksList";

class ProjectTasksPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { navigation, projectTasks } = this.props;
    let title = navigation.getParam("ProjectTitle", {});
    let tasks = projectTasks.days;
    if (tasks.length == 0) {
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
            <Text style={style.headerText}>No tasks</Text>
            <Text style={style.text}>You have no tasks to do</Text>
          </View>
        </View>
      );
    } else {
      return (
        <View style={{ backgroundColor: "#F9FCFF" }}>
          <TasksList data={tasks} title={title} />
        </View>
      );
    }
  }
}

const mapStateToProps = state => ({
  projectTasks: getProjectTasks(state)
});

const reduxConnect = connect(mapStateToProps, {});

export default reduxConnect(ProjectTasksPage);
