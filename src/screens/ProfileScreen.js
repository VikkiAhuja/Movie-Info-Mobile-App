import React, { useCallback } from 'react'
import { StyleSheet, useWindowDimensions, View } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'

import BoldText from '../components/BoldText'
import RegularText from '../components/RegularText'
import Root from '../components/Root'
import RoundedButton from '../components/RoundedButton'
import { logout } from '../store/userSlice'
import theme from '../theme'
import { width } from '../utils/MiscUtils'

const DetailsComponent = props => {
    const {
        name,
        value    
    } = props

    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 5, marginTop: 10 }}>
            <BoldText style={{ width: width * 0.25 }}>{name}</BoldText>
            <RegularText>{value}</RegularText>
        </View>
    )
}

const ProfileScreen = props => {
    const dispatch = useDispatch()
    const userData = useSelector(state => state.userData)

    const onLogoutPressHandler = useCallback(() => {
        dispatch(logout())
    }, [dispatch])

    return (
        <Root>
            <View style={styles.root}>
                <BoldText style={{ fontSize: 16 }}>{"User Profile"}</BoldText>
                <View style={{ marginTop: 30 }}>
                    <DetailsComponent
                        name={"Username:"}
                        value={userData.userName}
                    />
                    <DetailsComponent
                        name={"Email:"}
                        value={userData.email}
                    />
                    <DetailsComponent
                        name={"Phone:"}
                        value={userData.phoneNumber}
                    />
                    <RoundedButton
                        title="Logout"
                        onPress={onLogoutPressHandler}
                        style={styles.btn} />
                </View>
            </View>
        </Root>
    )
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        paddingTop: 15,
        paddingHorizontal: 15,
        backgroundColor: theme.white
    },
    btn: { width: '80%', alignSelf: 'center', marginTop: 50 }
})

export default ProfileScreen
