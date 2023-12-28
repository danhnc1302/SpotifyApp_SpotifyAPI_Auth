import React, { useState, useEffect } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Platform,
  SafeAreaView,
  Pressable,
  Image,
  TouchableOpacity,
  FlatList, 
  ScrollView
} from 'react-native'
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import RecentlyPlayedCard from '../components/RecentlyPlayedCard';
import axios from 'axios';

const HomeScreen = () => {
  const [userProfile, setUserProfile] = useState()
  const [recentlyPlayed, setRecentlyPlayed] = useState([])
  const [topArtists, setTopArtists] = useState([])
  const navigation = useNavigation()
  const greetingMessage = () => {
    const currentTime = new Date().getHours();
    if (currentTime < 12) {
      return "Good Morning";
    } else if (currentTime < 16) {
      return "Good Afternoon";
    } else {
      return "Good Evening";
    }
  };

  const message = greetingMessage();

  const getProfile = async () => {
    const accessToken = await AsyncStorage.getItem("accessToken")
    console.log("accessToken: ", accessToken)
    try {
      const response = await fetch("https://api.spotify.com/v1/me", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      const data = await response.json()
      console.log("UserData: ", data)
      setUserProfile(data)
      return data
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getProfile()
  }, [])

  const getRecentlyPlayedSongs = async () => {
    const accessToken = await AsyncStorage.getItem("accessToken")
    try {
      const response = await axios({
        method: "GET",
        url: "https://api.spotify.com/v1/me/player/recently-played?limit=4",
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
      const tracks = response.data.items
      setRecentlyPlayed(tracks)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    getRecentlyPlayedSongs()
  },[])


  useEffect(() => {
    const getTopItems = async () => {
      try {
        const accessToken = await AsyncStorage.getItem("accessToken");
        if (!accessToken) {
          console.log("Access token not found");
          return;
        }
        const type = "artists";
        const response = await axios.get(
          `https://api.spotify.com/v1/me/top/${type}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        setTopArtists(response.data.items);
      } catch (err) {
        console.log(err.message);
      }
    };

    getTopItems();
  }, []);

  console.log("userProfile: ",userProfile)
  console.log("recentlyPlayed: ", recentlyPlayed)


  const renderItem = ({item}) => {
    return (
      <Pressable
      style={{
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        marginHorizontal: 10,
        marginVertical: 8,
        backgroundColor: "#282828",
        borderRadius: 4,
        elevation: 3,
      }}
    >
      <Image
        style={{ height: 55, width: 55 }}
        source={{ uri: item.track.album.images[0].url }}
      />
      <View
        style={{ flex: 1, marginHorizontal: 8, justifyContent: "center" }}
      >
        <Text
          numberOfLines={2}
          style={{ fontSize: 13, fontWeight: "bold", color: "white" }}
        >
          {item.track.name}
        </Text>
      </View>
    </Pressable>
    )
  }

  return (
    <LinearGradient colors={["#040306", "#131624"]} style={{ flex: 1 }}>
      <ScrollView style={{ marginTop: 50 }}>
        <View style={{
          flexDirection: 'row',
          padding: 10,
          justifyContent: 'space-between',
          alignItems: "center"
        }}>
          <View style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center"
          }}>
            <Image source={{ uri: userProfile?.images[0].url }}
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                resizeMode: "cover"
              }}
            />
            <Text style={{
              marginLeft: 10,
              fontSize: 20,
              fontWeight: "bold",
              color: "white",
            }}>{message}</Text>
          </View>
          <MaterialCommunityIcons
            name="lightning-bolt-outline"
            size={24}
            color="white"
          />
        </View>
        <View
          style={{
            marginHorizontal: 12,
            marginVertical: 5,
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
          }}
        >
          <Pressable
            style={{
              backgroundColor: "#282828",
              padding: 10,
              borderRadius: 30,
            }}
          >
            <Text style={{ fontSize: 15, color: "white" }}>Music</Text>
          </Pressable>

          <Pressable
            style={{
              backgroundColor: "#282828",
              padding: 10,
              borderRadius: 30,
            }}
          >
            <Text style={{ fontSize: 15, color: "white" }}>
              Podcasts & Shows
            </Text>
          </Pressable>
        </View>
        <View style={{ height: 10 }} />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Pressable
            onPress={() => navigation.navigate("Liked")}
            style={{
              marginBottom: 10,
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
              flex: 1,
              marginHorizontal: 10,
              marginVertical: 8,
              backgroundColor: "#202020",
              borderRadius: 4,
              elevation: 3,
            }}
          >
            <LinearGradient colors={["#33006F", "#FFFFFF"]}>
              <Pressable
                style={{
                  width: 55,
                  height: 55,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <AntDesign name="heart" size={24} color="white" />
              </Pressable>
            </LinearGradient>

            <Text style={{ color: "white", fontSize: 13, fontWeight: "bold" }}>
              Liked Songs
            </Text>
          </Pressable>

          <View
            style={{
              marginBottom: 10,
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
              flex: 1,
              marginHorizontal: 10,
              marginVertical: 8,
              backgroundColor: "#202020",
              borderRadius: 4,
              elevation: 3,
            }}
          >
            <Image
              style={{ width: 55, height: 55 }}
              source={{ uri: "https://i.pravatar.cc/100" }}
            />
            <View style={styles.randomArtist}>
              <Text
                style={{ color: "white", fontSize: 13, fontWeight: "bold" }}
              >
                Hiphop Tamhiza
              </Text>
            </View>
          </View>
        </View>
        <FlatList
          data={recentlyPlayed}
          renderItem={renderItem}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: "space-between" }}
        />
        <Text
          style={{
            color: "white",
            fontSize: 19,
            fontWeight: "bold",
            marginHorizontal: 10,
            marginTop: 10, 
          }}
        >
          Your Top Artists
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {topArtists.map((item, index) => (
            <ArtistCard item={item} key={index} />
          ))}
        </ScrollView>
        <View style={{ height: 10 }} />
        <Text
          style={{
            color: "white",
            fontSize: 19,
            fontWeight: "bold",
            marginHorizontal: 10,
            marginTop: 10,
          }}
        >
          Recently Played
        </Text>
        <FlatList
          data={recentlyPlayed}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <RecentlyPlayedCard item={item} key={index} />
          )}
        />
      </ScrollView>
    </LinearGradient>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})