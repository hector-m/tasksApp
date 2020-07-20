import { createSwitchNavigator, createAppContainer } from "react-navigation";
import SplashScreen from "../pages/splashPage";
import SetUpScreen from "../pages/SetUpPage";
import AppNavigator from "./appNav";

const InitialNavigator = createSwitchNavigator({
  Splash: SplashScreen,
  SetUp: SetUpScreen,
  App: AppNavigator
});

export default createAppContainer(InitialNavigator);
