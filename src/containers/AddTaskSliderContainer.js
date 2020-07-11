import React from "react";
import { connect } from "react-redux";
import { StyleSheet, View, Dimensions, Keyboard } from "react-native";
import { enterAddTask, exitAddTask } from "../redux/actions";
import { getIsPanelOpen } from "../redux/selectors";
import AddTaskButton from "../components/addTaskButton";
import AddTaskContainer from "./AddTaskContainer";
import Modal from "react-native-modal";

const { width, height } = Dimensions.get("window");
const TAB_BAR_HEIGHT = 83;
const OPEN_HEIGHT = height - TAB_BAR_HEIGHT - 105;
const HEADER_HEIGHT = 105;

class AddTaskSliderContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  renderAddButton() {
    return (
      <View style={styles.button}>
        <AddTaskButton />
      </View>
    );
  }

  render() {
    const { isPanelOpen, closeNewTaskPanel, openNewTaskPanel } = this.props;
    return (
      <Modal
        isVisible={isPanelOpen}
        onSwipeComplete={isPanelOpen ? closeNewTaskPanel : openNewTaskPanel}
        onBackdropPress={closeNewTaskPanel}
        onSwipeStart={Keyboard.dismiss}
        backdropOpacity={0.24}
        swipeDirection="down"
        propagateSwipe
        style={{
          margin: 0,
          marginTop: HEADER_HEIGHT,
          width,
          justifyContent: "flex-start",
          backgroundColor: "white",
          borderTopLeftRadius: 50,
          borderTopRightRadius: 50
        }}
      >
        {this.renderAddButton()}
        <AddTaskContainer />
      </Modal>
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
  isPanelOpen: getIsPanelOpen(state)
});

const reduxConnect = connect(mapStateToProps, {
  openNewTaskPanel: enterAddTask,
  closeNewTaskPanel: exitAddTask
});

export default reduxConnect(AddTaskSliderContainer);
