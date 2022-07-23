import { Dimensions } from 'react-native'

const { height, width } = Dimensions.get("window")

export { height, width }

export const customLog = (...params) => {
    __DEV__ && console.log.apply(null, params)
}