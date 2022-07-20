import * as React from "react"
import { View, TouchableWithoutFeedback, Keyboard } from "react-native"
import { SafeAreaView } from 'react-native-safe-area-context'
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import theme from "../theme"

const Root = (props) => {
  const { children } = props

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.white }}>
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps={'always'}
        contentContainerStyle={{
          flexGrow: 1 // this will fix scrollview scroll issue by passing parent view width and height to it
        }}
      >
        <TouchableWithoutFeedback
          onPress={Keyboard.dismiss}
          style={{ flexGrow: 1 }}
        >
          <View style={{ flexGrow: 1 }}>
            {children}
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  )
}

export default Root