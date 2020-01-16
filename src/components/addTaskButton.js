import React from "react";
import { View, StyleSheet, TouchableOpacity, Animated } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators as actions } from "../redux/actions";
import { AntDesign } from "@expo/vector-icons";

class AddTaskButton extends React.Component {
  constructor(props) {
    super(props);
  }
  buttonSize = new Animated.Value(1);

  handlePress = () => {
    Animated.sequence([
      Animated.timing(this.buttonSize, {
        toValue: 0.95,
        duration: 0
      }),
      Animated.timing(this.buttonSize, {
        toValue: 1
      })
    ]).start();
    this.toggle();
  };

  toggle() {
    const {
      isNewTaskPanelOpen,
      openNewTaskPanel,
      closeNewTaskPanel
    } = this.props;
    if (isNewTaskPanelOpen) {
      closeNewTaskPanel();
    } else {
      openNewTaskPanel();
    }
  }

  renderButton() {
    const sizeStyle = {
      transform: [{ scale: this.buttonSize }]
    };

    return (
      <Animated.View style={[styles.button, sizeStyle]}>
        <TouchableOpacity onPress={this.handlePress}>
          <AntDesign name="pluscircle" size={66} color="#E0139C" />
        </TouchableOpacity>
      </Animated.View>
    );
  }

  render() {
    return this.renderButton();
  }
}

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

export default connect(mapStateToProps, mapDispatchToProps)(AddTaskButton);

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
