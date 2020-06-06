import { createStackNavigator } from "react-navigation-stack";
import CategoriesPage from "../pages/categoriesPage";
import ProjectTasksPage from "../pages/projectTasksPage";

const ProjectNavigator = createStackNavigator({
  Projects: {
    screen: CategoriesPage,
    navigationOptions: () => ({
      header: null
    })
  },
  ProjectTasks: {
    screen: ProjectTasksPage,
    navigationOptions: () => ({
      header: null
    })
  }
});

export default ProjectNavigator;
