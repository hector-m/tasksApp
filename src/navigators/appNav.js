
import React from "react";
import { StyleSheet } from "react-native";
import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { Icon } from 'react-native-elements';
import HomePage from "../pages/homePage";
import ProjectNavigator from "./projectNav";

const AppNavigator = createBottomTabNavigator({
  Home: {
    screen: HomePage,
  },
  AddButton: {
    screen: () => null,
    showLabel: false,
		navigationOptions: () => ({
      title: '',
			tabBarIcon: (
        <Icon
        name='plus-circle'
        type='material-community'
        color='#F857C3'
        size={66}
        iconStyle={styles.addIcon}
        onPress={() => this.toggle()}
    />),
			tabBarOnPress: () => {}
		})
  },
  Projects: {
    screen: ProjectNavigator,
  }
}, {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Home') {
          iconName = `home`;
        } else if (routeName === 'Projects') {
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

const styles = StyleSheet.create({
  addIcon: {
      shadowColor: "#F456C3",
      shadowOffset: { width: 0, height: 7 },
      shadowOpacity: .47,
      position: "absolute",
      top: -50
  }
});