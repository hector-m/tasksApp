import React from "react";
import { connect } from "react-redux";
import { StyleSheet, View, Animated, Dimensions } from "react-native";
import { PanGestureHandler, State } from "react-native-gesture-handler";
import { enterAddTask, exitAddTask, createNewTask } from "../redux/actions";
import { getIsNewTaskPanelOpen } from "../redux/selectors";
import AddTaskButton from "../components/addTaskButton";
import AddTaskContainer from "./AddTaskContainer";

const { width, height } = Dimensions.get("window");
const TAB_BAR_HEIGHT = 83;
const OPEN_HEIGHT = height - TAB_BAR_HEIGHT - 105;

class AddTaskSliderContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  // animation = new Animated.Value(this.props.isNewTaskPanelOpen); //0 put one to start open

  openWindow = () => {
    const { animation } = this.props;
    this.props.openNewTaskPanel();
    Animated.timing(animation, {
      duration: 300,
      toValue: 1
    }).start();
  };

  closeWindow = () => {
    const { animation } = this.props;
    this.props.closeNewTaskPanel();
    Animated.timing(animation, {
      duration: 300,
      toValue: 0
    }).start();
  };

  renderAddButton() {
    const { animation } = this.props;
    const rotateButton = animation.interpolate({
      inputRange: [0, 1],
      outputRange: ["0deg", "45deg"]
    });
    return (
      <View style={styles.button}>
        <Animated.View style={{ transform: [{ rotate: rotateButton }] }}>
          <AddTaskButton
            openWindow={this.openWindow}
            closeWindow={this.closeWindow}
          />
        </Animated.View>
      </View>
    );
  }

  render() {
    const { animation } = this.props;
    const translateY = animation.interpolate({
      inputRange: [0, 1],
      outputRange: [0, OPEN_HEIGHT]
    });
    return (
      <Animated.View
        style={{
          height: translateY,
          width: width,
          alignSelf: "center",
          backgroundColor: "white",
          position: "absolute",
          bottom: TAB_BAR_HEIGHT,
          borderTopLeftRadius: 50,
          borderTopRightRadius: 50
        }}
      >
        {this.renderAddButton()}
        <AddTaskContainer />
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    shadowColor: "#F456C3",
    shadowOffset: { width: 0, height: 7 },
    shadowOpacity: 0.47,
    position: "absolute",
    left: "50%",
    marginLeft: -33,
    top: -33
  }
});

const mapStateToProps = state => ({
  animation: new Animated.Value(getIsNewTaskPanelOpen(state))
});

const reduxConnect = connect(mapStateToProps, {
  openNewTaskPanel: enterAddTask,
  closeNewTaskPanel: exitAddTask,
  createNewTask: createNewTask
});

export default reduxConnect(AddTaskSliderContainer);
