import React, { useEffect, useState } from 'react'
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    Pressable,
    TextInput,
    FlatList
} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { AntDesign, Ionicons, MaterialCommunityIcons, Entypo } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import SongItem from '../components/SongItem'
const LikedSongsScreen = () => {
    const navigation = useNavigation()
    const [input, setInput] = useState("")
    const [savedTracks, setSavedTracks] = useState()

    async function getSavedTracks() {
        const accessToken = await AsyncStorage.getItem("accessToken")
        const response = await fetch(
            "https://api.spotify.com/v1/me/tracks?offset=0&limit=50",
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                },
                params: {
                    limit: 50,
                },
            }
        )
        if(!response.ok) {
            throw new Error("failed to fetch the tracks")
        }
        const data = await response.json()
        console.log("tracksData", data)
        setSavedTracks(data.items)
    }

    useEffect(()=> {
        getSavedTracks()
    },[])

    const playTrack = () => {

    }

    return (
        <LinearGradient colors={["#614385", "#516395"]} style={{ flex: 1 }}>
            <ScrollView style={{ flex: 1, marginTop: 20 }}>
                <Pressable style={{ marginHorizontal: 10 }}
                    onPress={() => navigation.goBack()}
                >
                    <Ionicons name='arrow-back' size={24} color="white" />
                </Pressable>
                <View style={{
                    flexDirection: "row",
                    alignItems: "center",
                    margin: 10
                }}>
                    <Pressable
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            gap: 10,
                            backgroundColor: "#42275a",
                            padding: 9,
                            flex: 1,
                            borderRadius: 3,
                            height: 38
                        }}
                    >
                        <AntDesign name="search1" size={20} color="white" />
                        <TextInput
                            value={input}
                            onChangeText={setInput}
                            placeholder='Find in Liked Songs'
                            placeholderTextColor="white"
                        />
                    </Pressable>
                    <Pressable style={{
                        padding: 9,
                        marginLeft: 10,
                        backgroundColor: "#42275a",
                        borderRadius: 3
                    }}>
                        <Text style={{
                            color: "white",
                            fontWeight: "400"
                        }}>
                            Sort
                        </Text>
                    </Pressable>
                </View>
                <View style={{ height: 50 }} />
                <View style={{ marginHorizontal: 10 }}>
                    <Text style={{
                        fontSize: 18,
                        fontWeight: "bold",
                        color: "white"
                    }}>Liked Songs</Text>
                    <Text style={{
                        color: "white",
                        fontSize: 13,
                        marginTop: 5
                    }}>430 songs</Text>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginHorizontal: 10 }}>
                    <Pressable style={{
                        width: 30,
                        height: 30,
                        borderRadius: 15,
                        backgroundColor: "#1D8954",
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                        <AntDesign name='arrowdown' size={20} color="white" />
                    </Pressable>
                    <View
                        style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
                    >
                        <MaterialCommunityIcons
                            name="cross-bolnisi"
                            size={24}
                            color="#1DB954"
                        />
                        <Pressable
                            onPress={playTrack}
                            style={{
                                width: 60,
                                height: 60,
                                borderRadius: 30,
                                justifyContent: "center",
                                alignItems: "center",
                                backgroundColor: "#1DB954",
                            }}
                        >
                            <Entypo name="controller-play" size={24} color="white" />
                        </Pressable>
                    </View>
                </View>
                <FlatList
                    data={savedTracks}
                    renderItem={({item}) => (
                        <SongItem item={item} />
                    )}
                />
            </ScrollView>
        </LinearGradient>
    )
}

export default LikedSongsScreen

const styles = StyleSheet.create({})