import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Icon } from "react-native-elements";
import Swipeable from "react-native-gesture-handler/Swipeable";
import moment from "moment";

export default class Task extends React.Component {
  constructor(props) {
    super(props);
    this.currentlyOpenSwipeable = null;
  }

  getProjectColor = () => {
    let projects = { 1: "#FFD506", 2: "#5DE61A", 3: "#D10263" };
    return projects[this.props.project];
  };

  handleCompleted = () => {
    const { onTaskCompleted, complete, task } = this.props;
    onTaskCompleted(task, !complete);
  };

  handleReminder = () => {
    const { onReminderPressed, reminder, task } = this.props;
    onReminderPressed(task, !reminder);
  };

  handleDelete = () => {
    const { onDeleteTask, id } = this.props;
    onDeleteTask(id);
  };

  handleEdit = () => {
    const { onEditTask, id, title, start, project } = this.props;
    onEditTask({ id, title, start, project });
    this.currentlyOpenSwipeable.close();
  };

  renderDeleteButton = () => {
    return (
      <TouchableOpacity
        style={{
          paddingLeft: 8,
          height: "100%",
          display: "flex",
          flexDirection: "row",
          alignItems: "center"
        }}
      >
        <Icon
          reverse
          name="trash-o"
          type="font-awesome"
          color={"#FFCFCF"}
          reverseColor="#FB3636"
          iconStyle={{ marginHorizontal: 10 }}
          size={20}
          onPress={this.handleDelete}
        />
      </TouchableOpacity>
    );
  };

  renderEditButton = () => {
    return (
      <TouchableOpacity
        style={{
          paddingLeft: 8,
          height: "100%",
          display: "flex",
          flexDirection: "row",
          alignItems: "center"
        }}
      >
        <Icon
          reverse
          name="pencil"
          type="font-awesome"
          color={"#ceefff"}
          reverseColor="#37BCFA"
          iconStyle={{ marginHorizontal: 10 }}
          size={20}
          onPress={this.handleEdit}
        />
      </TouchableOpacity>
    );
  };

  renderTaskRow() {
    return (
      <View
        style={{
          backgroundColor: this.getProjectColor(),
          height: 55,
          marginVertical: 5,
          paddingLeft: "2%"
        }}
      >
        <View
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "white",
            display: "flex",
            flexDirection: "row",
            alignItems: "center"
          }}
        >
          <TouchableOpacity
            onPress={this.handleCompleted}
            style={[
              this.props.complete ? styles.selected : styles.empty,
              { marginHorizontal: 10 }
            ]}
          />
          <Text style={{ color: "#C6C6C8", marginRight: 14 }}>
            {moment(this.props.start).format("h:mm")}
          </Text>
          <Text
            style={this.props.complete ? styles.text_selected : styles.text}
          >
            {this.props.title}
          </Text>
          <Icon
            name="bell"
            type="font-awesome"
            color={this.props.reminder ? "#FFDC00" : "#D9D9D9"}
            iconStyle={{ marginHorizontal: 10 }}
            size={18}
            onPress={this.handleReminder}
          />
        </View>
      </View>
    );
  }

  render() {
    return (
      <Swipeable
        ref={ref => (this.currentlyOpenSwipeable = ref)}
        renderRightActions={this.renderDeleteButton}
        renderLeftActions={this.renderEditButton}
        containerStyle={{ overflow: "visible" }}
      >
        {this.renderTaskRow()}
      </Swipeable>
    );
  }
}

const styles = StyleSheet.create({
  empty: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderColor: "#B5B5B5",
    borderWidth: 2
  },
  selected: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: "#91DC5A"
  },
  text: {
    fontSize: 14,
    fontWeight: "500",
    color: "#554E8F",
    flex: 1
  },
  text_selected: {
    fontSize: 14,
    fontWeight: "500",
    color: "#D9D9D9",
    textDecorationLine: "line-through",
    textDecorationStyle: "solid",
    flex: 1
  }
});
