import React, { useEffect, useMemo, useState } from 'react'
import { ActivityIndicator, Image, StyleSheet, View } from 'react-native'
import BoldText from '../components/BoldText'
import RegularText from '../components/RegularText'
import Root from '../components/Root'

import constants from '../constants'
import useMovies from '../hooks/useMovies'
import MovieClass from '../models/MovieClass'
import theme from '../theme'

const DetailsScreen = ({ navigation, route }) => {
    const { movieId } = useMemo(() => route.params, [route])

    const {
        isLoading,
        getMovieDetails
    } = useMovies()

    const [movieDetails, setMovieDetails] = useState(null)
    
    useEffect(() => {
        getMovieDetails(movieId)
        .then(res => {
            setMovieDetails(new MovieClass(res))
        })
        .catch(err => {
            console.log('Error : ', err.message)
        })
    }, [movieId, getMovieDetails])

    return (
        <Root style={styles.root}>
            {
                isLoading
                ?
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <ActivityIndicator size={"large"} color={theme.black} />
                    </View>
                : !movieDetails
                    ?
                        null
                    : <>
                        <Image
                            source={{ uri: constants.imagePath + movieDetails.poster_path }}
                            style={{ height: 230, width: "100%" }}
                        />
                        <View style={{ paddingHorizontal: 15 }}>
                            <BoldText style={{ fontSize: 16, marginVertical: 10 }}>{movieDetails.title}</BoldText>
                            <RegularText>{`Language: ${movieDetails.original_language}`}</RegularText>
                            <RegularText style={{ marginTop: 10 }}>{`About`}</RegularText>
                            <RegularText style={{ marginBottom: 10 }}>{`${movieDetails.overview}`}</RegularText>
                            <RegularText style={{ marginBottom: 10 }}>{`Release: ${movieDetails.release_date}`}</RegularText>
                        </View>
                    </>
            }
        </Root>
    )
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: theme.white
    }
})

export default DetailsScreen
