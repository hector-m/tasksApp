import React from "react";
import { View } from "react-native";
import InitialNavigator from "./src/navigators/initialNav"
import { HeaderContainer as AddTaskSliderContainer } from "./src/containers/AddTaskSliderContainer"

class App extends React.Component {

  render() {
    return (
      <View style={{flex: 1}}>
        <InitialNavigator />
        <AddTaskSliderContainer />
      </View>
        
    );
  }
}

export default App