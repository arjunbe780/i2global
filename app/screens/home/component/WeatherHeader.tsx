import {Image, Text, View, StyleSheet} from 'react-native';
import {IconButton, Menu} from 'react-native-paper';
import {wp} from '../../../config/dimension';
import colors from '../../../config/colors';
import fonts from '../../../config/fonts';
import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  getCurrentWeather,
  setWeatherPayload,
} from '../../../redux/slice/WeatherSlice';

// imperial --fahrenheit
// metric -- degrees
export const WeatherHeader = ({data}: any) => {
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch() as any;
  const {weatherPayload} = useSelector((state: any) => state.weather);
  const [unit, setUnit] = useState([
    {label: 'Celsius °C', value: 'metric', isSelected: true},
    {label: 'Fahrenheit °F', value: 'imperial', isSelected: false},
  ]);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);
  const getUnit = (value: any) => {
    const updateUnit = unit.map(item => ({
      ...item,
      isSelected: item.value === value,
    }));
    setUnit(updateUnit);
    dispatch(setWeatherPayload({...weatherPayload, units: value}));
    dispatch(getCurrentWeather());
    closeMenu();
  };
  const temperature = Math.round(data.main?.temp);
  const minTemperature = Math.round(data.main?.temp_min);
  const maxTemperature = Math.round(data.main?.temp_max);
  const condition = data.weather?.main;
  const description = data.weather?.description;
  const icon = `https://openweathermap.org/img/wn/${data.weather?.icon}@2x.png`;
  const units = weatherPayload.units === 'metric' ? '°C' : '°F';
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
        <View>
          <Menu
            visible={visible}
            onDismiss={closeMenu}
            contentStyle={styles.menuContainer}
            anchor={
              <IconButton
                icon="cog-outline"
                size={wp(28)}
                iconColor={colors.primaryBackground}
                onPress={openMenu}
              />
            }>
            {unit.map((item: any, index: any) => (
              <Menu.Item
                titleStyle={[
                  styles.menuItem,
                  {
                    color: item.isSelected ? colors.primaryBackground : 'black',
                    fontFamily: item.isSelected
                      ? fonts.GloryBold
                      : fonts.GloryRegular,
                  },
                ]}
                onPress={() => getUnit(item.value)}
                title={item.label}
                key={index}
              />
            ))}
          </Menu>
        </View>
      </View>
      <View style={styles.weatherInfo}>
        <Image
          source={{uri: icon}}
          style={styles.weatherIcon}
          resizeMode="contain"
        />
        <Text style={styles.temperature}>
          {temperature} {units}
        </Text>
        <Text style={styles.condition}>{condition}</Text>
        <Text style={styles.info}>{description} </Text>
        <Text style={styles.minMax}>
          Max {maxTemperature} {units} | Min {minTemperature} {units}
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
    fontSize: wp(50),
    fontFamily: fonts.GloryBold,
  },
  condition: {
    color: colors.primaryBackground,
    fontSize: wp(22),
    fontFamily: fonts.GloryRegular,
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
  menuContainer: {
    marginTop: wp(40),
    backgroundColor: 'rgba(16, 64, 132, 0.1)',
    shadowColor: 'transparent',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  menuItem: {
    color: colors.primaryBackground,
    fontSize: wp(16),
    fontFamily: fonts.GloryRegular,
  },
});
