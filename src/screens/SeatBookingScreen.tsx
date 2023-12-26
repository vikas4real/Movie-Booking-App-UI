import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  ImageBackground,
  ScrollView,
  ToastAndroid,
  TouchableOpacity,
  FlatList,
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

const timeArray: string[] = [
  '10:00 AM',
  '12:45 PM',
  '02:30 PM',
  '05:45 PM',
  '08:30 PM',
];

const generateDate = () => {
  const date = new Date();
  let weekday = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  let weekdays = [];
  for (let i = 0; i < 7; i++) {
    let tempDate = {
      date: new Date(date.getTime() + i * 24 * 60 * 60 * 1000).getDate(),
      day: weekday[new Date(date.getTime() + i * 24 * 60 * 60 * 1000).getDay()],
    };
    weekdays.push(tempDate);
  }
  return weekdays;
};

const generateSeats = () => {
  let numRow = 8;
  let numColumn = 3;
  let rowArray = [];
  let start = 1;
  let reachnine = false;

  for (let i = 0; i < numRow; i++) {
    let columnArray = [];
    for (let j = 0; j < numColumn; j++) {
      let seatObject = {
        number: start,
        taken: Boolean(Math.round(Math.random())),
        selected: false,
      };
      columnArray.push(seatObject);
      start++;
    }
    if (i == 3) {
      numColumn += 2;
    }
    if (numColumn < 9 && !reachnine) {
      numColumn += 2;
    } else {
      reachnine = true;
      numColumn -= 2;
    }
    rowArray.push(columnArray);
  }
  return rowArray;
};

