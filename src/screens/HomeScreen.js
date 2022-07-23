import React, { useCallback, useRef } from 'react'
import { ActivityIndicator, FlatList, Image, Pressable, StyleSheet, View } from 'react-native'
import debounce from "lodash.debounce";
import { useSelector } from 'react-redux'

// ** Components
import BoldText from '../components/BoldText'
import AppTextInput from '../components/AppTextInput'

import useMovies from '../hooks/useMovies'

// ** Misc
import images from '../assets/images'
import constants from '../constants';
import theme from '../theme'

const HomeScreen = ({ navigation }) => {
    const userData = useSelector(state => state.userData)

    const {
        allMovies,
        popularMovies,
        searchResults,
        searchMovies,
        isLoading,
        isSearching,
        setSearchResults
    } = useMovies()

    const showDetails = useCallback((movieId) => {
        navigation.navigate('details', {
            movieId
        })
    }, [navigation])

    const renderPopularMoviesHandler = useCallback(({ item, index }) => {
        try {
            return (
                <Pressable
                    onPress={showDetails.bind(null, item.id)}
                    style={{
                        flex: 1,
                        elevation: 2,
                        backgroundColor: 'white',
                        marginVertical: 5,
                        borderRadius: 10,
                        marginRight: 10,
                        overflow: 'hidden',
                        width: 140
                    }}
                >
                    <Image
                        source={{ uri: constants.imagePath + item.poster_path }}
                        style={{
                            height: 150,
                            width: 140
                        }}
                        resizeMode="cover"
                    />
                    <View
                        style={{
                            height: 40,
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        <BoldText
                            style={{ fontSize: 10, textAlign: 'center' }}
                            numberOfLines={1}
                        >
                            {item.title}
                        </BoldText>
                    </View>
                </Pressable>
            )
        } catch (err) {
            console.log('Error : ', err.message)
            return null
        }
    }, [showDetails])

    const renderSearchResultsHandler = useCallback(({ item, index }) => {
        try {
            return (
                <Pressable
                    onPress={showDetails.bind(null, item.id)}
                    style={{
                        flex: 1,
                        elevation: 2,
                        backgroundColor: 'white',
                        marginVertical: 5,
                        borderRadius: 10,
                        marginRight: 10,
                        overflow: 'hidden',
                        width: "100%"
                    }}
                >
                    <Image
                        source={{ uri: constants.imagePath + item.poster_path }}
                        style={{
                            height: 200,
                            // width: 120
                        }}
                        resizeMode="cover"
                    />
                    <View
                        style={{
                            paddingVertical: 10,
                            paddingHorizontal: 5,
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        <BoldText
                            style={{ fontSize: 10, textAlign: 'center' }}
                            numberOfLines={2}
                        >
                            {item.title}
                        </BoldText>
                    </View>
                </Pressable>
            )
        } catch (err) {
            console.log('Error : ', err.message)
            return null
        }
    }, [showDetails])

    const searchBarRef = useRef()

    const delayedQuery = useRef(debounce(q => searchMovies(q), 800)).current;

    const onSearchValueChange = useCallback((enteredSearchText) => {
        try {
            if (enteredSearchText.trim().length) {
                delayedQuery(enteredSearchText)
            } else {
                setTimeout(() => setSearchResults([]))
            }
        } catch (err) {
            console.log('Error : ', err.message)
        }
    }, [setSearchResults])

    return (
        <View style={styles.root}>
            <View style={styles.container}>
                <BoldText style={styles.title}>{`Hello, ${userData?.userName ?? ''}`}</BoldText>
                <View
                    style={styles.searchbar}
                >
                    <AppTextInput
                        ref={searchBarRef}
                        style={{ flex: 1 }}
                        placeholder="Search"
                        onChangeText={onSearchValueChange}
                    />
                    <Pressable style={{ flexShrink: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <Image
                            source={images.ic_search}
                            style={{
                                height: 24,
                                width: 24
                            }}
                        />
                    </Pressable>
                </View>
            </View>
            {
                searchResults.length
                ? (
                    <View style={styles.searchResultsContainer}>
                        <FlatList
                            data={searchResults}
                            renderItem={renderSearchResultsHandler}
                            showsHorizontalScrollIndicator={false}
                            style={styles.searchFlatlistStyle}
                            contentContainerStyle={styles.searchFlatListContainerStyle}
                            ListHeaderComponent={
                                <BoldText style={styles.title}>{"Search Results"}</BoldText>
                            }
                            ListFooterComponent={
                                isSearching ? (
                                    <View style={styles.activityIndicatorContainer}>
                                        <ActivityIndicator size={"large"} color={theme.black} />
                                    </View>
                                ) : searchResults.length ? null : (
                                    <BoldText style={styles.title}>{"No Data Found!"}</BoldText>
                                )
                            }
                        />
                    </View>
                )
                : (
                    isLoading
                    ?
                        <View style={styles.loaderContainer}>
                            <ActivityIndicator size={"large"} color={theme.black} />
                        </View>
                    :
                    <>
                        <View style={styles.popularMoviesContainer}>
                            <BoldText style={styles.title}>{"Popular Movies"}</BoldText>
                            <FlatList
                                data={popularMovies}
                                renderItem={renderPopularMoviesHandler}
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                contentContainerStyle={styles.horizontalFlatListContainerStyle}
                            />
                        </View>
                        <View style={styles.allMoviesContainer}>
                            <BoldText style={styles.allMoviesText}>{"All Movies"}</BoldText>
                            <FlatList
                                data={allMovies}
                                renderItem={renderPopularMoviesHandler}
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                contentContainerStyle={styles.horizontalFlatListContainerStyle}
                            />
                        </View>
                    </>
                )
            }
        </View>
    )
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: theme.white
    },
    container: { paddingHorizontal: 10, marginTop: 10 },
    searchbar: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 30,
        paddingHorizontal: 15,
        marginTop: 15
    },
    searchResultsContainer: { flex: 1, paddingTop: 20, paddingLeft: 10 },
    searchFlatlistStyle: { 
        flex: 1
    },
    searchFlatListContainerStyle: {
        marginTop: 5,
        paddingStart: 1,
        paddingRight: 10,
        paddingBottom: 20
    },
    title: { fontSize: 18 },
    popularMoviesContainer: { paddingTop: 20, paddingLeft: 10 },
    activityIndicatorContainer: { height: 50, alignItems: 'center', justifyContent: 'center' },
    loaderContainer: { flex: 1, alignItems: 'center', justifyContent: 'center' },
    allMoviesText: { fontSize: 18, marginTop: 15 },
    allMoviesContainer: { paddingLeft: 10 },
    horizontalFlatListContainerStyle: {
        marginTop: 5,
        paddingStart: 1
    }
})

export default HomeScreen
