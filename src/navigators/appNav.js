import React from "react";
import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createStackNavigator } from "react-navigation-stack";
import HomePage from "../pages/homePage";
import ProjectNavigator from "./projectNav";
import { Feather, AntDesign } from "@expo/vector-icons";
import AddTaskButton from "../components/addTaskButton";
import HeaderContainer from "../containers/headerContainer";

const ScreenA = createStackNavigator(
  { HomePage },
  {
    defaultNavigationOptions: {
      headerMode: "screen",
      headerStyle: {
        height: 105
      },
      header: ({ scene, previous, navigation }) => {
        return <HeaderContainer />;
      }
    }
  }
  /* other routes here */
);

const AppNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: ScreenA
    },
    AddButton: {
      screen: () => null,
      showLabel: false,
      navigationOptions: () => ({
        title: "",
        tabBarIcon: <AddTaskButton />,
        tabBarOnPress: () => {}
      })
    },
    Projects: {
      screen: ProjectNavigator
    }
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
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
