import React from "react";
import { connect } from "react-redux";
import { View, StyleSheet } from "react-native";
import { swipedAllReminders, swipedReminder } from "../redux/actions";
import { getCardIndex } from "../redux/selectors";
import RemindersCard from "./remindersCard";
import Swiper from "react-native-deck-swiper";

class RemindersHeader extends React.Component {
  constructor(props) {
    super(props);
  }

  renderReminderCards() {
    const { todaysReminders, cardIndex } = this.props;
    return (
      <Swiper
        cards={todaysReminders}
        renderCard={card => {
          if (card) {
            return (
              <RemindersCard title={card.title} startTime={card.start_time} />
            );
          } else {
            return null;
          }
        }}
        onSwiped={cardIndex => {
          this.props.swipedReminder(cardIndex);
        }}
        onSwipedAll={() => {
          this.props.swipedAllReminders();
        }}
        cardIndex={cardIndex}
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

const mapStateToProps = state => ({
  cardIndex: getCardIndex(state)
});

const reduxConnect = connect(mapStateToProps, {
  swipedAllReminders,
  swipedReminder
});

export default reduxConnect(RemindersHeader);

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
