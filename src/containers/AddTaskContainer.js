import React from "react";
import { connect } from "react-redux";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  DateTimePicker
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import {
  enterAddTask,
  exitAddTask,
  createNewTask,
  projectTypeClicked
} from "../redux/actions";
import {
  getIsNewTaskPanelOpen,
  getProjectIdSelected
} from "../redux/selectors";
import DataHandler from "../api/dataHandler";

class AddTaskContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      project: null,
      date: null
    };
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
    return (
      <TouchableOpacity activeOpacity={1}>
        <Text
          style={{
            fontSize: 14,
            fontWeight: "normal"
          }}
        >
          Choose Date
        </Text>
      </TouchableOpacity>
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
          overflow: "visible"
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
    const { isNewTaskPanelOpen } = this.props;
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
          onChangeText={text => this.setState({ text })}
          value={this.state.text}
        />
        {this.renderProjectSlider()}
        {this.renderDatePicker()}
        {this.renderButton()}
        {/* <DateTimePicker value={new Date()} /> */}
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
  projectIdSelected: getProjectIdSelected(state)
});

const reduxConnect = connect(mapStateToProps, {
  openNewTaskPanel: enterAddTask,
  closeNewTaskPanel: exitAddTask,
  createNewTask: createNewTask,
  selectProjectType: projectTypeClicked
});

export default reduxConnect(AddTaskContainer);
