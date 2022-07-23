import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import DetailsScreen from "../screens/DetailsScreen";
import ProfileScreen from "../screens/ProfileScreen";

const Stack = createNativeStackNavigator()

const AppNavigator = props => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen
                name="home"
                component={HomeScreen}
            />
            <Stack.Screen
                name="details"
                component={DetailsScreen}
                options={{
                    headerShown: true,
                    title: "Details"
                }}
            />
            <Stack.Screen
                name="profile"
                component={ProfileScreen}
            />
        </Stack.Navigator>
    )
}

export default AppNavigator
