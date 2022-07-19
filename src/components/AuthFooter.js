import React from "react";
import { Pressable, StyleSheet, View } from 'react-native'

import RegularText from "./RegularText";
import BoldText from "./BoldText";

const AuthFooter = props => {
    const { text, actionText, onAction } = props

    return (
        <View style={styles.container}>
            <RegularText>
                {text}
            </RegularText>
            <Pressable onPress={onAction}>
                <BoldText>{actionText}</BoldText>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20
    }
})

export default React.memo(AuthFooter)