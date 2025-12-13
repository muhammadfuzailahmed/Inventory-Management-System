import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import login from "../../Authentication/Login/Login"
import register from "../../Authentication/Register/Register"

const StackScreen = () => {

  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name='login' component={login}/>
        <Stack.Screen name='register' component={register}/>
    </Stack.Navigator>
  )
}

export default StackScreen

const styles = StyleSheet.create({})