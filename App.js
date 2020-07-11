import React from 'react';
import * as Font from 'expo-font';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { compose, applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import { AppLoading } from 'expo';
import thunk from 'redux-thunk';


import rootReducers from "./store/reducers/rootReducers";
import ContactScreen from "./screens/ContactScreen";
import AddScreen from "./screens/AddScreen";

const Stack = createStackNavigator();
const store = createStore(rootReducers, compose(
  applyMiddleware(thunk)
))

const fetchFont = () => {
  return Font.loadAsync({
    'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
    'manrope': require('./assets/fonts/Manrope-VariableFont_wght.ttf'),
    'comic': require('./assets/fonts/ComicNeue-BoldItalic.ttf'),
    'lato': require('./assets/fonts/Lato-Bold.ttf'),
    'source-sans': require('./assets/fonts/SourceSansPro-Bold.ttf')
  })
}

export default function App() {
  const [dataLoaded, setDataLoaded] = React.useState(false)

  if(!dataLoaded) {
    return (
      <AppLoading
        startAsync={fetchFont}
        onFinish={() => setDataLoaded(true)}
      />
    )
  }

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
          <Stack.Screen 
            name="Add"
            component={AddScreen}
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
