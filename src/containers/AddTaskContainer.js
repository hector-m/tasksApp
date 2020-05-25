import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators as actions } from "../redux/actions";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
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
    const { projects } = this.props;
    let projectTitles = projects.map(project => (
      <TouchableOpacity
        key={project.id}
        style={{ marginRight: 15, flexDirection: "row" }}
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
        <Text style={{ fontSize: 15, color: "#8E8E8E" }}>{project.title}</Text>
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
    return (
      <View
        style={{
          paddingTop: 50,
          paddingHorizontal: 21,
          display: "flex",
          flexDirection: "column",
          alignContent: "center",
          backgroundColor: "yellow"
        }}
      >
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
            fontSize: 32
          }}
          autoFocus
          onChangeText={text => this.setState({ text })}
          value={this.state.text}
        />
        {this.renderProjectSlider()}
        {this.renderDatePicker()}
        {this.renderButton()}
      </View>
    );
  }
}

const styles = StyleSheet.create({});

function mapStateToProps(state) {
  // Redux Store --> Component
  return {
    isNewTaskPanelOpen: state.isNewTaskPanelOpen,
    projects: DataHandler.loadedProjects()
  };
}

function mapDispatchToProps(dispatch) {
  return {
    openNewTaskPanel: bindActionCreators(actions.enterAddTask, dispatch),
    closeNewTaskPanel: bindActionCreators(actions.exitAddTask, dispatch),
    createNewTask: bindActionCreators(actions.createNewTask, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddTaskContainer);
