import {createSlice} from '@reduxjs/toolkit';
import {resetLoading} from './NewsSlice';
import config from '../../config/config';
import {getDay, sortByTime} from '../../config/utility';

const WeatherSlice = createSlice({
  name: 'weather',
  initialState: {
    currentWeatherData: {},
    dayForecastWeather: [],
    todayHourlyWeather: [],
    weatherPayload: {
      latitude: 12.934050429194093,
      longitude: 80.13300469272221,
      units: 'metric',
    },
  },
  reducers: {
    setCurrentWeatherData: (state, action) => {
      state.currentWeatherData = action.payload;
    },
    setDayForecastWeather: (state, action) => {
      state.dayForecastWeather = action.payload;
    },
    setTodayHourlyWeather: (state, action) => {
      state.todayHourlyWeather = action.payload;
    },
    setWeatherPayload: (state, action) => {
      state.weatherPayload = action.payload;
    },
  },
});

export const getCurrentWeather = () => {
  return (dispatch: any, getState: any) => {
    const weatherPayload = getState().weather.weatherPayload;

    fetch(
      `${config.WEATHER_API_URL}?lat=${weatherPayload.latitude}&lon=${weatherPayload.longitude}&appid=${config.WEATHER_APP_ID}&units=${weatherPayload.units}`,
    )
      .then(response => {
        if (!response.ok) {
          dispatch(resetLoading());
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        dispatch(
          setCurrentWeatherData({
            weather: data.weather[0],
            wind: data.wind,
            main: data.main,
            name: data.name,
          }),
        );
        dispatch(getdayForecastWeather());
        dispatch(getTodayHourlyWeather());
        dispatch(resetLoading());
      })
      .catch(error => {
        dispatch(resetLoading());
      });
  };
};

export const getTodayHourlyWeather = () => {
  return (dispatch: any, getState: any) => {
    const weatherPayload = getState().weather.weatherPayload;
    const units = weatherPayload.units === 'metric' ? '°C' : '°F';
    fetch(
      `${config.FORECAST_API_URL}?lat=${weatherPayload.latitude}&lon=${weatherPayload.longitude}&exclude=hourly,daily&units=${weatherPayload.units}&appid=${config.WEATHER_APP_ID}`,
    )
      .then(response => {
        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);
        return response.json();
      })
      .then(data => {
        const hourlyWeather = data.list.map((item: any) => ({
          time: item.dt_txt.slice(11, 16),
          temperature: Math.round(item.main.temp) + ' ' + units,
          icon: `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`,
        }));
        const sortedHourlyWeather = sortByTime(hourlyWeather);
        const uniqueByTime = sortedHourlyWeather.filter(
          (item: any, index: any, self: any) =>
            index === self.findIndex((t: any) => t.time === item.time),
        );
        dispatch(setTodayHourlyWeather(uniqueByTime));
      })
      .catch(error => dispatch(resetLoading()));
  };
};
export const getdayForecastWeather = (payload?: any) => {
  return (dispatch: any, getState: any) => {
    const weatherPayload = getState().weather.weatherPayload;
    const units = weatherPayload.units === 'metric' ? '°C' : '°F';
    fetch(
      `${config.FORECAST_API_URL}?lat=${weatherPayload.latitude}&lon=${weatherPayload.longitude}&cnt=5&units=${weatherPayload.units}&appid=${config.WEATHER_APP_ID}`,
    )
      .then(response => {
        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);
        return response.json();
      })
      .then(data => {
        const dayWeather = data.list?.map((item: any) => ({
          day: getDay(item.dt),
          maxTemp: Math.round(item.main?.temp_max) + ' ',
          minTemp: Math.round(item.main?.temp_min) + ' ' + units,
          icon: `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`,
        }));

        dispatch(setDayForecastWeather(dayWeather));
      })
      .catch(error => dispatch(resetLoading()));
  };
};

export const {
  setCurrentWeatherData,
  setDayForecastWeather,
  setTodayHourlyWeather,
  setWeatherPayload,
} = WeatherSlice.actions;
export default WeatherSlice.reducer;
