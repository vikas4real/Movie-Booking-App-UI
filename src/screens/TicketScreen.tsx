import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  ImageBackground,
  Image,
  Dimensions,
} from 'react-native';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../theme/theme';
import LinearGradient from 'react-native-linear-gradient';
import AppHeader from '../components/AppHeader';
import EncryptedStorage from 'react-native-encrypted-storage';
import CustomIcon from '../components/CustomIcon';

const TicketScreen = ({navigation, route}: any) => {
  const [ticketData, setTicketData] = useState<any>(route.params);
  useEffect(() => {
    (async () => {
      try {
        const ticket = await EncryptedStorage.getItem('ticket');
        if (ticket !== undefined && ticket !== null) {
          setTicketData(JSON.parse(ticket));
        }
      } catch (error) {
        console.error('Something went wrong while getting data', error);
      }
    })();
  }, []);

  if (ticketData !== route.params && route.params != undefined) {
    setTicketData(route.params);
  }

  if (ticketData == undefined || ticketData == null) {
    return (
      <SafeAreaView style={styles.ScreenContainer}>
        <StatusBar backgroundColor={COLORS.Black} />
        <View style={styles.HeaderContainer}>
          <AppHeader
            name="close"
            title="My Tickets"
            action={() => navigation.navigate('Home')}
          />
        </View>
      </SafeAreaView>
    );
  }
  return (
    <View style={styles.ScreenContainer}>
      <StatusBar translucent backgroundColor={COLORS.Black} />
      <View style={styles.HeaderContainer}>
        <AppHeader
          name="close"
          title="My Tickets"
          action={() => navigation.navigate('Home')}
        />
      </View>
      <View style={styles.TicketContainer}>
        <ImageBackground
          source={{uri: ticketData?.ticketImage}}
          style={styles.ImageStyle}>
          <LinearGradient
            colors={[COLORS.OrangeRGBA0, COLORS.Orange]}
            style={styles.LinearGradient}>
            <View
              style={[
                styles.BlackCircle,
                {position: 'absolute', bottom: -40, left: -40},
              ]}
            />
            <View
              style={[
                styles.BlackCircle,
                {position: 'absolute', bottom: -40, right: -40},
              ]}
            />
          </LinearGradient>
        </ImageBackground>
        <View style={styles.LineContainer}></View>
        <View style={styles.TicketFooter}>
          <View
            style={[
              styles.BlackCircle,
              {position: 'absolute', top: -40, left: -40},
            ]}
          />
          <View
            style={[
              styles.BlackCircle,
              {position: 'absolute', top: -40, right: -40},
            ]}
          />
          <View style={styles.DateTimeContainer}>
            <View style={styles.subContainer}>
              <Text style={styles.dateTitle}>{ticketData?.date.date}</Text>
              <Text style={styles.dayTitle}>{ticketData?.date.day}</Text>
            </View>
            <View style={styles.subContainer}>
              <CustomIcon
                name="clock"
                color={COLORS.White}
                size={FONTSIZE.size_24}
                style={{marginBottom: SPACING.space_16}}
              />
              <Text style={styles.dayTitle}>{ticketData?.time}</Text>
            </View>
          </View>
          <View style={styles.VenueDetailsContainer}>
            <View style={styles.subContainer}>
              <Text style={styles.Title}>AUDI</Text>
              <Text style={styles.SubTitle}>02</Text>
            </View>
            <View style={styles.subContainer}>
              <Text style={styles.Title}>Row</Text>
              <Text style={styles.SubTitle}>02</Text>
            </View>
            <View style={styles.subContainer}>
              <Text style={styles.Title}>Seats</Text>
              <Text style={styles.SubTitle}>
                {ticketData?.seatArray
                  .slice(0, 4)
                  .map((item: any, index: number, arr: any) => {
                    return item + (index == arr.length - 1 ? '' : ', ');
                  })}
              </Text>
            </View>
          </View>
          <Image
            source={require('../assets/image/barcode.png')}
            style={styles.BarCodeImage}
          />
        </View>
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
  TicketContainer: {flex: 1, justifyContent: 'center'},
  ImageStyle: {
    alignSelf: 'center',
    width: Dimensions.get('screen').width * 0.6,
    aspectRatio: 200 / 300,
    borderTopLeftRadius: BORDERRADIUS.radius_25,
    borderTopRightRadius: BORDERRADIUS.radius_25,
    overflow: 'hidden',
    justifyContent: 'flex-end',
  },
  LinearGradient: {
    height: '70%',
  },
  BlackCircle: {
    height: 80,
    width: 80,
    backgroundColor: COLORS.Black,
    borderRadius: 80,
  },
  LineContainer: {
    borderTopColor: COLORS.Black,
    borderTopWidth: 1,
    width: Dimensions.get('screen').width * 0.6,
    alignSelf: 'center',
    backgroundColor: COLORS.Orange,
    borderStyle: 'dashed',
  },
  TicketFooter: {
    backgroundColor: COLORS.Orange,
    width: Dimensions.get('screen').width * 0.6,
    alignItems: 'center',
    paddingBottom: SPACING.space_36,
    alignSelf: 'center',
    borderBottomLeftRadius: BORDERRADIUS.radius_25,
    borderBottomRightRadius: BORDERRADIUS.radius_25,
  },
  subContainer: {alignItems: 'center'},
  DateTimeContainer: {
    flexDirection: 'row',
    marginHorizontal: SPACING.space_36,
    marginVertical: SPACING.space_10,
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: SPACING.space_36,
  },
  dateTitle: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_24,
    color: COLORS.White,
  },
  dayTitle: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_14,
    color: COLORS.WhiteRGBA75,
  },
  VenueDetailsContainer: {
    flexDirection: 'row',
    gap: SPACING.space_36,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: SPACING.space_10,
  },
  Title: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_16,
    color: COLORS.White,
  },
  SubTitle: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_14,
    color: COLORS.WhiteRGBA75,
  },
  BarCodeImage: {
    height: 50,
    aspectRatio: 158 / 52,
  },
});
export default TicketScreen;
