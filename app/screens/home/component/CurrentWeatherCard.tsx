import React from 'react';
import {View, Text, Image, StyleSheet, ScrollView} from 'react-native';
import colors from '../../../config/colors';
import {hp, wp} from '../../../config/dimension';
import fonts from '../../../config/fonts';

export const CurrentWeatherCard = ({data}: any) => {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.header}>
        <Text style={styles.todayText}>Today</Text>
        <Text style={styles.dateText}>{new Date().toDateString()}</Text>
      </View>

      <ScrollView style={styles.weatherContainer} horizontal>
        {data?.map((item: any, index: any) => (
          <View style={styles.weatherInfo} key={index}>
            <Text style={styles.infoText}>{item.temperature}</Text>
            <Image
              source={{uri: item.icon}}
              style={styles.weatherIcon}
              resizeMode="cover"
            />
            <Text style={styles.infoText}>{item.time}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: 'rgba(16, 64, 132, 0.1)',
    marginHorizontal: wp(25),
    marginVertical: wp(20),
    padding: wp(20),
    borderRadius: wp(12),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  todayText: {
    fontSize: wp(18),
    color: colors.primaryBackground,
    fontFamily: fonts.GloryBold,
  },
  dateText: {
    fontSize: wp(18),
    color: colors.primaryBackground,
    fontFamily: fonts.GloryRegular,
  },
  weatherContainer: {
    flexDirection: 'row',
    gap: wp(20),
    // alignItems: 'center',
    // justifyContent: 'space-between',
  },
  weatherInfo: {
    gap: wp(10),
    marginTop: wp(20),
    borderRadius: wp(12),
    borderWidth: wp(1),
    borderColor: 'rgba(255, 255, 255, 0.3)',
    alignItems: 'center',
    padding: wp(10),
    marginRight: wp(10),
  },
  infoText: {
    fontSize: wp(18),
    color: colors.primaryBackground,
    fontFamily: fonts.GloryRegular,
  },
  weatherIcon: {
    width: wp(30),
    height: hp(30),
  },
});
