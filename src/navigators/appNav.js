
import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { createAppContainer, createBottomTabNavigator } from "react-navigation";
import HomePage from "../pages/homePage";
import { Icon } from 'react-native-elements';
import ProjectNavigator from "./projectNav";


const AppNavigator = createBottomTabNavigator({
  Home: {
    screen: HomePage,
  },
  Task: {
    screen: ProjectNavigator
  }
}, {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Home') {
          iconName = `home`;
        } else if (routeName === 'Task') {
          iconName = `thumbnails`;
        }

        // You can return any component that you like here!
        return <Icon
          name={iconName}
          type='foundation'
          color={tintColor}
          // iconStyle={{marginVertical:10}}
          size={25} />

      },
    }),
    tabBarOptions: {
      activeTintColor: '#5F87E7',
      inactiveTintColor: 'gray',
    },
  }
);

export default createAppContainer(AppNavigator);
