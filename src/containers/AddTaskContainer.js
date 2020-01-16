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

class AddTaskContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      project: null,
      date: null
    };
  }

  renderProjectSlider() {
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
        <View
          style={{
            height: 10,
            width: 50,
            backgroundColor: "red",
            marginHorizontal: 10
          }}
        />
        <View
          style={{
            height: 10,
            width: "20%",
            backgroundColor: "red",
            marginHorizontal: 10
          }}
        />
        <View
          style={{
            height: 10,
            width: "20%",
            backgroundColor: "red",
            marginHorizontal: 10
          }}
        />
        <View
          style={{
            height: 10,
            width: "20%",
            backgroundColor: "red",
            marginHorizontal: 10
          }}
        />
        <View
          style={{
            height: 10,
            width: "20%",
            backgroundColor: "red",
            marginHorizontal: 10
          }}
        />
        <View
          style={{
            height: 10,
            width: "20%",
            backgroundColor: "red",
            marginHorizontal: 10
          }}
        />
        <View
          style={{
            height: 10,
            width: "20%",
            backgroundColor: "red",
            marginHorizontal: 10
          }}
        />
      </ScrollView>
    );
  }

  renderDatePicker() {
    return <View></View>;
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
          paddingTop: 25,
          paddingHorizontal: 21,
          display: "flex",
          flexDirection: "column",
          alignContent: "center"
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
    isNewTaskPanelOpen: state.isNewTaskPanelOpen
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
