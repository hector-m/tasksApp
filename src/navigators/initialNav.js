

import { createAppContainer, createSwitchNavigator } from "react-navigation";
import SplashScreen from "../pages/splashPage";
import AppNavigator from "./appNav";

const InitialNavigator = createSwitchNavigator({
  Splash: SplashScreen,
  App: AppNavigator
});

export default createAppContainer(InitialNavigator);

