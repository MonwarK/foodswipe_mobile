import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const Header = () => {
    return (
        <View style={Style.container}>
            <Text style={Style.title}>FoodSwipe</Text>
        </View>
    )
}

export default Header

const Style = StyleSheet.create({
    container: {
        backgroundColor: "#28A745",
        padding: 20,
        textAlign: "center"
    },
    title: {
        color: "#fff",
        fontSize: 20,
        fontWeight: "bold"
    }
})