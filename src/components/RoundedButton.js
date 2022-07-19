import React from 'react'
import { Pressable, StyleSheet } from 'react-native';
import theme from '../theme';
import BoldText from './BoldText';

const RoundedButton = props => {
    const { title, onPress, style, textStyle } = props;

    return (
        <Pressable onPress={onPress} style={[styles.button, style]}>
            <BoldText style={[styles.textStyle, textStyle]}>{title}</BoldText>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    button: {
        borderRadius: 30,
        height: 50,
        width: "100%",
        backgroundColor: "grey",
        alignItems: 'center',
        justifyContent: 'center'
    },
    textStyle: {
        color: theme.white,
        fontSize: 14
    }
})

export default React.memo(RoundedButton)