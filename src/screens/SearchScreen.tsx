import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  StatusBar,
  FlatList,
  Dimensions,
} from 'react-native';
import {COLORS, SPACING} from '../theme/theme';
import {searchMovies, baseImagePath} from '../api/apicalls';
import InputHeader from '../components/InputHeader';
import SmallMovieCard from '../components/SmallMovieCard';

const {width} = Dimensions.get('screen');

const SearchScreen = ({navigation}: any) => {
  const [searchMoviesList, setSearchMoviesList] = useState([]);
  const searchMoviesFunction = async (name: string) => {
    try {
      let response = await fetch(searchMovies(name));
      let json = await response.json();
      setSearchMoviesList(json.results);
    } catch (error) {
      console.log('Error in SearchMovies Function', error);
    }
  };
  return (
    <View style={styles.ScreenContainer}>
      <StatusBar translucent backgroundColor={COLORS.Black} />
      <FlatList
        ListHeaderComponent={
          <View style={styles.InputHeaderContainer}>
            <InputHeader searchFunction={searchMoviesFunction} />
          </View>
        }
        numColumns={2}
        bounces={false}
        data={searchMoviesList}
        keyExtractor={(item: any) => item.id}
        renderItem={({item, index}) => (
          <SmallMovieCard
            shouldMarginatedAtEnd={false}
            shouldMarginatedAround={true}
            cardFunction={() => {
              navigation.push('MovieDetails', {movie_id: item.id});
            }}
            cardWidth={width / 2 - SPACING.space_12 * 2}
            title={item.original_title}
            imagePath={baseImagePath('w342', item.poster_path)}
            isFirst={index == 0 ? true : false}
            isLast={index == searchMoviesList?.length - 1 ? true : false}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  ScreenContainer: {
    flex: 1,
    backgroundColor: COLORS.Black,
    marginTop: StatusBar.currentHeight,
  },
  InputHeaderContainer: {
    display: 'flex',
    marginHorizontal: SPACING.space_36,
    marginVertical: SPACING.space_15,
  },
});
export default SearchScreen;
