import { createStackNavigator } from "react-navigation-stack";
import CategoriesPage from "../pages/categoriesPage";
import tasksInCategoriesPage from "../pages/tasksInCategoriesPage";


const ProjectNavigator = createStackNavigator({
    Projects: { 
        screen: CategoriesPage,
        navigationOptions: () => ({
            header: null
          }), 
    },
    ProjectTasks: {
        screen: tasksInCategoriesPage,
        navigationOptions: () => ({
            title: "HI"
          }), 
    },
});

export default ProjectNavigator;
