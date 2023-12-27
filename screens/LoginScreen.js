import React, { useEffect } from 'react'
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Pressable
} from 'react-native'
import { Entypo, MaterialIcons, AntDesign } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import * as WebBrowser from 'expo-web-browser';
import { makeRedirectUri, useAuthRequest } from 'expo-auth-session';

WebBrowser.maybeCompleteAuthSession();

// Endpoint
const discovery = {
  authorizationEndpoint: 'https://accounts.spotify.com/authorize',
  tokenEndpoint: 'https://accounts.spotify.com/api/token',
};


const LoginScreen = () => {
  const navigation = useNavigation()

  const [request, response, promptAsync] = useAuthRequest(
    {
      issuer:"https://accounts.spotify.com",
      clientId: "d023a210c5da4c01bbf9ae033ed36587",
      scopes: [
        "user-read-email",
        "user-library-read",
        "user-read-recently-played",
        "user-top-read",
        "playlist-read-private",
        "playlist-read-collaborative",
        "playlist-modify-public" // or "playlist-modify-private"
      ],
      redirectUri:'exp://192.168.68.109:8081',
    },
    discovery
  )

  useEffect(() => {

    console.log("request:", request)
     if (response?.type === 'success') {
      const { params } = response;
      const expirationDate = Date.now() + 1000;
      
      AsyncStorage.setItem("token", params.code);
      AsyncStorage.setItem("expirationDate", expirationDate.toString());

      // Navigate to your desired screen (assuming `navigation` is available in your scope)
      navigation.navigate("Main");
    } else if (response?.type === 'error') {
      console.error('Authentication error:', response.error);
    }
  }, [response]);

  useEffect(() => {
    
    const checkTokenValidity = async () => {
      const token = await AsyncStorage.getItem("token")

      console.log(token)
      const expirationDate = await AsyncStorage.getItem("expirationDate")
      console.log(expirationDate)

      if (token && expirationDate) {
        const currentTime = Date.now()
        console.log("currentTime ", currentTime)
        console.log("expirationDate: ", expirationDate)
        if (currentTime < parseInt(expirationDate)) {
          navigation.navigate("Main")
        } else {
          AsyncStorage.removeItem("token")
          AsyncStorage.removeItem("expirationDate")
        }
      }
    }

    checkTokenValidity()
  }, [])

  

   
  

  return (
    <LinearGradient colors={["#040306", "#131624"]} style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={{ marginTop: Platform.OS == "android" ? 40 : 0, alignItems: "center" }}>
        <View style={{ height: 80 }}></View>
        <Entypo
          name="spotify"
          size={80}
          color="white"
        />
        <Text style={{
          fontSize: 40,
          color: "white",
          fontWeight: "bold",
          textAlign: "center",
          marginTop: 40,
          marginHorizontal: 40
        }}>Milions of Songs Free on Spotify</Text>
        <View style={{ height: 80 }} />
        <Pressable
          onPress={() => {
            promptAsync();
          }}
          style={{
            backgroundColor: "#1DB954",
            width: 300,
            padding: 10,
            marginVertical: 10,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 25,
          }}>
          <Text>Sign in with spotify</Text>
        </Pressable>
        <Pressable style={{
          flexDirection: "row",
          backgroundColor: "#131624",
          width: 300,
          padding: 10,
          marginVertical: 10,
          borderRadius: 25,
          alignItems: "center",
          borderWidth: 0.8,
          borderColor: "#C0C0C0"
        }}>
          <MaterialIcons name='phone-android' size={25} color="white" />
          <Text style={{ flex: 1, textAlign: "center", color: "white" }}>Continue with phone number</Text>
        </Pressable>
        <Pressable style={{
          flexDirection: "row",
          backgroundColor: "#131624",
          width: 300,
          padding: 10,
          marginVertical: 10,
          borderRadius: 25,
          alignItems: "center",
          borderWidth: 0.8,
          borderColor: "#C0C0C0"
        }}>
          <AntDesign name='google' size={25} color="red" />
          <Text style={{ flex: 1, textAlign: "center", color: "white" }}>Continue with Google</Text>
        </Pressable>
        <Pressable style={{
          flexDirection: "row",
          backgroundColor: "#131624",
          width: 300,
          padding: 10,
          marginVertical: 10,
          borderRadius: 25,
          alignItems: "center",
          borderWidth: 0.8,
          borderColor: "#C0C0C0"
        }}>
          <Entypo name='facebook' size={25} color="blue" />
          <Text style={{ flex: 1, textAlign: "center", color: "white" }}>Continue with Facebook</Text>
        </Pressable>
      </SafeAreaView>
    </LinearGradient>
  )
}

export default LoginScreen

const styles = StyleSheet.create({})