import Geolocation from '@react-native-community/geolocation';
import {useEffect} from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {WeatherHeader} from './component/WeatherHeader';
import {CurrentWeatherCard} from './component/CurrentWeatherCard';
import {WeatherForecastCard} from './component/WeatherForecastCard';
import {useDispatch, useSelector} from 'react-redux';
import {
  getCurrentWeather,
  setWeatherPayload,
} from '../../redux/slice/WeatherSlice';
import {setIsLoading} from '../../redux/slice/NewsSlice';
function Home() {
  const dispatch = useDispatch() as any;
  const {currentWeatherData, dayForecastWeather, todayHourlyWeather} =
    useSelector((state: any) => state.weather);
  const {isLoading} = useSelector((state: any) => state.news);

  useEffect(() => {
    dispatch(setIsLoading({isLoading: 'weather'}));
    console.log(isLoading)
    getCurrentPosition();
  }, []);

  const getCurrentPosition = async () => {
    Geolocation.getCurrentPosition(
      async pos => {
        const payload = {
          longitude: pos.coords.longitude,
          latitude: pos.coords.latitude,
          units: 'metric',
        };
        dispatch(setWeatherPayload(payload));
        dispatch(getCurrentWeather());
      },
      () => {
        dispatch(getCurrentWeather());
      },
      {enableHighAccuracy: false, maximumAge: 0, timeout: 10000},
    );
  };

  if (isLoading == 'weather') {
    return (
      <View style={styles.container}>
        <LinearGradient
          colors={['#8EBBFF', '#54C1FF']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          style={styles.indicatorContainer}>
          <ActivityIndicator size="large" color="#fff" />
        </LinearGradient>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <StatusBar barStyle="default" backgroundColor="#8EBBFF" />
      <LinearGradient
        colors={['#8EBBFF', '#54C1FF']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        style={{flex: 1}}>
        <WeatherHeader data={currentWeatherData} />
        <CurrentWeatherCard data={todayHourlyWeather} />
        <WeatherForecastCard data={dayForecastWeather} />
      </LinearGradient>
    </ScrollView>
  );
}

export default Home;

const styles = StyleSheet.create({
  indicatorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#8EBBFF',
  },
  container: {
    flex: 1,
    backgroundColor: '#8EBBFF',
  },
});
