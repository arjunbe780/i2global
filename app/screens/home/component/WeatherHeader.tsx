import {Image, Text, View, StyleSheet} from 'react-native';
import {IconButton} from 'react-native-paper';
import { wp} from '../../../config/dimension';
import colors from '../../../config/colors';
import fonts from '../../../config/fonts';

export const WeatherHeader = ({data}: any) => {
  const temperature = Math.round(data.main?.temp);
  const minTemperature = Math.round(data.main?.temp_min);
  const maxTemperature = Math.round(data.main?.temp_max);
  const condition = data.weather?.main;
  const description = data.weather?.description;
  const icon = `https://openweathermap.org/img/wn/${data.weather?.icon}@2x.png`;
  return (
    <View>
      <View style={styles.headerRow}>
        <View style={styles.locationRow}>
          <IconButton
            icon="map-marker-outline"
            size={wp(28)}
            iconColor={colors.primaryBackground}
          />
          <Text style={styles.cityText}>{data.name}</Text>
        </View>
        <IconButton
          icon="cog-outline"
          size={wp(28)}
          iconColor={colors.primaryBackground}
        />
      </View>
      <View style={styles.weatherInfo}>
        <Image
          source={{uri: icon}}
          style={styles.weatherIcon}
          resizeMode="contain"
        />
        <Text style={styles.temperature}>{temperature}°C</Text>
        <Text style={styles.condition}>{condition}</Text>
        <Text style={styles.info}>{description} </Text>
        <Text style={styles.minMax}>
          Min {minTemperature}°C | Max {maxTemperature}°C
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cityText: {
    color: colors.primaryBackground,
    fontSize: wp(20),
    fontFamily: fonts.GloryBold,
  },
  weatherInfo: {
    alignItems: 'center',
    gap: wp(10),
  },
  weatherIcon: {
    width: wp(100),
    height: wp(100),
  },
  temperature: {
    color: colors.primaryBackground,
    fontSize: wp(30),
    fontFamily: fonts.GloryBold,
  },
  condition: {
    color: colors.primaryBackground,
    fontSize: wp(22),
    fontFamily: fonts.GloryBold,
    textTransform: 'capitalize',
  },
  info: {
    color: colors.primaryBackground,
    fontSize: wp(22),
    fontFamily: fonts.GloryRegular,
    textTransform: 'capitalize',
  },
  minMax: {
    color: colors.primaryBackground,
    fontSize: wp(22),
    fontFamily: fonts.GloryBold,
  },
});
