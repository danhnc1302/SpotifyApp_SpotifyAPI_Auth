import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from "../screens/HomeScreen"
import ProfileScreen from "../screens/ProfileScreen"
import { AntDesign, Entypo, Ionicons } from '@expo/vector-icons'
const Tab = createBottomTabNavigator()

const BottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: "Home",
          headerShown: false,
          tabBarLabelStyle: { color: "black" },
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Entypo name="home" size={24} color="black" />
            ) : (
              <AntDesign name="home" size={24} color="black" />
            ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: "Profile",
          headerShown: false,
          tabBarLabelStyle: { color: "black" },
          tabBarIcon: ({ focused }) =>
            focused ?
              (<Ionicons name="person" size={24} color="black" />) :
              (<Ionicons name="person-outline" size={24} color="black" />)

        }}
      />
    </Tab.Navigator>
  )
}

export default BottomTabs

const styles = StyleSheet.create({})