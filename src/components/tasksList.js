import React from "react";
import { View, Text, SectionList, StyleSheet } from "react-native";
import style from "../style";
import Task from "./task.js";

export default class TasksList extends React.Component {
  constructor(props) {
    super(props);
    this.data = Object.keys(this.props.data).map(key => {
      return {
        data: this.props.data[key].tasks,
        day: this.props.data[key].day
      };
    });
  }

  renderProjectTitle() {
    const { title } = this.props;
    if (title == null) {
      return null;
    }
    return <Text style={styles.text}>{title}</Text>;
  }

  render() {
    return (
      <View
        style={{
          overflow: "visible",
          padding: 18,
          width: "100%",
          height: "100%"
        }}
      >
        {this.renderProjectTitle()}
        <SectionList
          style={{ overflow: "visible" }}
          renderItem={({ item }) => (
            <Task
              id={item.id}
              title={item.title}
              start={item.start_time}
              end={item.end_time}
              project={item.project}
              reminder={item.reminder}
            />
          )}
          renderSectionHeader={({ section }) => (
            <Text style={[style.headerText, { fontSize: 13 }]}>
              {section.day}
            </Text>
          )}
          sections={this.data}
          keyExtractor={(_, index) => index.toString()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#554E8F"
  }
});
