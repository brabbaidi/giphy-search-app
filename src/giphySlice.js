import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_KEY = import.meta.env.VITE_GIPHY_API_KEY;

export const fetchGifs = createAsyncThunk('giphy/fetchGifs', async (searchTerm) => {
  const response = await axios.get(`https://api.giphy.com/v1/gifs/search`, {
    params: {
      api_key: API_KEY,
      q: searchTerm,
      limit: 10,
    },
  });
  return response.data.data;
});

const giphySlice = createSlice({
  name: 'giphy',
  initialState: {
    gifs: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGifs.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchGifs.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.gifs = action.payload;
      })
      .addCase(fetchGifs.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default giphySlice.reducer;
