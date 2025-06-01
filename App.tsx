import {NavigationContainer} from '@react-navigation/native';
import {StatusBar, StyleSheet, Text, View} from 'react-native';
import AppNavigator from './app/navigation/AppNavigator';

function App() {
  return (
    <NavigationContainer>
      <AppNavigator />
      <StatusBar barStyle="default" backgroundColor="#8EBBFF" />
    </NavigationContainer>
  );
}

export default App;
