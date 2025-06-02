import {NavigationContainer} from '@react-navigation/native';
import {StatusBar, StyleSheet, Text, View} from 'react-native';
import AppNavigator from './app/navigation/AppNavigator';
import {Provider} from 'react-redux';
import Store from './app/redux/store/Store';
import { PaperProvider } from 'react-native-paper';

function App() {
  return (
      <PaperProvider>

    <Provider store={Store}>
      <NavigationContainer>
        <AppNavigator />
    
      </NavigationContainer>
    </Provider>
      </PaperProvider>
  );
}

export default App;