const SeatBookingScreen = ({navigation, route}: any) => {
  const [dateArray, setDateArray] = useState<any[]>(generateDate());
  const [selectedDateIndex, setSelectedDateIndex] = useState<any>();
  const [price, setPrice] = useState<number>(0);
  const [twoDSeatArray, setTwoDSeatArray] = useState<any[][]>(generateSeats());
  const [selectedSeatArray, setSelectedSeatArray] = useState([]);
  const [selectedTimeIndex, setSelectedTimeIndex] = useState<any>();

  const selectSeat = (index: number, subindex: number, num: number) => {
    if (!twoDSeatArray[index][subindex].taken) {
      let array: any = [...selectedSeatArray];
      let temp = [...twoDSeatArray];
      temp[index][subindex].selected = !temp[index][subindex].selected;
      if (!array.includes(num)) {
        array.push(num);
        setSelectedSeatArray(array);
      } else {
        const tempindex = array.indexOf(num);
        if (tempindex > -1) {
          array.splice(tempindex, 1);
          setSelectedSeatArray(array);
        }
      }
      setPrice(array.length * 5.0);
      setTwoDSeatArray(temp);
    }
  };

  const BookSeats = async () => {
    if (
      selectedSeatArray.length !== 0 &&
      timeArray[selectedTimeIndex] !== undefined &&
      dateArray[selectedDateIndex] !== undefined
    ) {
      try {
        await EncryptedStorage.setItem(
          'ticket',
          JSON.stringify({
            seatArray: selectedSeatArray,
            time: timeArray[selectedTimeIndex],
            date: dateArray[selectedDateIndex],
            ticketImage: route.params.posterImage,
          }),
        );
      } catch (error) {
        console.error(
          'Something went Wrong while storing in BookSeats Functions',
          error,
        );
      }
      navigation.navigate('Ticket', {
        seatArray: selectedSeatArray,
        time: timeArray[selectedTimeIndex],
        date: dateArray[selectedDateIndex],
        ticketImage: route.params.posterImage,
      });
    } else {
      ToastAndroid.showWithGravity(
        'Please Select Seats, Date and Time of the Show',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
      );
    }
  };

  return (
    <SafeAreaView style={{backgroundColor: COLORS.Black}}>
      <StatusBar backgroundColor={COLORS.Black} />
      <ScrollView
        style={styles.ScreenContainer}
        showsVerticalScrollIndicator={false}
        bounces={false}>
        <View>
          <ImageBackground
            source={{
              uri: route.params?.bgImage,
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
          <LinearGradient
            colors={[COLORS.Orange, COLORS.OrangeRGBA0]}
            start={{x: 1, y: 0}}
            end={{x: 1, y: 1}}
            style={styles.ScreenThisWay}>
            <Text style={{color: COLORS.WhiteRGBA32}}>Screen this way</Text>
          </LinearGradient>
          <View style={styles.seatContainer}>
            <View style={{gap: SPACING.space_15}}>
              {twoDSeatArray?.map((item, index) => {
                return (
                  <View key={index} style={styles.seatRow}>
                    {item?.map((subitem, subindex) => {
                      return (
                        <TouchableOpacity
                          key={subitem.number}
                          onPress={() =>
                            selectSeat(index, subindex, subitem.number)
                          }>
                          <CustomIcon
                            name="seat"
                            size={FONTSIZE.size_20}
                            color={
                              subitem.taken
                                ? COLORS.Grey
                                : COLORS.White && subitem.selected
                                ? COLORS.Orange
                                : COLORS.White
                            }
                          />
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                );
              })}
            </View>
          </View>
          <View style={styles.SeatRadioContainer}>
            <View style={styles.RadioContainer}>
              <CustomIcon
                name="radio"
                size={FONTSIZE.size_14}
                color={COLORS.White}
              />
              <Text style={styles.radiotext}>Available</Text>
            </View>
            <View style={styles.RadioContainer}>
              <CustomIcon
                name="radio"
                size={FONTSIZE.size_14}
                color={COLORS.Grey}
              />
              <Text style={styles.radiotext}>Taken</Text>
            </View>
            <View style={styles.RadioContainer}>
              <CustomIcon
                name="radio"
                size={FONTSIZE.size_14}
                color={COLORS.Orange}
              />
              <Text style={styles.radiotext}>Selected</Text>
            </View>
          </View>
        </View>
        <View style={styles.DateTimeContainer}>
          <FlatList
            horizontal
            bounces={false}
            contentContainerStyle={{gap: SPACING.space_24}}
            data={dateArray}
            keyExtractor={item => item.date}
            renderItem={({item, index}) => {
              return (
                <TouchableOpacity onPress={() => setSelectedDateIndex(index)}>
                  <View
                    style={[
                      styles.dateContainer,
                      index == 0
                        ? {marginLeft: SPACING.space_24}
                        : index == dateArray.length - 1
                        ? {marginRight: SPACING.space_24}
                        : {},
                      index == selectedDateIndex
                        ? {backgroundColor: COLORS.Orange}
                        : {},
                    ]}>
                    <Text style={styles.dateText}>{item.date}</Text>
                    <Text style={styles.dayText}>{item.day}</Text>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        </View>
        <View style={styles.DateTimeContainer}>
          <FlatList
            horizontal
            bounces={false}
            contentContainerStyle={{gap: SPACING.space_24}}
            data={timeArray}
            keyExtractor={item => item}
            renderItem={({item, index}) => {
              return (
                <TouchableOpacity onPress={() => setSelectedTimeIndex(index)}>
                  <View
                    style={[
                      styles.timeContainer,
                      index == 0
                        ? {marginLeft: SPACING.space_24}
                        : index == dateArray.length - 1
                        ? {marginRight: SPACING.space_24}
                        : {},
                      index == selectedTimeIndex
                        ? {backgroundColor: COLORS.Orange}
                        : {},
                    ]}>
                    <Text style={styles.timeText}>{item}</Text>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        </View>
        {selectedSeatArray.length !== 0 &&
          timeArray[selectedTimeIndex] !== undefined &&
          dateArray[selectedDateIndex] !== undefined && (
            <View style={styles.PayContainer}>
              <View style={styles.PriceContainer}>
                <Text style={styles.PriceHeaderText}>Total Price</Text>
                <Text style={styles.PriceText}>$ {price}.00</Text>
              </View>
              <TouchableOpacity onPress={() => BookSeats()}>
                <Text style={styles.buttonText}>Buy Tickets</Text>
              </TouchableOpacity>
            </View>
          )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default SeatBookingScreen;

const styles = StyleSheet.create({
  ScreenContainer: {
    display: 'flex',
    backgroundColor: COLORS.Black,
  },
  imageBG: {width: '100%', aspectRatio: 3072 / 1727},
  linearGradient: {height: '100%'},
  HeaderContainer: {
    marginHorizontal: SPACING.space_36,
    marginTop: SPACING.space_20 * 2,
  },
  ScreenThisWay: {
    height: SPACING.space_28,
    marginHorizontal: SPACING.space_36,
    marginVertical: SPACING.space_10,
    alignItems: 'center',
    borderTopLeftRadius: BORDERRADIUS.radius_15,
    borderTopRightRadius: BORDERRADIUS.radius_15,
  },
  seatContainer: {marginVertical: SPACING.space_20},
  seatRow: {
    flexDirection: 'row',
    gap: SPACING.space_15,
    justifyContent: 'center',
  },
  seatIcon: {
    color: COLORS.White,
  },
  SeatRadioContainer: {
    marginVertical: SPACING.space_18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  RadioContainer: {
    flexDirection: 'row',
    gap: SPACING.space_10,
    alignItems: 'center',
  },
  radiotext: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_12,
    color: COLORS.WhiteRGBA50,
  },
  DateTimeContainer: {
    marginTop: SPACING.space_20,
  },
  dateContainer: {
    width: SPACING.space_10 * 7,
    height: SPACING.space_10 * 10,
    borderRadius: BORDERRADIUS.radius_10 * 10,
    backgroundColor: COLORS.DarkGrey,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dateText: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_24,
    color: COLORS.White,
  },
  dayText: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_12,
    color: COLORS.WhiteRGBA50,
  },
  timeContainer: {
    paddingVertical: SPACING.space_10,
    paddingHorizontal: SPACING.space_20,
    borderRadius: BORDERRADIUS.radius_25,
    borderWidth: 1,
    borderColor: COLORS.Grey,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.space_10,
  },
  timeText: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_14,
    color: COLORS.White,
  },
  PayContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: SPACING.space_24,
    marginHorizontal: SPACING.space_36,
  },
  PriceContainer: {
    alignItems: 'center',
  },
  PriceHeaderText: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_14,
    color: COLORS.WhiteRGBA50,
  },
  PriceText: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_24,
    color: COLORS.White,
  },
  buttonText: {
    paddingVertical: SPACING.space_10,
    paddingHorizontal: SPACING.space_24,
    backgroundColor: COLORS.Orange,
    borderRadius: BORDERRADIUS.radius_25,
    fontFamily: FONTFAMILY.poppins_bold,
    fontSize: FONTSIZE.size_16,
    color: COLORS.White,
  },
});
