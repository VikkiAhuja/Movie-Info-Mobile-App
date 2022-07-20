import axios from 'axios'
import constants from './src/constants'

axios.defaults.baseURL = 'https://api.themoviedb.org/3/'

axios.interceptors.request.use((config) => {
    config.params = {
        ...config.params,
        api_key: constants.apiKey
    }
    return config
}, (error) => {
    throw new Error(error)
})

export default axios
