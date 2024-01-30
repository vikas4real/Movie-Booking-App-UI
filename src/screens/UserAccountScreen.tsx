import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  Image,
} from 'react-native';
import {COLORS, FONTFAMILY, FONTSIZE, SPACING} from '../theme/theme';
import AppHeader from '../components/AppHeader';
import CustomIcon from '../components/CustomIcon';

const UserAccountScreen = ({navigation}: any) => {
  return (
    <View style={styles.ScreenContainer}>
      <StatusBar translucent backgroundColor={COLORS.Black} />
      <View style={styles.HeaderContainer}>
        <AppHeader
          name="close"
          title="My Profile"
          action={() => navigation.navigate('Home')}
        />
      </View>
      <View style={styles.AvatarContainer}>
        <Image
          source={require('../assets/image/avatar.png')}
          style={styles.AvatarStyle}
        />
        <Text style={styles.NameStyle}>John Doe</Text>
      </View>
      <View style={styles.ProfileItems}>
        <View style={styles.SubItem}>
          <View style={styles.SubItemInfo}>
            <CustomIcon
              name="user"
              size={FONTSIZE.size_24}
              color={COLORS.White}
            />
            <Text style={styles.ItemText}>Account</Text>
          </View>
          <CustomIcon
            name="arrow-right"
            size={FONTSIZE.size_24}
            color={COLORS.White}
          />
        </View>

        <View style={styles.SubItem}>
          <View style={styles.SubItemInfo}>
            <CustomIcon
              name="setting"
              size={FONTSIZE.size_24}
              color={COLORS.White}
            />
            <Text style={styles.ItemText}>Settings</Text>
          </View>
          <CustomIcon
            name="arrow-right"
            size={FONTSIZE.size_24}
            color={COLORS.White}
          />
        </View>

        <View style={styles.SubItem}>
          <View style={styles.SubItemInfo}>
            <CustomIcon
              name="dollar"
              size={FONTSIZE.size_24}
              color={COLORS.White}
            />
            <Text style={styles.ItemText}>Offers & Referals</Text>
          </View>
          <CustomIcon
            name="arrow-right"
            size={FONTSIZE.size_24}
            color={COLORS.White}
          />
        </View>

        <View style={styles.SubItem}>
          <View style={styles.SubItemInfo}>
            <CustomIcon
              name="info"
              size={FONTSIZE.size_24}
              color={COLORS.White}
            />
            <Text style={styles.ItemText}>About</Text>
          </View>
          <CustomIcon
            name="arrow-right"
            size={FONTSIZE.size_24}
            color={COLORS.White}
          />
        </View>
      </View>
      <View style={styles.AppDeveloperInfo}>
        <Text style={styles.AppDveloperText}>Developed by Vikas Pandey</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  ScreenContainer: {
    flex: 1,
    backgroundColor: COLORS.Black,
    marginTop: StatusBar.currentHeight,
  },
  HeaderContainer: {
    marginHorizontal: SPACING.space_36,
  },
  AvatarContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: SPACING.space_36,
    gap: SPACING.space_10,
  },
  AvatarStyle: {
    borderRadius: 80,
    width: 80,
    height: 80,
  },
  NameStyle: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_18,
    color: COLORS.White,
  },
  ProfileItems: {
    gap: SPACING.space_36,
    marginHorizontal: SPACING.space_36,
  },
  SubItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  SubItemInfo: {
    flexDirection: 'row',
    gap: SPACING.space_10,
  },
  ItemText: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_14,
    color: COLORS.White,
  },
  AppDeveloperInfo: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 'auto',
  },
  AppDveloperText: {
    fontFamily: FONTFAMILY.poppins_light,
    fontSize: FONTSIZE.size_14,
    color: COLORS.WhiteRGBA75,
  },
});
export default UserAccountScreen;
