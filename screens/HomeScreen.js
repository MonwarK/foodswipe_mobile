import React, { useEffect, useState } from 'react'
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native'
import { db } from '../firebase/firebase'
import Card from "../components/Card"
import Swiper from 'react-native-deck-swiper'
import CheckIcon from '@material-ui/icons/Check'
import CloseIcon from '@material-ui/icons/Close'
import { Ionicons } from '@expo/vector-icons'

const HomeScreen = ({meals, user}) => {

    const [filteredMeals, setFilteredMeals] = useState([])
    const [current, setCurrent] = useState(0)
    const [savedList, setSavedList] = useState([])
    
    const swiperRef = React.createRef();

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
    }, [current])

    useEffect(() => {
        meals.map(meal => {
            const exists = savedList.filter(item => meal.id.includes(item.data.foodId))
            if(!exists?.length){
                setFilteredMeals((preArray) => [...preArray, meal])                   
            } 
        })
    }, [])

    const onSwipe = (cardIndex) => {

        const currentMeal = filteredMeals[cardIndex]
        const exists = savedList.filter(item => currentMeal.id.includes(item.data.foodId));

        if(currentMeal.data.name && !exists.length){
            db
            .collection("saved")
            .add({
                uid: user.uid,
                foodId: currentMeal.id,
                name: currentMeal.data.name,
                imageUrl: currentMeal.data.imageUrl
            })
        }
    }

    return (
            <View style={Style.container}>
                <View style={Style.cardContainer}>
                    <Swiper
                        ref={swiperRef}
                        cards={meals}
                        renderCard={(card) => {
                            return (
                                <Card name={card?.data?.name} description={card?.data?.description} imageUrl={card?.data?.imageUrl}/>
                            )
                        }}
                        cardIndex={current}
                        stackSize= {3}
                        onSwipedLeft={onSwipe}
                        onSwiped={() => setCurrent(current + 1)}
                        disableTopSwipe
                        disableBottomSwipe
                        animateOverlayLabelsOpacity
                        animateCardOpacity
                        backgroundColor="transparent"
                        infinite
                        overlayLabels={{
                            left: {
                                title: "LIKED",
                                style: {
                                    label: {
                                        backgroundColor: '#0070FF',
                                        borderColor: '#0070FF',
                                        color: '#FFF',
                                        borderWidth: 1,
                                        fontSize: 24
                                    },
                                    wrapper: {
                                        flexDirection: 'column',
                                        alignItems: 'flex-start',
                                        justifyContent: 'flex-start',
                                        marginTop: 20,
                                        marginLeft: 20
                                    }
                                }
                            },
                            right: {
                                title: "NOPE",
                                style: {
                                    label: {
                                        backgroundColor: '#EC2379',
                                        borderColor: '#EC2379',
                                        color: '#ffffff',
                                        borderWidth: 1,
                                        fontSize: 24
                                    },
                                    wrapper: {
                                        flexDirection: 'column',
                                        alignItems: 'flex-end',
                                        justifyContent: 'flex-start',
                                        marginTop: 20,
                                        marginLeft: -20
                                    }
                                }
                            }
                        }}
                    />
                </View>
                <View style={Style.ButtonsContainer}>
                    <TouchableOpacity style={Style.likeButton} onPress={() => swiperRef.current.swipeLeft()}>
                        <Ionicons
                            style={Style.buttonText}
                            name="checkmark"
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={Style.dislikeButton} onPress={() => swiperRef.current.swipeRight()}>
                        <Ionicons
                            style={Style.buttonText}
                            name="close"
                        />
                    </TouchableOpacity>
                </View>
            </View>
    )
}

export default HomeScreen

const Style = StyleSheet.create({
    container : {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%"
    },
    ButtonsContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        marginBottom: 15
    },
    likeButton: {
        display: "flex",
        justifyContent: "center",
        alignItems:"center",
        backgroundColor: "#68C25E",
        borderRadius: 100,
        height: 50,
        width: 50,
    },
    dislikeButton: {
        display: "flex",
        justifyContent: "center",
        alignItems:"center",
        backgroundColor: "#FF0000",
        borderRadius: 100,
        height: 50,
        width: 50
    },
    buttonText: {
        fontSize: 24,
    }
})