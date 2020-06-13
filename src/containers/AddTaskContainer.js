import React from "react";
import { connect } from "react-redux";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import DateTimePicker from "@react-native-community/datetimepicker";
import { FontAwesome5 } from "@expo/vector-icons";
import moment from "moment";
import {
  enterAddTask,
  exitAddTask,
  createNewTask,
  updateTask,
  onProjectTitleChanged,
  onProjectTypeClicked,
  onProjectDateClicked,
  onProjectDateChanged
} from "../redux/actions";
import {
  getIsPanelOpen,
  getIsSettingNewTask,
  getIsEditingTask,
  getNewProjectTitle,
  getProjectIdSelected,
  getIsPickingProjectDate,
  getNewProjectDate,
  getNewProjectIsReminder,
  getAllProjects,
  getTaskEditingId
} from "../redux/selectors";

class AddTaskContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  getProjectTitles() {
    const { projects, selectProjectType, projectIdSelected } = this.props;
    let projectTitles = projects.map(project => (
      <TouchableOpacity
        key={project.id}
        onPress={() => {
          selectProjectType(project.id);
        }}
        style={[
          styles.project,
          projectIdSelected == project.id
            ? { backgroundColor: project.color }
            : null
        ]}
      >
        <View
          style={{
            height: 10,
            width: 10,
            backgroundColor: project.color,
            borderRadius: 5,
            marginRight: 5,
            alignSelf: "center"
          }}
        />
        <Text
          style={{
            fontSize: 15,
            color: projectIdSelected == project.id ? "white" : "#8E8E8E"
          }}
        >
          {project.title}
        </Text>
      </TouchableOpacity>
    ));
    return projectTitles;
  }

  renderProjectSlider() {
    const projectTitles = this.getProjectTitles();

    return (
      <ScrollView
        horizontal
        style={{
          height: 60,
          width: "100%",
          borderTopWidth: 1,
          borderBottomWidth: 1,
          borderColor: "#CFCFCF",
          marginVertical: 20
        }}
        contentContainerStyle={{
          alignItems: "center"
        }}
      >
        {projectTitles}
      </ScrollView>
    );
  }

  renderDatePicker() {
    const {
      onProjectDateClicked,
      onProjectDateChanged,
      isPickingProjectDate,
      newProjectDate
    } = this.props;
    return (
      <View>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            newProjectDate ? null : onProjectDateClicked();
          }}
          style={{ flexDirection: "row" }}
        >
          <Text
            style={{
              fontSize: 14,
              fontWeight: "normal",
              marginRight: 50
            }}
          >
            Choose Date
          </Text>
          {!newProjectDate && <FontAwesome5 name="chevron-down" size={15} />}
        </TouchableOpacity>
        {newProjectDate && (
          <TouchableOpacity
            onPress={() => {
              onProjectDateClicked();
            }}
            style={{
              marginTop: 20,
              flexDirection: "row"
            }}
          >
            <Text
              style={{
                fontSize: 14,
                fontWeight: "600",
                color: "#554E8F",
                marginRight: 10
              }}
            >
              {moment(newProjectDate).format("LLL")}
            </Text>
            <FontAwesome5
              name={isPickingProjectDate ? "chevron-up" : "chevron-down"}
              size={15}
              color={"#554E8F"}
            />
          </TouchableOpacity>
        )}
        {isPickingProjectDate && (
          <DateTimePicker
            mode={"datetime"}
            value={newProjectDate}
            onChange={(event, date) => onProjectDateChanged(date)}
          />
        )}
      </View>
    );
  }

  renderButton() {
    const {
      isSettingNewTask,
      createNewTask,
      updateTask,
      projectIdSelected,
      newProjectDate,
      newProjectTitle,
      isNewProjectReminder,
      taskEditingId
    } = this.props;
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        style={{
          shadowColor: "#6894EE",
          shadowOffset: { width: 0, height: 3 },
          shadowOpacity: 1,
          overflow: "visible",
          marginVertical: 50
        }}
        onPress={() => {
          if (isSettingNewTask) {
            createNewTask(
              newProjectTitle,
              newProjectDate,
              null,
              projectIdSelected,
              isNewProjectReminder
            );
          } else {
            updateTask(
              taskEditingId,
              newProjectTitle,
              newProjectDate,
              null,
              projectIdSelected,
              isNewProjectReminder
            );
          }
        }}
      >
        <LinearGradient
          colors={["#7EB6FF", "#5F87E7"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: 53,
            borderRadius: 5,
            overflow: "visible"
          }}
        >
          <Text style={{ fontSize: 18, color: "white", fontWeight: "700" }}>
            {isSettingNewTask ? "Add task" : "Save changes"}
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  render() {
    const {
      isPanelOpen,
      isSettingNewTask,
      isEditingTask,
      onProjectTitleChanged,
      newProjectTitle
    } = this.props;
    if (!isPanelOpen) {
      return null;
    }

    return (
      <View style={styles.container}>
        <Text
          style={{
            textAlign: "center",
            fontSize: 14,
            fontWeight: "700",
            color: "#554E8F"
          }}
        >
          {isSettingNewTask ? "Add new task" : "Edit task"}
        </Text>
        <TextInput
          style={{
            height: 32,
            marginTop: 13,
            fontSize: 20,
            color: "#373737"
          }}
          autoFocus={isSettingNewTask}
          onChangeText={text => onProjectTitleChanged(text)}
          value={newProjectTitle}
        />
        {this.renderProjectSlider()}
        {this.renderDatePicker()}
        {this.renderButton()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    paddingHorizontal: 21,
    display: "flex",
    flexDirection: "column",
    alignContent: "center"
  },
  project: {
    marginRight: 15,
    flexDirection: "row",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5
  },
  selected: {
    backgroundColor: "red"
  }
});

const mapStateToProps = state => ({
  isPanelOpen: getIsPanelOpen(state),
  isSettingNewTask: getIsSettingNewTask(state),
  isEditingTask: getIsEditingTask(state),
  projects: getAllProjects(state),
  projectIdSelected: getProjectIdSelected(state),
  isPickingProjectDate: getIsPickingProjectDate(state),
  newProjectDate: getNewProjectDate(state),
  newProjectTitle: getNewProjectTitle(state),
  isNewProjectReminder: getNewProjectIsReminder(state),
  taskEditingId: getTaskEditingId(state)
});

const reduxConnect = connect(mapStateToProps, {
  openNewTaskPanel: enterAddTask,
  closeNewTaskPanel: exitAddTask,
  createNewTask: createNewTask,
  updateTask,
  onProjectTitleChanged,
  selectProjectType: onProjectTypeClicked,
  onProjectDateClicked,
  onProjectDateChanged
});

export default reduxConnect(AddTaskContainer);
