import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import LoginScreen from '../screens/LoginScreen'
import BottomTabs from './BottomTabs'
import LikedSongsScreen from '../screens/LikedSongsScreen'
import SongInfoScreen from '../screens/SongInfoScreen'

const Stack = createStackNavigator()

const Navigation = () => {
  return (
    <Stack.Navigator 
      screenOptions={{headerShown: false}}
    >
      <Stack.Screen name="Login" component={LoginScreen}/>
      <Stack.Screen name="Main" component={BottomTabs}/>
      <Stack.Screen name="Liked" component={LikedSongsScreen}/>
      <Stack.Screen name="Info" component={SongInfoScreen}/>

    </Stack.Navigator>
  )
}

export default Navigation

const styles = StyleSheet.create({})