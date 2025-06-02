import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeNavigator from './HomeNavigator';
import NewsDetails from '../screens/news/NewsDetails';
const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="home"
        component={HomeNavigator}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="newsDetails"
        component={NewsDetails}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
