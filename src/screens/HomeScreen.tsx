import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
  SafeAreaView,
} from 'react-native';
import {COLORS, SPACING} from '../theme/theme';
import {
  baseImagePath,
  nowPlayingMovies,
  popularMovies,
  upcomingMovies,
} from '../api/apicalls';
import InputHeader from '../components/InputHeader';
import CategoryHeader from '../components/CategoryHeader';
import SmallMovieCard from '../components/SmallMovieCard';
import LargeMovieCard from '../components/LargeMoviecard';

const {width, height} = Dimensions.get('window');

// Fetching the data from API

const getNowPlayingMoviesList = async () => {
  try {
    let response = await fetch(nowPlayingMovies);
    let json = response.json();
    return json;
  } catch (error) {
    console.error(
      'Something went wrong in getNowPlayingMoviesList Function',
      error,
    );
  }
};

const getPopularMoviesList = async () => {
  try {
    let response = await fetch(popularMovies);
    let json = response.json();
    return json;
  } catch (error) {
    console.error(
      'Something went wrong in getPopularMoviesList Function',
      error,
    );
  }
};

const getUpcomingMoviesList = async () => {
  try {
    let response = await fetch(upcomingMovies);
    let json = response.json();
    return json;
  } catch (error) {
    console.error(
      'Something went wrong in getUpcomingMoviesList Function',
      error,
    );
  }
};

const HomeScreen = ({navigation}: any) => {
  // data state declaration
  const [nowPlayingMoviesList, setNowPlayingMoviesList] =
    useState<any>(undefined);
  const [popularMoviesList, setPopularMoviesList] = useState<any>(undefined);
  const [upcomingMoviesList, setUpcomingMoviesList] = useState<any>(undefined);

  //Storing fetched data into states
  useEffect(() => {
    (async () => {
      let tempNowPlaying = await getNowPlayingMoviesList();
      setNowPlayingMoviesList([
        {id: 'dummy1'},
        ...tempNowPlaying.results,
        {id: 'dummy2'},
      ]);

      let tempPopularMovies = await getPopularMoviesList();
      setPopularMoviesList(tempPopularMovies.results);

      let tempUpcomingMovies = await getUpcomingMoviesList();
      setUpcomingMoviesList(tempUpcomingMovies.results);
    })();
  }, []);

  const searchMoviesFunction = () => {
    navigation.navigate('Search');
  };

  // If no data is available
  if (
    nowPlayingMoviesList == undefined &&
    nowPlayingMoviesList == null &&
    popularMoviesList == undefined &&
    popularMoviesList == null &&
    upcomingMoviesList == undefined &&
    upcomingMoviesList == null
  ) {
    return (
      <ScrollView
        style={styles.ScreenContainer}
        bounces={false}
        contentContainerStyle={styles.ScrollViewContainer}>
        <StatusBar backgroundColor={COLORS.Black} />
        <View style={styles.InputHeaderContainer}>
          <InputHeader searchFunction={searchMoviesFunction} />
        </View>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size={'large'} color={COLORS.Orange} />
        </View>
      </ScrollView>
    );
  }
  // When data is available
  return (
    <SafeAreaView style={{backgroundColor: COLORS.Black}}>
      <StatusBar backgroundColor={COLORS.Black} />
      <ScrollView style={styles.ScreenContainer} bounces={false}>
        <View style={styles.InputHeaderContainer}>
          <InputHeader searchFunction={searchMoviesFunction} />
        </View>
        {/* Display Now Playing Movies Cards */}
        <CategoryHeader title={'Now Playing'} />
        <FlatList
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          bounces={false}
          decelerationRate={0}
          snapToInterval={width * 0.7 + SPACING.space_36}
          data={nowPlayingMoviesList}
          keyExtractor={(item: any) => item.id}
          contentContainerStyle={styles.containerGap36}
          renderItem={({item, index}) => {
            if (!item.original_title) {
              return (
                <View
                  style={{
                    width: (width - (width * 0.7 + SPACING.space_36 * 2)) / 2,
                  }}></View>
              );
            }
            return (
              <LargeMovieCard
                shouldMarginatedAtEnd={true}
                cardFunction={() => {
                  navigation.push('MovieDetails', {movie_id: item.id});
                }}
                cardWidth={width * 0.7}
                imagePath={baseImagePath('w780', item.poster_path)}
                title={item.original_title}
                rating={item.vote_average}
                rating_count={item.vote_count}
                genres={item.genre_ids}
                isFirst={index == 0 ? true : false}
                isLast={
                  index == nowPlayingMoviesList?.length - 1 ? true : false
                }
              />
            );
          }}
        />

        {/* Display Popular Movies Cards */}
        <CategoryHeader title={'Popular'} />
        <FlatList
          horizontal={true}
          bounces={false}
          data={popularMoviesList}
          keyExtractor={(item: any) => item.id}
          contentContainerStyle={styles.containerGap36}
          renderItem={({item, index}) => (
            <SmallMovieCard
              shouldMarginatedAtEnd={true}
              cardFunction={() => {
                navigation.push('MovieDetails', {movie_id: item.id});
              }}
              cardWidth={width / 3}
              title={item.original_title}
              imagePath={baseImagePath('w342', item.poster_path)}
              isFirst={index == 0 ? true : false}
              isLast={index == popularMoviesList?.length - 1 ? true : false}
            />
          )}
        />

        {/* Display Upcoming Movies Cards */}
        <CategoryHeader title={'Upcoming'} />
        <FlatList
          horizontal={true}
          bounces={false}
          data={upcomingMoviesList}
          keyExtractor={(item: any) => item.id}
          contentContainerStyle={styles.containerGap36}
          renderItem={({item, index}) => (
            <SmallMovieCard
              shouldMarginatedAtEnd={true}
              cardFunction={() => {
                navigation.push('MovieDetails', {movie_id: item.id});
              }}
              cardWidth={width / 3}
              title={item.original_title}
              imagePath={baseImagePath('w342', item.poster_path)}
              isFirst={index == 0 ? true : false}
              isLast={index == upcomingMoviesList?.length - 1 ? true : false}
            />
          )}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  ScreenContainer: {
    display: 'flex',
    backgroundColor: COLORS.Black,
  },
  ScrollViewContainer: {
    flex: 1,
  },
  InputHeaderContainer: {
    marginHorizontal: SPACING.space_36,
    marginTop: SPACING.space_15,
  },
  loadingContainer: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  containerGap36: {
    gap: SPACING.space_36,
  },
});
export default HomeScreen;
