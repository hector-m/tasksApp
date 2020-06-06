import React from "react";
import { View, Text, Image } from "react-native";
import { connect } from "react-redux";
import style from "../style";
import { requestAllTasks } from "../redux/actions";
import { getAllTasks } from "../redux/selectors";
import TasksList from "../components/tasksList";

class HomePage extends React.Component {
  componentDidMount() {
    const { requestAllTasks } = this.props;
    requestAllTasks();
  }

  render() {
    const { allTasks } = this.props;
    if (allTasks.length == 0) {
      return (
        <View style={{ display: "flex", height: "100%", overflow: "visible" }}>
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
          <TasksList data={allTasks} />
        </View>
      );
    }
  }
}

const mapStateToProps = state => ({
  allTasks: getAllTasks(state)
});

const reduxConnect = connect(mapStateToProps, {
  requestAllTasks
});

export default reduxConnect(HomePage);
