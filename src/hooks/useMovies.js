import { useCallback, useEffect, useState } from "react"
import axios from '../../axios'

import PopularMoviesResponse from "../models/PopularMoviesResponse"
import MovieClass from "../models/MovieClass"

const useMovies = () => {
    const [popularMovies, setPopularMovies] = useState([])
    const [allMovies, setAllMovies] = useState([])
    const [searchResults, setSearchResults] = useState([])

    const [isLoading, setLoading] = useState(false)
    const [isSearching, setSearching] = useState(false)

    const getPopularMovies = useCallback(async () => {
        try {
            const getMoviesRes = await axios({
                url: 'movie/top_rated',
                method: 'POST'
            })
            const jsonData = getMoviesRes.data

            const movieResponse = new PopularMoviesResponse(jsonData)
            const moviesArr = movieResponse.results.map(movie => new MovieClass(movie))
            setPopularMovies(moviesArr)
        } catch (err) {
            console.log('[getMovies] Error : ', err.message)
        }
    }, [])

    const getAllMovies = useCallback(async () => {
        try {
            const getMoviesRes = await axios({
                url: 'movie/popular',
                method: 'POST'
            })
            const jsonData = getMoviesRes.data

            const movieResponse = new PopularMoviesResponse(jsonData)
            const moviesArr = movieResponse.results.map(movie => new MovieClass(movie))
            setAllMovies(moviesArr)
        } catch (err) {
            console.log('err : ', err.response.data)
            console.log('[getMovies] Error : ', err.message)
        }
    }, [])

    const searchMovies = useCallback(async (searchString) => {
        try {
            setSearching(true)
            const searcResults = await axios({
                url: `search/movie/?query=${searchString}`,
                method: 'POST'
            })
            setSearching(false)
            const searcResultsJson = searcResults.data
            setSearchResults(searcResultsJson.results)
        } catch (err) {
            setSearching(false)
            console.log('[searchMovies] Error : ', err.message)
        }
    }, [])

    const getMovieDetails = useCallback(async (movieId) => {
        try {
            setLoading(true)
            const movieDetailsRes = await axios({
                url: `https://api.themoviedb.org/3/movie/${movieId}`,
                method: "GET"
            })
            setLoading(false)
            return movieDetailsRes.data
        } catch (err) {
            setLoading(false)
            console.log('[getMovieDetails] Error : ', err.message)
            return null
        }
    }, [])

    const initHandler = useCallback(async () => {
        try {
            setLoading(true)
            await getPopularMovies()
            await getAllMovies()
            setLoading(false)
        } catch (err) {
            console.log('[initHandler] Error : ', err.message)
            setLoading(false)
        }
    }, [getPopularMovies, getAllMovies])

    useEffect(() => {
        initHandler()
    }, [initHandler])

    return {
        isLoading,
        isSearching,
        allMovies,
        popularMovies,
        searchResults,
        getPopularMovies,
        getAllMovies,
        searchMovies,
        getMovieDetails,
        setSearchResults
    }
}

export default useMovies