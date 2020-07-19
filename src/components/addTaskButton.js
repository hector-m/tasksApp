import React from "react";
import { connect } from "react-redux";
import { StyleSheet, TouchableOpacity, Animated } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { getIsPanelOpen } from "../redux/selectors";
import {
  enterAddTask,
  exitAddTask,
  requestAllProjects
} from "../redux/actions";

class AddTaskButton extends React.Component {
  constructor(props) {
    super(props);
  }
  buttonSize = new Animated.Value(1);

  handlePress = () => {
    Animated.sequence([
      Animated.timing(this.buttonSize, {
        toValue: 0.95,
        duration: 0,
        useNativeDriver: true
      }),
      Animated.timing(this.buttonSize, {
        toValue: 1,
        useNativeDriver: true
      })
    ]).start();
    this.toggle();
  };

  toggle() {
    const {
      isPanelOpen,
      closeWindow,
      openWindow,
      requestAllProjects
    } = this.props;
    if (isPanelOpen) {
      console.log("close");
      closeWindow();
    } else {
      console.log("open");
      requestAllProjects();
      openWindow();
    }
  }

  render() {
    const sizeStyle = {
      transform: [{ scale: this.buttonSize }]
    };

    return (
      <TouchableOpacity onPress={this.handlePress} activeOpacity={1}>
        <Animated.View style={[styles.button, sizeStyle]}>
          <AntDesign name="pluscircle" size={66} color="#E0139C" />
        </Animated.View>
      </TouchableOpacity>
    );
  }
}

const mapStateToProps = state => ({
  isPanelOpen: getIsPanelOpen(state)
});

const reduxConnect = connect(mapStateToProps, {
  openWindow: enterAddTask,
  closeWindow: exitAddTask,
  requestAllProjects
});

export default reduxConnect(AddTaskButton);

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    width: 66,
    height: 66,
    borderRadius: 36,
    backgroundColor: "white"
  }
});
