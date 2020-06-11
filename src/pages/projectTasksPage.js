import React from "react";
import { View } from "react-native";
import { connect } from "react-redux";
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
    return (
      <View style={{ backgroundColor: "#F9FCFF" }}>
        <TasksList data={tasks} title={title} />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  projectTasks: getProjectTasks(state)
});

const reduxConnect = connect(mapStateToProps, {});

export default reduxConnect(ProjectTasksPage);
