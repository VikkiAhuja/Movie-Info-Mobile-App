import React, { useCallback, useRef } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'

import RoundedButton from '../components/RoundedButton'
import AppTextInput from '../components/AppTextInput'

import AuthFooter from '../components/AuthFooter'
import BoldText from '../components/BoldText'
import Root from '../components/Root'

import { showToast } from '../utils/ToastUtils'
import theme from '../theme'
import { useDispatch } from 'react-redux'
import { signup } from '../store/userSlice'

const RegisterScreen = (props) => {
    const { navigation } = props

    const dispatch = useDispatch()

    // ** Refs
    const userNameRef = useRef(null)
    const emailRef = useRef(null)
    const passwordRef = useRef(null)
    const confPasswordRef = useRef(null)
    const phoneNumberRef = useRef(null)

    const onRegisterPressHandler = useCallback(() => {
        try {
            const userName = userNameRef.current.getValue()
            const email = emailRef.current.getValue()
            const password = passwordRef.current.getValue()
            const confirmPassword = confPasswordRef.current.getValue()
            const phoneNumber = phoneNumberRef.current.getValue()


            if (!userName) {
                showToast("Please enter username.")
                return
            }
            if (!email) {
                showToast("Please enter email-address.")
                return
            }
            if (!password) {
                showToast("Please enter password.")
                return
            }
            if (!confirmPassword) {
                showToast("Please enter confirm password.")
                return
            }
            if (!phoneNumber) {
                showToast("Please enter phone number.")
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
            if (confirmPassword.length < 6) {
                showToast("Confirm password should contain atleast 6 characters/digits.")
                return
            }
            if (password !== confirmPassword) {
                showToast("Password and confirm password needs to be same.")
                return
            }
            if (phoneNumber.length !== 10) {
                showToast("Please enter valid phone number.")
                return
            }

            const userPayload = {
                userName,
                email,
                password,
                confirmPassword,
                phoneNumber
            }

            dispatch(signup(userPayload))
        } catch (err) {
            showToast('Error : ', err.message)
        }
    }, [dispatch])

    const submitEditingHandler = useCallback((sender) => {
        switch (sender) {
            case "username":
                emailRef.current?.focus()
                break
            case "email":
                passwordRef.current?.focus()
                break
            case "password":
                confPasswordRef.current?.focus()
                break
            case "confPassword":
                phoneNumberRef.current?.focus()
                break
            case "phoneNumber":
                onRegisterPressHandler()
                break
        }
    }, [onRegisterPressHandler])

    const loginHandler = useCallback(() => {
        navigation.navigate('login')
    }, [navigation])

    return (
        <Root style={styles.root}>
            <ScrollView style={{ flexGrow: 1 }} contentContainerStyle={{ minHeight: "100%" }}>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <BoldText style={{ fontSize: 24 }}>{"Register"}</BoldText>
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
                        ref={emailRef}
                        placeholder="Email"
                        keyboardType="email"
                        maxLength={50}
                        style={styles.inputStyle}
                        blurOnSubmit={false}
                        onSubmitEditing={submitEditingHandler.bind(null, "email")}
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
                    <AppTextInput
                        ref={confPasswordRef}
                        placeholder="Confirm Password"
                        secureTextEntry={true}
                        maxLength={15}
                        style={styles.inputStyle}
                        returnKeyType="done"
                        blurOnSubmit={true}
                        onSubmitEditing={submitEditingHandler.bind(null, "confPassword")}
                    />
                    <AppTextInput
                        ref={phoneNumberRef}
                        placeholder="Phone number"
                        keyboardType="numeric"
                        maxLength={10}
                        style={styles.inputStyle}
                        blurOnSubmit={true}
                        onSubmitEditing={submitEditingHandler.bind(null, "phoneNumber")}
                    />
                    <RoundedButton
                        title="REGISTER"
                        onPress={onRegisterPressHandler}
                        style={styles.loginBtn}
                    />
                </View>
                <AuthFooter
                    text={`Have an account? `}
                    actionText='Login here'
                    onAction={loginHandler}
                />
            </ScrollView>
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

export default RegisterScreen
