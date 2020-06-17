import React from "react";
import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import HomePage from "../pages/homePage";
import ProjectNavigator from "./projectNav";
import { Feather, AntDesign } from "@expo/vector-icons";

const AppNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: HomePage
    },
    AddButton: {
      screen: () => null,
      showLabel: false,
      navigationOptions: () => ({
        title: "",
        tabBarIcon: null,
        tabBarOnPress: () => {}
      })
    },
    Projects: {
      screen: ProjectNavigator
    }
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarOnPress: ({ navigation }) => {
        if (navigation.state.routeName == "Projects") {
          navigation.popToTop();
        }
        navigation.navigate(navigation.state.routeName);
      },
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        if (routeName === "Home") {
          return <Feather name="home" size={25} color={tintColor} />;
        } else if (routeName === "Projects") {
          return <AntDesign name="appstore-o" size={25} color={tintColor} />;
        }
      }
    }),
    tabBarOptions: {
      activeTintColor: "#5F87E7",
      inactiveTintColor: "gray"
    }
  }
);

export default createAppContainer(AppNavigator);
