import React from "react";
import { View } from "react-native";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import * as Permissions from "expo-permissions";
import reducer from "./src/redux/reducers";
import InitialNavigator from "./src/navigators/initialNav";
import AddTaskSliderContainer from "./src/containers/AddTaskSliderContainer";

import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

class App extends React.Component {
  async componentDidMount() {
    // permissions returns only for location permissions on iOS and under certain conditions, see Permissions.LOCATION
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
  }
  render() {
    return (
      <Provider store={store}>
        <View style={{ flex: 1 }}>
          <InitialNavigator />
          <AddTaskSliderContainer />
        </View>
      </Provider>
    );
  }
}
//https://dribbble.com/shots/5687238-To-do-list-App-Freebie
export default App;
