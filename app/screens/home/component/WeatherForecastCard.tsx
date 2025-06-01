import {Image, StyleSheet, Text, View} from 'react-native';
import {wp} from '../../../config/dimension';
import {IconButton} from 'react-native-paper';
import colors from '../../../config/colors';
import fonts from '../../../config/fonts';

export const WeatherForecastCard = ({data}: any) => {
  const WEEK_DAYS = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];
  const dayInAWeek = new Date().getDay();
  const forecastDays = WEEK_DAYS.slice(dayInAWeek, WEEK_DAYS.length).concat(
    WEEK_DAYS.slice(0, dayInAWeek),
  );
  return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
        <Text style={styles.forecastText}>Next Forecast</Text>
        <IconButton
          icon={'calendar-today'}
          style={{margin: 0, width: wp(28), height: wp(28)}}
          size={wp(28)}
          iconColor={colors.primaryBackground}
        />
      </View>
      {data.map((item: any, index: any) => (
        <View style={styles.cardContainer} key={index}>
          <Text style={styles.infoText}>{forecastDays[index]}</Text>
          <Image
            source={{uri: item?.icon}}
            style={{width: wp(28), height: wp(28)}}
          />
          <Text style={styles.infoText2}>{item?.temperature}°C</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(16, 64, 132, 0.1)',
    marginHorizontal: wp(25),
    marginVertical: wp(20),
    paddingHorizontal: wp(20),
    paddingVertical: wp(10),
    borderRadius: wp(12),
  },
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: wp(10),
  },
  forecastText: {
    fontSize: wp(18),
    color: colors.primaryBackground,
    fontFamily: fonts.GloryBold,
  },
  infoText: {
    fontSize: wp(18),
    color: colors.primaryBackground,
    fontFamily: fonts.GlorySemiBold,
    width: wp(120),
  },
  infoText2: {
    fontSize: wp(18),
    color: colors.primaryBackground,
    fontFamily: fonts.GlorySemiBold,
  },
});
