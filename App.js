import React from "react";
import { View } from "react-native";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "./src/redux/reducers";
import InitialNavigator from "./src/navigators/initialNav";
import AddTaskSliderContainer from "./src/containers/AddTaskSliderContainer";
import HeaderContainer from "./src/containers/headerContainer";

const store = createStore(reducer);

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <View style={{ flex: 1 }}>
          <HeaderContainer />
          <InitialNavigator />
          <AddTaskSliderContainer />
        </View>
      </Provider>
    );
  }
}

export default App;
