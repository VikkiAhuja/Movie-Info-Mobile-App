import React, { useCallback, useRef } from 'react'
import { StyleSheet, View } from 'react-native'

import RoundedButton from '../components/RoundedButton'
import AppTextInput from '../components/AppTextInput'
import AuthFooter from '../components/AuthFooter'
import BoldText from '../components/BoldText'
import Root from '../components/Root'

import { showToast } from '../utils/ToastUtils'
import theme from '../theme'
import { useDispatch } from 'react-redux'
import { login } from '../store/userSlice'

const LoginScreen = (props) => {
    const { navigation } = props

    const dispatch = useDispatch()

    // ** Refs
    const userNameRef = useRef(null)
    const passwordRef = useRef(null)

    const onLoginPressHandler = useCallback(() => {
        try {
            const userName = userNameRef.current.getValue()
            const password = passwordRef.current.getValue()

            if (!userName) {
                showToast("Please enter username.")
                return
            }
            if (!password) {
                showToast("Please enter password.")
                return
            }
            if (userName.length < 5) {
                showToast("Username should contain atleast 5 characters/digits.")
                return
            }
            if (password.length < 6) {
                showToast("Password should contain atleast 6 characters/digits.")
                return
            }

            dispatch(login({userName, password}))
    
        } catch (err) {
            showToast('Error : ', err.message)
        }
    }, [dispatch])

    const submitEditingHandler = useCallback((sender) => {
        switch (sender) {
            case "username":
                passwordRef.current?.focus()
                break
            case "password":
                onLoginPressHandler()
                break
        }
    }, [onLoginPressHandler])

    const createAccountHandler = useCallback(() => {
        navigation.navigate('register')
    }, [navigation])

    return (
        <Root style={styles.root}>
            <View style={{ flex: 0.5, alignItems: 'center', justifyContent: 'center' }}>
                <BoldText style={{ fontSize: 24 }}>{"Login"}</BoldText>
            </View>
            <View style={styles.container}>
                <AppTextInput
                    ref={userNameRef}
                    placeholder="Username"
                    maxLength={20}
                    style={styles.inputStyle}
                    blurOnSubmit={false}
                    onSubmitEditing={submitEditingHandler.bind(null, "username")}
                />
                <AppTextInput
                    ref={passwordRef}
                    placeholder="Password"
                    secureTextEntry={true}
                    maxLength={15}
                    style={styles.inputStyle}
                    returnKeyType="done"
                    blurOnSubmit={true}
                    onSubmitEditing={submitEditingHandler.bind(null, "password")}
                />
                <RoundedButton
                    title="LOGIN"
                    onPress={onLoginPressHandler}
                    style={styles.loginBtn}
                />
            </View>
            <AuthFooter
                text={`Don't have an account? `}
                actionText='Create New'
                onAction={createAccountHandler}
            />
        </Root>
    )
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: theme.white
    },
    container: {
        flex: 0.7,
        paddingHorizontal: 20
    },
    inputStyle: {
        borderBottomWidth: 1,
        marginBottom: 10
    },
    loginBtn: {
        alignSelf: 'center',
        marginTop: 20,
        width: "80%"
    }
})

export default LoginScreen
