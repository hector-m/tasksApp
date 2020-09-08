import React from "react";
import { createAppContainer } from "react-navigation";
import { View, StyleSheet } from "react-native";
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
        return <HeaderContainer navigation={navigation} />;
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
        tabBarIcon: (
          <View style={styles.button}>
            <AddTaskButton />
          </View>
        ),
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

export default createAppContainer(AppNavigator);
