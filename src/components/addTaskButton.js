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

  mode = new Animated.Value(0);
  buttonSize = new Animated.Value(1);

  handlePress = () => {
    Animated.sequence([
      Animated.timing(this.buttonSize, {
        toValue: 0.95,
        duration: 0
      }),
      Animated.timing(this.buttonSize, {
        toValue: 1
      }),
      Animated.timing(this.mode, {
        toValue: this.mode._value === 0 ? 1 : 0
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
    const rotation = this.mode.interpolate({
      inputRange: [0, 1],
      outputRange: ["0deg", "45deg"]
    });

    const sizeStyle = {
      transform: [{ scale: this.buttonSize }]
    };

    return (
      <View
        style={{
          position: "absolute",
          left: "50%",
          marginLeft: -33,
          top: -33
        }}
      >
        <Animated.View style={[styles.button, sizeStyle]}>
          <TouchableOpacity onPress={this.handlePress} style={styles.shadow}>
            <Animated.View style={{ transform: [{ rotate: rotation }] }}>
              <AntDesign name="pluscircle" size={66} color="#E0139C" />
            </Animated.View>
          </TouchableOpacity>
        </Animated.View>
      </View>
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
  },
  shadow: {
    shadowColor: "#F456C3",
    shadowOffset: { width: 0, height: 7 },
    shadowOpacity: 0.47
  }
});
