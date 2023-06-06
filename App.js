import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import HomeSCreen from './src/screens/HomeScreen';
import AddChatScreen from './src/screens/AddChatScreen';
import ChatScreen from './src/screens/ChatScreen';

const Stack = createStackNavigator();

const globalScreenOptions = {
  headerStyle: {backgroundColor: 'blue'},
  headerTitleStyle: {color: 'white'},
  headerTintColor: 'white',
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={globalScreenOptions}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Home" component={HomeSCreen} />
        <Stack.Screen name="AddChat" component={AddChatScreen} />
        <Stack.Screen name="Chat" component={ChatScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
