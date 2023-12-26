import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {COLORS, FONTFAMILY, FONTSIZE, SPACING} from '../theme/theme';

const CouldntLoad = (props: any) => {
  return (
    // TODO
    <View style={styles.container}>
      <Text>Couldn't Load</Text>
      <TouchableOpacity style={styles.retryButton} onPress={() => props.action}>
        <Text style={styles.retryText}>Retry</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  retryButton: {
    backgroundColor: COLORS.Orange,
    height: SPACING.space_20,
    width: SPACING.space_20 * 2,
    paddingHorizontal: SPACING.space_8,
    paddingVertical: SPACING.space_4,
  },
  retryText: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_14,
    color: COLORS.White,
  },
});
export default CouldntLoad;
