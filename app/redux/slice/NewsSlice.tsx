import {createSlice} from '@reduxjs/toolkit';
import config from '../../config/config';

const NewsSlice = createSlice({
  name: 'news',
  initialState: {
    newsList: [],
    isLoading: '',
    newsForYouList: [],
  },
  reducers: {
    setNewsList: (state, action) => {
      state.newsList = action.payload;
    },
    setNewsForYouList: (state, action) => {
      state.newsForYouList = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload.isLoading || '';
    },
    resetLoading: (state: any) => {
      state.isLoading = '';
    },
  },
});

export const getTodayNews = (payload?: 'general') => {
  return (dispatch: any) => {
    fetch(`${config.NEWS_API_URL}?q=${payload}&apiKey=${config.NEWS_APP_ID}`)
      .then(response => {
        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);
        return response.json();
      })

      .then(data => {
        if (data.status) {
          dispatch(setNewsList(data.articles.slice(0, 50)));
          dispatch(resetLoading());
        } else {
          dispatch(setNewsList([]));
          dispatch(resetLoading());
        }
      })
      .catch(error => console.error('Error fetching hourly weather:', error));
  };
};
export const getNewsForYou = (payload: any) => {
  return (dispatch: any) => {
    fetch(`${config.NEWS_API_URL}?q=${payload}&apiKey=${config.NEWS_APP_ID}`)
      .then(response => {
        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);
        return response.json();
      })

      .then(data => {
        if (data.status) {
          dispatch(setNewsForYouList(data.articles.slice(0, 50)));
          dispatch(resetLoading());
        } else {
          dispatch(setNewsForYouList([]));
          dispatch(resetLoading());
        }
      })
      .catch(error => console.error('Error fetching hourly weather:', error));
  };
};

export const {setNewsList, setIsLoading, resetLoading, setNewsForYouList} =
  NewsSlice.actions;
export default NewsSlice.reducer;
