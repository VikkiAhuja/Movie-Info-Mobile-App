import React, { forwardRef, useCallback, useImperativeHandle, useRef, useState } from 'react'
import { TextInput } from 'react-native'

const AppTextInput = forwardRef((props, ref) => {
    const { defaultValue, onChangeText } = props

    // ** Refs
    const selfRef = useRef(null)

    // ** States
    const [value, setValue] = useState(defaultValue ?? '')

    const onChangeTextHandler = useCallback((enteredText) => {
        setValue(enteredText)
        if (onChangeText && typeof onChangeText === "function") {
            onChangeText(enteredText)
        }
    }, [onChangeText])

    const initHandler = useCallback(() => ({
        getValue: () => value?.trim() ?? value,
        setValue: (newValue) => setValue(newValue),
        focus: () => selfRef.current.focus()
    }), [value])

    useImperativeHandle(ref, initHandler)

    return (
        <TextInput
            ref={selfRef}
            returnKeyType='next'
            blurOnSubmit={false}
            keyboardType='default'
            {...props}
            value={value}
            onChangeText={onChangeTextHandler}
        />
    )
})

export default React.memo(AppTextInput)
