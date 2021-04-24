import React, { useEffect } from 'react'
import { View, Text, Image, StyleSheet, FlatList } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'

const RecipeScreen = ({navigation, route: {params: {meals, id}}}) => {

    const currentMeal = meals.filter(meal => 
        meal.id.includes(id)    
    )
    

    useEffect(() => {
        navigation.setOptions({ title: currentMeal[0]?.data.name.substring(0, 20) + "..."})
    }, [])

    return (
        <ScrollView>
            <Image source={{uri: currentMeal[0]?.data.imageUrl}} style={Style.image}/>
            <View style={Style.information}>
                <Text style={Style.title}>{currentMeal[0]?.data.name}</Text>
                <Text style={Style.description}>{currentMeal[0]?.data.description}</Text>

                <Text style={Style.header}>Ingredients</Text>
                <FlatList
                    style={Style.list}
                    data={currentMeal[0]?.data.ingredients}
                    renderItem={({item}) => 
                        <Text style={Style.listItem}>- {item}</Text>
                    }
                />

                <Text style={Style.header}>Methods</Text>
                <FlatList
                    style={Style.list}
                    data={currentMeal[0]?.data.methods}
                    renderItem={({item, index}) => 
                        <Text style={Style.listItem}>{index+1}) {item}</Text>
                    }
                />
            </View>         
        </ScrollView>
    )
}

export default RecipeScreen

const Style = StyleSheet.create({
    title: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
        marginTop: 5
    },
    image: {
        width: "100%",
        height: 400
    },
    information: {
        padding: 10
    },
    description: {
        fontSize: 16,
        marginBottom: 10
    },
    header:{
        fontSize: 18,
        marginBottom: 10,
        fontWeight: 'bold',
    },
    list: {
        marginBottom: 10
    },
    listItem: {
        marginBottom: 10,
        fontSize: 16,
    }
})