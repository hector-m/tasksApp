import { createAppContainer, createSwitchNavigator } from "react-navigation";
import SplashScreen from "./src/pages/splashPage";
import AppNavigator from "./src/navigators/appNav";

const InitialNavigator = createSwitchNavigator({
  Splash: SplashScreen,
  App: AppNavigator
});

export default createAppContainer(InitialNavigator);