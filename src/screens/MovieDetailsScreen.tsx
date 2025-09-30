import React, {useState, useEffect} from 'react';
import {
  ActivityIndicator,
  ImageBackground,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import {baseImagePath, movieCastDetails, movieDetails} from '../api/apicalls';
import AppHeader from '../components/AppHeader';
import {
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
  BORDERRADIUS,
} from '../theme/theme';
import LinearGradient from 'react-native-linear-gradient';
import CustomIcon from '../components/CustomIcon';
import CategoryHeader from '../components/CategoryHeader';
import Castcard from '../components/Castcard';

//Fetch Movie Detail
const getMovieDetails = async (movie_id: number) => {
  try {
    let response = await fetch(movieDetails(movie_id));
    let json = await response.json();
    return json;
  } catch (error) {
    console.log('Something went wrong in getMovieDetails Function', error);
  }
};
//Fetch Movie Cast Detail
const getMovieCastDetails = async (movie_id: number) => {
  try {
    let response = await fetch(movieCastDetails(movie_id));
    let json = await response.json();
    return json;
  } catch (error) {
    console.log('Something went wrong in getMovieCastDetails Function', error);
  }
};

const MovieDetailsScreen = ({navigation, route}: any) => {
  const [movieData, setMovieData] = useState<any>(undefined);
  const [movieCastData, setMovieCastData] = useState<any>(undefined);

  useEffect(() => {
    (async () => {
      const tempMovieData = await getMovieDetails(route.params.movie_id);
      setMovieData(tempMovieData);
    })();
    (async () => {
      const tempMovieCastData = await getMovieCastDetails(
        route.params.movie_id,
      );
      setMovieCastData(tempMovieCastData.cast);
    })();
  }, []);

  // If no data available
  if (
    movieData == undefined &&
    movieData == null &&
    movieCastData == undefined &&
    movieCastData == null
  )
    return (
      <ScrollView
        style={styles.ScreenContainer}
        bounces={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.ScrollViewContainer}>
        <StatusBar backgroundColor={COLORS.Black} />
        <View style={styles.HeaderContainer}>
          <AppHeader name="close" title="" action={() => navigation.goBack()} />
        </View>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size={'large'} color={COLORS.Orange} />
        </View>
      </ScrollView>
    );

  // If data available
  return (
    <View style={{backgroundColor: COLORS.Black}}>
      <StatusBar translucent backgroundColor="transparent" />
      <ScrollView style={styles.ScreenContainer} bounces={false}>
        <View>
          <ImageBackground
            source={{
              uri: baseImagePath('w780', movieData?.backdrop_path),
            }}
            style={styles.imageBG}>
            <LinearGradient
              colors={[COLORS.BlackRGB10, COLORS.Black]}
              style={styles.linearGradient}>
              <View style={styles.HeaderContainer}>
                <AppHeader
                  name="close"
                  title=""
                  action={() => navigation.goBack()}
                />
              </View>
            </LinearGradient>
          </ImageBackground>
        </View>
        <View style={styles.imageBG}>
          <Image
            source={{uri: baseImagePath('w342', movieData?.poster_path)}}
            style={styles.poster_image}
          />
        </View>
        <View style={styles.Duration_Container}>
          <CustomIcon
            name="clock"
            size={FONTSIZE.size_16}
            color={COLORS.WhiteRGBA50}
          />
          <Text style={styles.Duration_Text}>
            {Math.floor(movieData?.runtime / 60)}h {movieData?.runtime % 60}m
          </Text>
        </View>
        <View>
          <Text style={styles.TitleText}>{movieData?.original_title}</Text>
          <View style={styles.GenreContainer}>
            {movieData?.genres.map((item: any) => {
              return (
                <View key={item.id} style={styles.GenreBox}>
                  <Text style={styles.GenreText}>{item.name}</Text>
                </View>
              );
            })}
          </View>
          <Text style={styles.tagLine}>{movieData?.tagline}</Text>
        </View>
        <View style={styles.infoContainer}>
          <View style={styles.ratingContainer}>
            <CustomIcon
              name="star"
              size={FONTSIZE.size_16}
              color={COLORS.Yellow}>
              <Text style={styles.Duration_Text}>
                {' '}
                {movieData?.vote_average.toFixed(1)} ({movieData?.vote_count})
              </Text>
            </CustomIcon>
            <Text style={styles.Duration_Text}>
              {' '}
              Released:{' '}
              {new Date(movieData?.release_date).toLocaleDateString('default', {
                day: '2-digit',
                month: 'long',
                year: 'numeric',
              })}
            </Text>
          </View>
          <Text style={styles.overviewText}>{movieData?.overview}</Text>
        </View>
        <View>
          <CategoryHeader title="Top Cast" />
          <FlatList
            horizontal={true}
            contentContainerStyle={{gap: SPACING.space_24}}
            data={movieCastData}
            keyExtractor={(item: any) => item.id}
            renderItem={({item, index}) => {
              return (
                <Castcard
                  imagePath={baseImagePath('w185', item.profile_path)}
                  cardWidth={80}
                  title={item.original_name}
                  subtitle={item.character}
                  shouldMarginatedAtEnd={true}
                  isFirst={index == 0 ? true : false}
                  isLast={index == movieCastData?.length - 1 ? true : false}
                />
              );
            }}
          />
        </View>
        <TouchableOpacity
          onPress={() =>
            navigation.push('SeatBooking', {
              bgImage: baseImagePath('w780', movieData?.backdrop_path),
              posterImage: baseImagePath('original', movieData?.poster_path),
            })
          }
          style={styles.buttonBG}>
          <Text style={styles.buttonText}>Select Seats</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  ScreenContainer: {
    display: 'flex',
    backgroundColor: COLORS.Black,
  },
  ScrollViewContainer: {flex: 1},
  loadingContainer: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  HeaderContainer: {
    marginHorizontal: SPACING.space_36,
    marginTop: SPACING.space_20 * 2,
  },
  imageBG: {width: '100%', aspectRatio: 3072 / 1727},
  linearGradient: {height: '100%'},
  poster_image: {
    width: '60%',
    aspectRatio: 2 / 3,
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
  },
  Duration_Container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING.space_8,
    marginTop: SPACING.space_10,
  },
  Duration_Text: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_12,
    color: COLORS.WhiteRGBA50,
  },
  TitleText: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_24,
    color: COLORS.White,
    textAlign: 'center',
    marginVertical: SPACING.space_8,
    marginHorizontal: SPACING.space_10,
  },
  GenreContainer: {
    flex: 1,
    flexDirection: 'row',
    gap: SPACING.space_10,
    flexWrap: 'wrap',
    justifyContent: 'center',
    paddingHorizontal: SPACING.space_36,
  },
  GenreBox: {
    borderColor: COLORS.WhiteRGBA50,
    borderWidth: 1,
    paddingVertical: SPACING.space_4,
    paddingHorizontal: SPACING.space_10,
    borderRadius: BORDERRADIUS.radius_25,
  },
  GenreText: {
    fontFamily: FONTFAMILY.poppins_light,
    fontSize: FONTSIZE.size_10,
    color: COLORS.WhiteRGBA75,
  },
  tagLine: {
    fontFamily: FONTFAMILY.poppins_light,
    fontSize: FONTSIZE.size_14,
    color: COLORS.WhiteRGBA75,
    marginHorizontal: SPACING.space_36,
    marginVertical: SPACING.space_10,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  infoContainer: {
    display: 'flex',
    marginHorizontal: SPACING.space_10,
  },
  ratingContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  overviewText: {
    fontFamily: FONTFAMILY.poppins_light,
    fontSize: FONTSIZE.size_10,
    color: COLORS.WhiteRGBA50,
  },
  buttonBG: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: SPACING.space_24,
  },
  buttonText: {
    backgroundColor: COLORS.Orange,
    borderRadius: BORDERRADIUS.radius_25 * 2,
    paddingHorizontal: SPACING.space_24,
    paddingVertical: SPACING.space_10,
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_14,
    color: COLORS.White,
  },
});
export default MovieDetailsScreen;
