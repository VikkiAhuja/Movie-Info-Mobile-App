import React from 'react'
import { StyleSheet, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import BoldText from '../components/BoldText'
import theme from '../theme'

const LoginScreen = props => {
    return (
        <SafeAreaView style={styles.root}>
            <View style={styles.root}>
                <BoldText>{"Login Screen"}</BoldText>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: theme.white
    }
})

export default LoginScreen
