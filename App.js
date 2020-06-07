import React from "react";
import { View } from "react-native";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import reducer from "./src/redux/reducers";
import InitialNavigator from "./src/navigators/initialNav";
import AddTaskSliderContainer from "./src/containers/AddTaskSliderContainer";
import HeaderContainer from "./src/containers/headerContainer";

import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

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
