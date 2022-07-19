import React from 'react'
import { StyleSheet, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

// ** Components
import BoldText from '../components/BoldText'

// ** Misc
import theme from '../theme'

const HomeScreen = props => {
    return (
        <SafeAreaView style={styles.root}>
            <View style={{ padding: 20 }}>
                <BoldText style={{ fontSize: 18 }}>Hello, </BoldText>
                <View>
                    
                </View>
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

export default HomeScreen
