import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../theme/theme';
import CustomIcon from './CustomIcon';

const genres: any = {
  28: 'Action',
  12: 'Adventure',
  16: 'Animation',
  35: 'Comedy',
  80: 'Crime',
  99: 'Documentary',
  18: 'Drama',
  10751: 'Family',
  14: 'Fantasy',
  36: 'History',
  27: 'Horror',
  10402: 'Music',
  9648: 'Mystery',
  10749: 'Romance',
  878: 'Science Fiction',
  10770: 'TV Movie ',
  53: 'Thriller',
  10752: 'War',
  37: 'Western',
};

const LargeMovieCard = (props: any) => {
  return (
    <TouchableOpacity onPress={() => props.cardFunction()}>
      <View
        style={[
          styles.container,
          props.shouldMarginatedAtEnd
            ? props.isFirst
              ? {marginLeft: SPACING.space_36}
              : props.isLast
              ? {marginRight: SPACING.space_36}
              : {}
            : {},
          props.shouldMarginatedAround ? {margin: SPACING.space_12} : {},
          {maxWidth: props.cardWidth},
        ]}>
        <Image
          source={{uri: props.imagePath}}
          style={[styles.image, {width: props.cardWidth}]}
        />
        <View style={styles.RatingContainer}>
          <CustomIcon
            name="star"
            color={COLORS.Yellow}
            size={FONTSIZE.size_20}
          />
          <Text style={styles.ratingText}>{props.rating.toFixed(1)}</Text>
          <Text style={styles.ratingCountText}>({props.rating_count})</Text>
        </View>
        <Text numberOfLines={1} style={styles.TitleText}>
          {props.title}
        </Text>
        <View style={styles.GenreContainer}>
          {props.genres.map((item: any) => {
            return (
              <View key={item} style={styles.GenreBox}>
                <Text style={styles.GenreText}>{genres[item]}</Text>
              </View>
            );
          })}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: COLORS.Black,
  },
  image: {
    aspectRatio: 2 / 3,
    borderRadius: BORDERRADIUS.radius_20,
  },
  RatingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING.space_10,
    marginTop: SPACING.space_10,
  },
  ratingText: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_14,
    color: COLORS.White,
  },
  ratingCountText: {
    fontFamily: FONTFAMILY.poppins_light,
    fontSize: FONTSIZE.size_12,
    color: COLORS.White,
  },
  TitleText: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_24,
    color: COLORS.White,
    textAlign: 'center',
    paddingVertical: SPACING.space_10,
  },
  GenreContainer: {
    flex: 1,
    flexDirection: 'row',
    gap: SPACING.space_20,
    flexWrap: 'wrap',
    justifyContent: 'center',
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
});
export default LargeMovieCard;
