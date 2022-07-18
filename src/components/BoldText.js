import React from 'react';
import { Text } from 'react-native'

const BoldText = props => {
    return (
        <Text {...props} style={{ fontWeight: "bold", ...props.style }} />
    )
}

export default BoldText
