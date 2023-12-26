import React, {useState} from 'react';
import {StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';
import CustomIcon from './CustomIcon';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../theme/theme';

const InputHeader = (props: any) => {
  const [searchText, setSearchText] = useState('');
  return (
    <View style={styles.InputBox}>
      <TextInput
        style={styles.TextInput}
        value={searchText}
        onChangeText={textInput => setSearchText(textInput)}
        placeholder="Search movies..."
        placeholderTextColor={COLORS.WhiteRGBA32}
      />
      <TouchableOpacity
        style={styles.searchIcon}
        onPress={() => props.searchFunction(searchText)}>
        <CustomIcon
          name="search"
          color={COLORS.Orange}
          size={FONTSIZE.size_20}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  InputBox: {
    display: 'flex',
    paddingHorizontal: SPACING.space_24,
    paddingVertical: SPACING.space_8,
    borderWidth: 2,
    borderRadius: BORDERRADIUS.radius_25,
    borderColor: COLORS.WhiteRGBA15,
    flexDirection: 'row',
  },
  TextInput: {
    width: '90%',
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_14,
    color: COLORS.White,
  },
  searchIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.space_10,
  },
});
export default InputHeader;
