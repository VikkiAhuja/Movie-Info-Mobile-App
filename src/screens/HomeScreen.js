import React from 'react'
import { StyleSheet, View } from 'react-native'

// ** Components
import BoldText from '../components/BoldText'

// ** Misc
import theme from '../theme'

const HomeScreen = props => {
    return (
        <View style={styles.root}>
            <BoldText>{"Home Screen"}</BoldText>
        </View>
    )
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: theme.white
    }
})

export default HomeScreen
