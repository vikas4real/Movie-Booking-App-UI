import React from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import CustomIcon from './CustomIcon';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../theme/theme';

const AppHeader = (props: any) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.IconBG} onPress={() => props.action()}>
        <CustomIcon
          name={props.name}
          color={COLORS.White}
          size={FONTSIZE.size_24}
        />
      </TouchableOpacity>
      <Text style={styles.headerText}>{props.title}</Text>
      <View style={styles.emptyView}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  IconBG: {
    height: SPACING.space_20 * 2,
    width: SPACING.space_20 * 2,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: BORDERRADIUS.radius_20 * 2,
    backgroundColor: COLORS.Orange,
  },
  headerText: {
    flex: 1,
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_20,
    color: COLORS.White,
    textAlign: 'center',
  },
  emptyView: {
    height: SPACING.space_20 * 2,
    width: SPACING.space_20 * 2,
  },
});
export default AppHeader;
