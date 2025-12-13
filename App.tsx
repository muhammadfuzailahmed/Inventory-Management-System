/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NewAppScreen } from '@react-native/new-app-screen';
import { StatusBar, StyleSheet, Text, useColorScheme, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import StackScreen from "./Components/Navigation/Stack/StackScreen"
import Toast from 'react-native-toast-message';

function App() {
  return (
    <>
    <NavigationContainer>
        <StackScreen />
    </NavigationContainer>
    <Toast />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
});

export default App;
