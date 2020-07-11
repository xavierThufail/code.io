import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { compose, applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import rootReducers from "./store/reducers/rootReducers";
import ContactScreen from "./screens/ContactScreen";

const Stack = createStackNavigator();
const store = createStore(rootReducers, compose(
  applyMiddleware(thunk)
))

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen 
            name="Contact"
            component={ContactScreen}
            options={{
              headerShown: false
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
