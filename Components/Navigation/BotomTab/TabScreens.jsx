import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Dashboard from "../../Screens/Dashboard/Dashboard"
import ShowAllProducts from "../../Screens/Products/ShowAllProducts/ShowAllProducts"
import ShowAllExpenses from "../../Screens/Expenses/ShowAllExpenses/ShowAllExpenses"
import sellProduct from "../../Screens/SellProducts/SellProduct/SellProduct"
import Settings from "../../Screens/Settings/Settings"
import { useRoute } from '@react-navigation/native';

const Tab = createBottomTabNavigator();

const TabScreens = ({route}) => {
  const {user} = route.params || {};
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen name='dashboard' component={Dashboard} initialParams={{user}}/>
      <Tab.Screen name='inventory' component={ShowAllProducts} initialParams={{user}}/>
      <Tab.Screen name='expenseList' component={ShowAllExpenses} initialParams={{user}}/>
      <Tab.Screen name='sellProduct' component={sellProduct} initialParams={{user}}/>
      <Tab.Screen name='settings' component={Settings} initialParams={{user}}/>
    </Tab.Navigator>
  )
}

export default TabScreens

const styles = StyleSheet.create({})