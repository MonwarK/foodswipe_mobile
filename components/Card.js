import React from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'

const CardComponent = ({name, description, imageUrl}) => {
    return (
        name?
        <View style={Style.card}>
            <Image style={Style.image} source={{uri: imageUrl}}/>
            <View style={Style.information}>
                <Text style={Style.foodTitle}>{name}</Text>
                <Text style={Style.foodDescription}>{description?description?.substring(0, 40):null}...</Text>
            </View>
        </View>
        :null
    )
}

export default CardComponent

const Style = StyleSheet.create({
    foodTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginTop: 2,
        marginBottom: 10
    },
    foodDescription: {
        fontSize: 18,
    },
    image: {
        height: "75%",
        width: "100%",
    },
    card: {
        backgroundColor: "#fff",
        width: "100%",
        height: "85%",
        borderRadius: 8,
        position: "absolute",
        borderWidth: 1,
        borderColor: "lightgrey",
        paddingBottom: 10
    },
    information: {
        padding: 10
    }
})