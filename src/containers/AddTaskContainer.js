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
import moment from "moment";
import {
  enterAddTask,
  exitAddTask,
  createNewTask,
  onProjectTitleChanged,
  onProjectTypeClicked,
  onProjectDateClicked,
  onProjectDateChanged
} from "../redux/actions";
import {
  getIsNewTaskPanelOpen,
  getNewProjectTitle,
  getProjectIdSelected,
  getIsPickingProjectDate,
  getNewProjectDate
} from "../redux/selectors";
import DataHandler from "../api/dataHandler";

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
          // activeOpacity={1}
          onPress={() => {
            onProjectDateClicked();
          }}
        >
          <Text
            style={{
              fontSize: 13,
              fontWeight: "normal"
            }}
          >
            Choose Date,
          </Text>
          {newProjectDate && (
            <Text
              style={{
                fontSize: 13,
                fontWeight: "600",
                marginTop: 20,
                color: "#554E8F"
              }}
            >
              {moment(newProjectDate).format("LLL")}
            </Text>
          )}
        </TouchableOpacity>
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
            Add task
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  render() {
    const {
      isNewTaskPanelOpen,
      onProjectTitleChanged,
      newProjectTitle
    } = this.props;
    if (!isNewTaskPanelOpen) {
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
          Add new task
        </Text>
        <TextInput
          style={{
            height: 32,
            marginTop: 13,
            fontSize: 20,
            color: "#373737"
          }}
          autoFocus
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
  isNewTaskPanelOpen: getIsNewTaskPanelOpen(state),
  projects: DataHandler.loadedProjects(),
  projectIdSelected: getProjectIdSelected(state),
  isPickingProjectDate: getIsPickingProjectDate(state),
  newProjectDate: getNewProjectDate(state),
  newProjectTitle: getNewProjectTitle(state)
});

const reduxConnect = connect(mapStateToProps, {
  openNewTaskPanel: enterAddTask,
  closeNewTaskPanel: exitAddTask,
  createNewTask: createNewTask,
  onProjectTitleChanged,
  selectProjectType: onProjectTypeClicked,
  onProjectDateClicked,
  onProjectDateChanged
});

export default reduxConnect(AddTaskContainer);
