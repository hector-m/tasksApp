import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators as actions } from "../redux/actions";
import { View, Text, Image, StyleSheet, Button } from "react-native";
import RemindersCard from "./remindersCard";
import Swiper from "react-native-deck-swiper";

class RemindersHeader extends React.Component {
  constructor(props) {
    super(props);
  }

  renderReminderCards() {
    const { todaysReminders } = this.props;
    return (
      <Swiper
        cards={todaysReminders}
        renderCard={card => {
          return (
            <RemindersCard title={card.title} startTime={card.start_time} />
          );
        }}
        onSwiped={cardIndex => {
          console.log("SWIPED");
        }}
        onSwipedAll={() => {
          this.props.swipedAllReminders();
        }}
        cardIndex={0}
        stackSize={2}
        verticalSwipe={false}
        outputRotationRange={["0deg", "0deg", "0deg"]}
        stackSeparation={0}
        stackScale={1}
        cardVerticalMargin={13}
        cardHorizontalMargin={18}
        backgroundColor="transparent"
      ></Swiper>
    );
  }

  render() {
    return (
      <View style={{ width: "100%", paddingTop: -20, height: 132 }}>
        {this.renderReminderCards()}
      </View>
    );
  }
}

function mapStateToProps(state) {
  // Redux Store --> Component
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    swipedAllReminders: bindActionCreators(actions.swipedAllReminders, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RemindersHeader);

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
