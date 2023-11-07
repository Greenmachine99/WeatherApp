import { configureStore } from '@reduxjs/toolkit';

// Import Individual Reducers
import mapReducer from '../features/WeatherInfo/MapInfo/mapInfoSlice.js';
import genInfoReducer from '../features/GenInfo/genInfoSlice.js';
import counterReducer from '../features/counter/counterSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    map: mapReducer,
    weather: genInfoReducer
  },
});
