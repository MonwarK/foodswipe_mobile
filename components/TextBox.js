import React from 'react'
import { TextInput, StyleSheet } from 'react-native'

const TextBox = ({...otherProps}) => {
    return (
        <TextInput style={Style.textbox} {...otherProps}/>
    )
}

export default TextBox

const Style = StyleSheet.create({
    textbox: {
        backgroundColor: "#fff",
        marginBottom: 10,
        padding: 10,
        borderRadius: 4,
        width: "90%",
        maxWidth: 600
    }
})