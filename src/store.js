import { configureStore } from '@reduxjs/toolkit';
import giphyReducer from './giphySlice';

export const store = configureStore({
  reducer: {
    giphy: giphyReducer,
  },
});
