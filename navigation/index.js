import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import LoginScreen from '../screens/LoginScreen'
import BottomTabs from './BottomTabs'

const Stack = createStackNavigator()

const Navigation = () => {
  return (
    <Stack.Navigator 
      screenOptions={{headerShown: false}}
    >
      <Stack.Screen name="BottomTabs" component={BottomTabs}/>
      <Stack.Screen name="Login" component={LoginScreen}/>
    </Stack.Navigator>
  )
}

export default Navigation

const styles = StyleSheet.create({})