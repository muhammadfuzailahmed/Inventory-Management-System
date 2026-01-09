import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import login from "../../Authentication/Login/Login"
import register from "../../Authentication/Register/Register"
import SplashScreen from "../../Screens/SplashScreen/Splashscreen"
import AddProduct from "../../Screens/Products/AddProduct/AddProduct"
import AddExpense from "../../Screens/Expenses/AddExpense/AddExpense"
import TabScreens from "../BotomTab/TabScreens"
import ChangePassword from '../../Screens/Settings/ChangePassword'
import UpdateInfo from "../../Screens/Settings/UpdateInfo"
import OrderHistory from "../../Screens/Settings/OrderHistory"
import settings from "../../Screens/Settings/Settings"
import forgotPassword from "../../Authentication/ForgotPassword/ForgotPassword"

const StackScreen = () => {

  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name='SplashScreen' component={SplashScreen}/>
        <Stack.Screen name='login' component={login}/>
        <Stack.Screen name='register' component={register}/>
        <Stack.Screen name='AddProduct' component={AddProduct}/>
        <Stack.Screen name='AddExpense' component={AddExpense}/>
        <Stack.Screen name='ChangePassword' component={ChangePassword}/>
        <Stack.Screen name='UpdateInfo' component={UpdateInfo}/>
        <Stack.Screen name='OrderHistory' component={OrderHistory}/>
        <Stack.Screen name='Settings' component={settings}/>
        <Stack.Screen name='bottomTabs' component={TabScreens}/>
        <Stack.Screen name='forgotPassword' component={forgotPassword}/>
    </Stack.Navigator>
  )
}

export default StackScreen

const styles = StyleSheet.create({})