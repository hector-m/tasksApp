import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import CategoriesPage from "../pages/categoriesPage";
import ProjectTasksPage from "../pages/projectTasksPage";
import HeaderContainer from "../containers/headerContainer";

const ProjectNavigator = createStackNavigator(
  {
    Projects: {
      screen: CategoriesPage
    },
    ProjectTasks: {
      screen: ProjectTasksPage
    }
  },
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
);

export default ProjectNavigator;
