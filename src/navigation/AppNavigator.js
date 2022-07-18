import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import DetailsScreen from "../screens/DetailsScreen";
import ProfileScreen from "../screens/ProfileScreen";

const Stack = createNativeStackNavigator()

const AppNavigator = props => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="home"
                component={HomeScreen}
            />
            <Stack.Screen
                name="details"
                component={DetailsScreen}
            />
            <Stack.Screen
                name="profile"
                component={ProfileScreen}
            />
        </Stack.Navigator>
    )
}

export default AppNavigator
