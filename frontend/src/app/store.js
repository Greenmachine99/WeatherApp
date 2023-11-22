import { configureStore } from '@reduxjs/toolkit';

// Import Individual Reducers
import mapReducer from '../features/WeatherInfo/MapInfo/mapInfoSlice.js';
import genInfoReducer from '../features/GenInfo/genInfoSlice.js';
import humInfoReducer from '../features/WeatherInfo/WeatherInfoSlice.js';

export const store = configureStore({
  reducer: {
    map: mapReducer,
    weatherLive: genInfoReducer,
    weatherSensor: humInfoReducer,
  },
});
