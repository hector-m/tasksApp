import React from "react";
import { View } from "react-native";
import { connect } from "react-redux";
import { requestAllTasks, requestAllProjects } from "../redux/actions";
import { getAllTasks } from "../redux/selectors";
import TasksList from "../components/tasksList";

class HomePage extends React.Component {
  componentDidMount() {
    const { requestAllTasks, requestAllProjects } = this.props;
    requestAllTasks();
    requestAllProjects();
  }

  render() {
    const { allTasks } = this.props;
    return (
      <View style={{ backgroundColor: "#F9FCFF" }}>
        <TasksList data={allTasks} />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  allTasks: getAllTasks(state)
});

const reduxConnect = connect(mapStateToProps, {
  requestAllTasks,
  requestAllProjects
});

export default reduxConnect(HomePage);
