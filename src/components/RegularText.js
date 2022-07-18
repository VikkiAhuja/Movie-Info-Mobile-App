import React from 'react';
import { Text } from 'react-native'

const RegularText = props => {
    return (
        <Text {...props} style={{ ...props.style }} />
    )
}

export default RegularText
