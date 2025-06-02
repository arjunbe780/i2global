import {configureStore} from '@reduxjs/toolkit';
import newsReducer from '../slice/NewsSlice';
import weatherReducer from '../slice/WeatherSlice';

const Store = configureStore({
  reducer: {
    news: newsReducer,
    weather: weatherReducer,
  },
});
export default Store;
