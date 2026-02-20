import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import 'react-native-gesture-handler';
import RootNavigator from "./src/navigation/RootNavigatort";
import { store } from './src/store';
import { Provider } from 'react-redux';

export default function App() {
  return (
    <Provider store={store}>
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
    </Provider>

  );
}