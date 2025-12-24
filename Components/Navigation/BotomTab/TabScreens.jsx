import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Dashboard from "../../Screens/Dashboard/Dashboard"
import ShowAllProducts from "../../Screens/Products/ShowAllProducts/ShowAllProducts"
import ShowAllExpenses from "../../Screens/Expenses/ShowAllExpenses/ShowAllExpenses"
import sellProduct from "../../Screens/SellProducts/SellProduct/SellProduct"
import Settings from "../../Screens/Settings/Settings"
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const Tab = createBottomTabNavigator();

const TabScreens = ({route}) => {
  const {user} = route.params || {};
  return (
    <Tab.Navigator screenOptions={{
      headerShown: false,
      tabBarActiveTintColor: "navy",
      tabBarInactiveTintColor: "black",
      tabBarLabelStyle:{
        fontSize: 13
      },
      tabBarStyle: {
        height: 70
      }
      }}>
      <Tab.Screen name='Dashboard' component={Dashboard} initialParams={{user}}
      options={{tabBarIcon: ({color, size}) => (
        <FontAwesome name="home" size={size} color={color} />
      )}}
      />
      <Tab.Screen name='Inventory' component={ShowAllProducts} initialParams={{user}}
      options={{tabBarIcon: ({color, size}) => (
        <MaterialIcons name="inventory" size={size} color={color}/>
      )}}
      />
      <Tab.Screen name='Expense' component={ShowAllExpenses} initialParams={{user}}
      options={{tabBarIcon: ({color, size}) => (
        <FontAwesome5 name="money-check-alt" size={size} color={color}/>
      )}}
      />
      <Tab.Screen name='Sell' component={sellProduct} initialParams={{user}}
      options={{tabBarIcon: ({color, size}) => (
        <MaterialIcons name="sell" size={size} color={color}/>
      )}}
      />
      <Tab.Screen name='Settings' component={Settings} initialParams={{user}}
      options={{tabBarIcon: ({color, size}) => (
        <Ionicons name="settings" size={size} color={color}/>
      )}}
      />
    </Tab.Navigator>
  )
}

export default TabScreens

const styles = StyleSheet.create({})