import React, { useState } from 'react';
import { Image } from 'react-native'

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from '../screens/HomeScreen';
import AuthNavigator from './AuthNavigator';
import ProfileScreen from '../screens/ProfileScreen';

import images from '../assets/images';
import theme from '../theme';
import BoldText from '../components/BoldText';
import RegularText from '../components/RegularText';

const Tab = createBottomTabNavigator()

function MainNavigation() {
    const [isLoggedIn, setLoggedIn] = useState(false)
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={{
                    headerShown: false,
                    tabBarActiveTintColor: theme.black,
                    tabBarLabelPosition: "below-icon"
                }}
            >
                <Tab.Screen
                    name='home'
                    component={HomeScreen}
                    options={{
                        title: 'Home',
                        tabBarIcon: ({ color, focused, size }) => {
                            return (
                                <Image
                                    source={images.ic_home}
                                    style={{
                                        height: size,
                                        width: size
                                    }}
                                />
                            )
                        },
                        tabBarLabel: ({ color, focused, position }) => {
                            return focused ? (
                                <BoldText style={{ fontSize: 13 }}>{"Home"}</BoldText>
                            ) : (
                                <RegularText style={{ fontSize: 12 }}>{"Home"}</RegularText>
                            )
                        }
                    }}
                />
                <Tab.Screen
                    name='user'
                    component={!isLoggedIn ? AuthNavigator : ProfileScreen}
                    options={{
                        title: 'User',
                        tabBarIcon: ({ color, focused, size }) => {
                            return (
                                <Image
                                    source={images.ic_user}
                                    style={{
                                        height: size,
                                        width: size
                                    }}
                                />
                            )
                        },
                        tabBarLabel: ({ color, focused, position }) => {
                            return focused ? (
                                <BoldText style={{ fontSize: 13 }}>{"User"}</BoldText>
                            ) : (
                                <RegularText style={{ fontSize: 12 }}>{"User"}</RegularText>
                            )
                        }
                    }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
}

export default MainNavigation

