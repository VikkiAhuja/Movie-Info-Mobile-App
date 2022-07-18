import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import AuthNavigator from './AuthNavigator';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator()

function MainNavigation() {
    const [isLoggedIn, setLoggedIn] = useState(false)
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={{
                    headerShown: false
                }}
            >
                <Tab.Screen
                    name='home'
                    component={HomeScreen}
                    options={{
                        title: 'Home'
                    }}
                />
                <Tab.Screen
                    name='profile'
                    component={isLoggedIn ? AuthNavigator : ProfileScreen}
                    options={{
                        title: 'Profile'
                    }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
}

export default MainNavigation

