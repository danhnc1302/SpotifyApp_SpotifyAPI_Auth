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
        tabBarStyle:{
          backgroundColor:"rgba(0,0,0,0.8)",
          position: "absolute",
          bottom:0,
          left:0,
          right:0,
          shadowOpacity:4,
          shadowRadius:4,
          elevation:4,
          shadowOffset:{
              width:0,
              height:-4
          },
          borderTopWidth:0 
      }
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: "Home",
          headerShown: false,
          tabBarLabelStyle: { color: "white" },
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Entypo name="home" size={24} color="white" />
            ) : (
              <AntDesign name="home" size={24} color="white" />
            ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: "Profile",
          headerShown: false,
          tabBarLabelStyle: { color: "white" },
          tabBarIcon: ({ focused }) =>
            focused ?
              (<Ionicons name="person" size={24} color="white" />) :
              (<Ionicons name="person-outline" size={24} color="white" />)

        }}
      />
    </Tab.Navigator>
  )
}

export default BottomTabs

const styles = StyleSheet.create({})