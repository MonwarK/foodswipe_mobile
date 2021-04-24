import React, { useState } from 'react'
import { Image, SafeAreaView, StyleSheet } from 'react-native'
import Button from '../components/Button'
import Tb from '../components/TextBox'
import { auth } from '../firebase/firebase'

const RegisterScreen = () => {

    const [firstName, setFirstName] = useState("")
    const [surname, setSurname] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const register = () => {
        if(firstName && surname && email && password && confirmPassword){
            if(password === confirmPassword){
                auth.createUserWithEmailAndPassword(
                    email,
                    password
                )
                .then(() => alert("Successfully Registered"))
                .catch((err) => alert(err))
            } 
            else{
                (alert("Passwords do not match"))
            }
        }
        else{
            return(alert("Please fill in all boxes"))
        }
    }

    return (
        <SafeAreaView style={Style.container}>
            <Image source={{uri: "https://foodswipe-d2297.web.app/logo.png"}} style={Style.image}/>
            <Tb onChangeText={text => setFirstName(text)} placeholder="First name"/>
            <Tb onChangeText={text => setSurname(text)} placeholder="Surname"/>
            <Tb onChangeText={text => setEmail(text)} placeholder="Email"/>
            <Tb onChangeText={text => setPassword(text)} secureTextEntry placeholder="Password"/>
            <Tb onChangeText={text => setConfirmPassword(text)} secureTextEntry placeholder="Confirm Password"/>
            <Button onClick={register}>Register</Button>
        </SafeAreaView>
    )
}

export default RegisterScreen

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