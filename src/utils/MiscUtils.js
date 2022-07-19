export const customLog = (...params) => {
    __DEV__ && console.log.apply(null, params)
}