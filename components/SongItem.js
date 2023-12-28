import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { AntDesign, Entypo } from '@expo/vector-icons'
const SongItem = ({ item }) => {
    console.log("item", item)
    return (
        <View style={{
            flexDirection: "row",
            padding: 10,
            alignItems: "center",
            justifyContent: "space-between"
        }}>
            <Pressable style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between"
            }}>
                <Image source={{ uri: item?.track?.album?.images[0].url }} style={{
                    width: 50,
                    height: 50,
                    marginRight: 10
                }} />
                <View>
                    <Text
                        numberOfLines={1}
                        style={{
                            fontWeight: "bold",
                            fontSize: 14,
                            color: "white"
                        }}>{item?.track?.album?.name}</Text>
                    <Text style={{
                        marginTop: 4,
                        color: "#989898"
                    }}>{item?.track?.album?.artists[0].name}</Text>
                </View>
            </Pressable>
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 7,
                    marginHorizontal: 10,
                }}
            >
                <AntDesign name="heart" size={24} color="#1DB954" />
                <Entypo name="dots-three-vertical" size={24} color="#C0C0C0" />
            </View>
        </View>
    )
}

export default SongItem

const styles = StyleSheet.create({})