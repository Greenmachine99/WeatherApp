import { configureStore } from '@reduxjs/toolkit';

// Import Individual Reducers
import mapReducer from '../features/WeatherInfo/MapInfo/mapInfoSlice.js';
import genInfoReducer from '../features/GenInfo/genInfoSlice.js';

export const store = configureStore({
  reducer: {
    map: mapReducer,
    weather: genInfoReducer
  },
});
