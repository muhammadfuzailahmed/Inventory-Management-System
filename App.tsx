/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

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

export default App;
