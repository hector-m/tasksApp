import React from "react";
import { View, Text, SectionList, StyleSheet, Image } from "react-native";
import { connect } from "react-redux";
import {
  deleteTask,
  editTask,
  setReminderOptionForTask,
  setCompletedOptionForTask
} from "../redux/actions";
import {} from "../redux/selectors";
import style from "../style";
import Task from "./task";

class TasksList extends React.Component {
  constructor(props) {
    super(props);
  }

  renderProjectTitle() {
    const { title } = this.props;
    if (title == null) {
      return null;
    }
    return <Text style={styles.text}>{title}</Text>;
  }

  render() {
    const {
      deleteTask,
      editTask,
      data,
      setReminderOptionForTask,
      setCompletedOptionForTask
    } = this.props;
    if (data.length == 0) {
      return (
        <View
          style={{
            display: "flex",
            height: "100%",
            padding: 18
          }}
        >
          {this.renderProjectTitle()}
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
    }
    return (
      <View
        style={{
          overflow: "visible",
          padding: 18,
          width: "100%",
          height: "100%"
        }}
      >
        {this.renderProjectTitle()}
        <SectionList
          style={{ overflow: "visible" }}
          renderItem={({ item }) => (
            <Task
              id={item.id}
              title={item.title}
              start={item.start_time}
              end={item.end_time}
              project={item.project}
              reminder={item.reminder}
              complete={item.complete}
              task={item}
              onDeleteTask={deleteTask}
              onEditTask={editTask}
              onReminderPressed={setReminderOptionForTask}
              onTaskCompleted={setCompletedOptionForTask}
            />
          )}
          renderSectionHeader={({ section }) => (
            <Text style={[style.headerText, { fontSize: 13 }]}>
              {section.day}
            </Text>
          )}
          sections={data}
          keyExtractor={(_, index) => index.toString()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#554E8F"
  }
});

const mapStateToProps = state => ({});

const reduxConnect = connect(mapStateToProps, {
  deleteTask,
  editTask,
  setReminderOptionForTask,
  setCompletedOptionForTask
});

export default reduxConnect(TasksList);
