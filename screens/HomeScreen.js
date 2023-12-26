import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  Platform,
  SafeAreaView
} from 'react-native'
import { LinearGradient } from "expo-linear-gradient";
const HomeScreen = () => {
  return (
    <LinearGradient colors={["#040306", "#131624"]} style={{ flex: 1 }}>
      <SafeAreaView style={{ marginTop: Platform.OS == "android" ? 40 : 0 }}>
      </SafeAreaView>
    </LinearGradient>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})