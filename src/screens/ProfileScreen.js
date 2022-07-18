import React from 'react'
import { StyleSheet, View } from 'react-native'
import BoldText from '../components/BoldText'
import theme from '../theme'

const ProfileScreen = props => {
    return (
        <View style={styles.root}>
            <BoldText>{"Profile Screen"}</BoldText>
        </View>
    )
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: theme.white
    }
})

export default ProfileScreen
