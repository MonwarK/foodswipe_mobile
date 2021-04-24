import React, { useEffect, useState } from 'react'
import LoginScreen from './screens/LoginScreen';
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import RegisterScreen from './screens/RegisterScreen';
import { NavigationContainer } from '@react-navigation/native';
import { auth, db } from './firebase/firebase';
import HomeScreen from './screens/HomeScreen';
import SavedScreen from './screens/SavedScreen';

const Content = () => {
    
    const [user, setUser] = useState()
    const [savedList, setSavedList] = useState([])
    const [meals, setMeals] = useState([])

    const Tab = createBottomTabNavigator()

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(
            userAuth => {
                if(userAuth){
                    setUser({
                        uid: userAuth.uid,
                        email: userAuth.email
                    })
                } 
                else{
                    setUser(null)
                }
            }
        )
        
        db
        .collection("meals")
        .onSnapshot(snapshot => 
            setMeals(
                snapshot.docs.map(doc => ({
                    id: doc.id,
                    data: doc.data()
                }))
            )    
        )

        return unsubscribe
    }, [])

    return (
        <NavigationContainer>
            <Tab.Navigator 
                screenOptions={({route}) => ({
                tabBarIcon: ({ color, size }) => {
                    if(route.name === "Login"){
                        return <Ionicons
                        name='key'
                        size={size}
                        color={color}
                        />
                    }
                    else if(route.name === "Register"){
                        return <Ionicons 
                        name='person-add'
                        size={size}
                        color={color}
                        />
                    }
                    else if(route.name === "Home"){
                        return <Ionicons 
                        name='home'
                        size={size}
                        color={color}
                        />
                    }
                    else if(route.name === "Saved"){
                        return <Ionicons 
                        name='bookmark'
                        size={size}
                        color={color}
                        />
                    }
                }
            })}
            tabBarOptions={
                {
                    activeBackgroundColor: "#24933d",
                    inactiveBackgroundColor: "#28A745",
                    activeTintColor: "#fff",
                    inactiveTintColor: "#d6d6d6"
                }
            }
            >
            {
                user?
                <>
                    <Tab.Screen name="Home" component={() => <HomeScreen meals={meals} user={user} />} />
                    <Tab.Screen name="Saved" component={() => <SavedScreen meals={meals} user={user} />} />
                </>
                :
                <>
                    <Tab.Screen name="Login" component={LoginScreen} />
                    <Tab.Screen name="Register" component={RegisterScreen} />
                </>
            }
        </Tab.Navigator>
      </NavigationContainer>
    )
}

export default Content
