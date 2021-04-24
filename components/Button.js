import React from 'react'
import { Text, StyleSheet, TouchableOpacity } from 'react-native'

const Button = ({children, onClick}) => {
    return (
        <TouchableOpacity onPress={onClick} style={Style.button}>
            <Text style={Style.text}>{children}</Text>
        </TouchableOpacity>
    )
}

export default Button

const Style = StyleSheet.create({
    button: {
        backgroundColor: "#28A745",
        padding: 10,
        borderRadius: 4,
        width: "90%",
        maxWidth: 600
    },
    text: {
        textAlign: 'center',
        color: "#fff",
    }
})