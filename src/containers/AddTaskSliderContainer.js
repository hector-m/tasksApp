import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators as actions } from "../redux/actions";
import {
  StyleSheet,
  Text,
  View,
  Animated,
  Dimensions,
  TouchableOpacity
} from "react-native";
const { width, height } = Dimensions.get("window");
import AddTaskButton from "../components/addTaskButton";

const TAB_BAR_HEIGHT = 83;
const OPEN_HEIGHT = height - TAB_BAR_HEIGHT - 105;

class AddTaskSliderContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  animation = new Animated.Value(0);

  toggleWindow = () =>
    Animated.timing(this.animation, {
      duration: 300,
      toValue: 1
    }).start();

  render() {
    const { animation } = this;
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
          backgroundColor: "grey",
          position: "absolute",
          bottom: TAB_BAR_HEIGHT,
          borderTopLeftRadius: 50,
          borderTopRightRadius: 50
        }}
      >
        <TouchableOpacity
          onPress={this.toggleWindow}
          style={{ height: 20, width: 20, backgroundColor: "red" }}
        ></TouchableOpacity>
        <AddTaskButton />
      </Animated.View>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddTaskSliderContainer);
