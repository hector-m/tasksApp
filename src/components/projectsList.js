import React from "react";
import { View, Text } from "react-native";
import style from "../style";
import { FlatList } from "react-native-gesture-handler";
import Project from "./project";

export default class TasksList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { data, onProjectPress } = this.props;
    return (
      <View style={{ padding: 18, width: "100%", height: "100%" }}>
        <Text style={[style.headerText, { fontSize: 13 }]}>Projects</Text>
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <Project
              title={item.title}
              icon={item.icon}
              color={item.color}
              tasks={item.tasks}
              id={item.id}
              onProjectPress={onProjectPress}
            />
          )}
          keyExtractor={(_, index) => index.toString()}
          numColumns={2}
          columnWrapperStyle={{
            display: "flex",
            justifyContent: "space-between"
          }}
          ItemSeparatorComponent={() => (
            <View style={{ width: "100%", height: 20 }} />
          )}
        />
      </View>
    );
  }
}
