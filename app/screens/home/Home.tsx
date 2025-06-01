import Geolocation from '@react-native-community/geolocation';
import { useEffect, useState } from 'react';
import {ActivityIndicator, ScrollView, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { WeatherHeader } from './component/WeatherHeader';
import { CurrentWeatherCard } from './component/CurrentWeatherCard';
import { WeatherForecastCard } from './component/WeatherForecastCard';
function Home() {
  const [currentLocation, setCurrentLocation] = useState<any>(Object());

  const [currentWeatherData, setCurrentWeatherData] = useState<any>(Object());
  const [todayHourlyWeather, setTodayHourlyWeather] = useState<any>([]);
  const [dayForecastWeather, setDayForecastWeather] = useState<any>([]);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // getCurrentPosition();
    getCurrentWeather();
    getTodayHourlyWeather();
    getdayForecastWeather();
  }, []);

  const getCurrentPosition = async () => {
    Geolocation.getCurrentPosition(
      async pos => {
        const coords = {
          longitude: pos.coords.longitude,
          latitude: pos.coords.latitude,
        };

        setCurrentLocation(coords);
        getCurrentWeather(coords);
      },
      () => {
        setIsLoading(false);
        // ToastMessage('error', 'Unable to get current location');
      },
      {enableHighAccuracy: true, maximumAge: 0, timeout: 10000},
    );
  };

  const getCurrentWeather = (position?: any) => {
    const lat = 12.934050429194093;
    const lon = 80.13300469272221;
    const apiKey = 'aa0fafaaa02af20260a20674fdeba801';

    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`,
    )
      .then(response => {
        if (!response.ok) {
          setIsLoading(false);
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setCurrentWeatherData({
          weather: data.weather[0],
          wind: data.wind,
          main: data.main,
          name: data.name,
        });
        setIsLoading(false);
        // console.log('Forecast data:', JSON.stringify(data, null, 2));
      })
      .catch(error => {
        setIsLoading(false);
        console.error('Fetch error:', error);
      });
  };

  const sortByTime = data => {
    return data.sort((a, b) => {
      const [h1, m1] = a.time.split(':').map(Number);
      const [h2, m2] = b.time.split(':').map(Number);
      return h1 * 60 + m1 - (h2 * 60 + m2);
    });
  };
  const getTodayHourlyWeather = () => {
    const lat = 12.934050429194093;
    const lon = 80.13300469272221;
    const apiKey = 'aa0fafaaa02af20260a20674fdeba801';

    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&exclude=hourly,daily&units=metric&appid=${apiKey}`,
    )
      .then(response => {
        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);
        return response.json();
      })
      .then(data => {
        const hourlyWeather = data.list.map((item: any) => ({
          time: item.dt_txt.slice(11, 16),
          temperature: Math.round(item.main.temp),
          icon: `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`,
        }));
        const sortedHourlyWeather = sortByTime(hourlyWeather);
        // console.log('Forecast data:', JSON.stringify(data, null, 2));
        setTodayHourlyWeather(sortedHourlyWeather);
      })
      .catch(error => console.error('Error fetching hourly weather:', error));
  };

  const getDay = (timestamp:any) => {
    const date = new Date(timestamp * 1000);
    const dayName = date.toLocaleDateString('en-US', {weekday: 'long'});
    return dayName;
  };
  const getdayForecastWeather = () => {
    const lat = 12.934050429194093;
    const lon = 80.13300469272221;
    const apiKey = 'aa0fafaaa02af20260a20674fdeba801';

    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&cnt=5&units=metric&appid=${apiKey}`,
    )
      .then(response => {
        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);
        return response.json();
      })
      .then(data => {
        const dayWeather = data.list.map((item: any) => ({
          day: getDay(item.dt),
          temperature: Math.round(item.main.temp),
          icon: `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`,
        }));
        setDayForecastWeather(dayWeather);
      })
      .catch(error => console.error('Error fetching hourly weather:', error));
  };

  if (isLoading) {
    return (
      <LinearGradient
        colors={['#8EBBFF', '#54C1FF']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        style={styles.indicatorContainer}>
        <ActivityIndicator size="large" color="#fff" />
      </LinearGradient>
    );
  }

  return (
    <ScrollView style={{flex: 1}}>
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
  },
});
