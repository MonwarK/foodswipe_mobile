import { useNavigation } from '@react-navigation/core';
import React, { useEffect, useState } from 'react'
import { SafeAreaView, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import RecipeScreen from './RecipeScreen';
import { auth, db } from '../firebase/firebase';

const SavedScreen = ({navigation, route: {params: {meals, user}}}) => {

    const [savedList, setSavedList] = useState([])

    useEffect(() => {
        db
        .collection("saved")
        .where("uid", "==", user.uid)
        .onSnapshot(snapshot => 
            setSavedList(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            }))
        ))
    }, [])

    return (
        <SafeAreaView style={Style.container}>
            <FlatList 
                data={savedList}
                renderItem={({item}) => (
                    <TouchableOpacity style={Style.listItem} onPress={() => {
                        navigation.navigate('Recipe', {
                            meals: meals,
                            id: item.data.foodId
                        })
                    }}>
                        <Image style={Style.foodIcon} source={{uri: item.data.imageUrl}}/>
                        <Text>{item.data.name}</Text> 
                    </TouchableOpacity>
                )}
            />
            <Text style={Style.listItem} onPress={() => auth.signOut()}>Sign out</Text>
        </SafeAreaView>
    )
}

const SavedScreenStack = ({ meals, user}) => {

    const Stack = createStackNavigator()

    return(
        <Stack.Navigator>
            <Stack.Screen 
                name="Saved" 
                component={SavedScreen} 
                initialParams={{ meals: meals, user: user }}
                options={{
                    headerStyle: {
                        backgroundColor: '#28A745',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    }
                }}
            />
            <Stack.Screen 
                name="Recipe" 
                component={RecipeScreen} 
                options={{
                    headerStyle: {
                        backgroundColor: '#28A745',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    }
                }}
            />
        </Stack.Navigator>
    )
}

export default SavedScreenStack

const Style = StyleSheet.create({
    container: {
        height: "100%",
        width: "100%",
        backgroundColor: "#fff"
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center"
    },
    listItem:{
        padding: 15,
        display: "flex",
        flexDirection: "row",
        alignItems: "center"
    },
    foodIcon: {
        height: 50,
        width: 50,
        borderRadius: 100,
        marginRight: 10
    }
})