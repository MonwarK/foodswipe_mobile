import React, { useState } from 'react'
import { Image, SafeAreaView, StyleSheet } from 'react-native'
import Button from '../components/Button'
import Tb from "../components/TextBox"
import { auth } from '../firebase/firebase'

const LoginScreen = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const SignIn = () => {
        auth.signInWithEmailAndPassword(
            email,
            password
        )
        .then(() => alert("Successfully signed in"))
        .catch(err => alert(err))
    }

    return (
        <SafeAreaView style={Style.container}>
            <Image source={{uri: "https://foodswipe-d2297.web.app/logo.png"}} style={Style.image}/>
            <Tb onChangeText={text => setEmail(text)} placeholder="Email"/>
            <Tb onChangeText={text => setPassword(text)} secureTextEntry placeholder="Password"/>
            <Button onClick={SignIn}>Login</Button>
        </SafeAreaView>
    )
}

export default LoginScreen

const Style = StyleSheet.create({
    container: {
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    image: {
        height: 100,
        width: 100,
        marginBottom: 25
    }
})