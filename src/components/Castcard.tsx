import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {baseImagePath} from '../api/apicalls';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../theme/theme';

const Castcard = (props: any) => {
  return (
    <View
      style={[
        styles.container,
        props.shouldMarginatedAtEnd
          ? props.isFirst
            ? {marginLeft: SPACING.space_24}
            : props.isLast
            ? {marginRight: SPACING.space_24}
            : {}
          : {},
        {maxWidth: props.cardWidth},
      ]}>
      <Image
        source={{uri: baseImagePath('w342', props.imagePath)}}
        style={[styles.image, {width: props.cardWidth}]}
      />
      <Text style={styles.Title} numberOfLines={1}>
        {props.title}
      </Text>
      <Text style={styles.SubTitle} numberOfLines={1}>
        {props.subtitle}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  image: {
    aspectRatio: 1920 / 2880,
    borderRadius: BORDERRADIUS.radius_25 * 4,
  },
  Title: {
    alignSelf: 'stretch',
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_10,
    color: COLORS.White,
  },
  SubTitle: {
    alignSelf: 'stretch',
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_10,
    color: COLORS.WhiteRGBA75,
  },
});
export default Castcard;
