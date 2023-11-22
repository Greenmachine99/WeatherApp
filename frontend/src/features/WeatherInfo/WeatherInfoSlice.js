// Import Dependencies
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

// Import Backend API Dependencies
import fetchWeatherInfo from '../../util/sensorAPI';

// Build Initial State
const initialState = {
    // Declare State Variables
    humidity: [],
    temp: [],
    prec: [],
    time: [],
    isLoading: false,
    hasError: false,
}

// Build Async Thunks
export const getWeatherSensor = createAsyncThunk(
    'weatherInfo/fetchWeather',
    async (arg, thunkAPI) => {
        const weather = await fetchWeatherInfo();
    }
)

// Build Slice
export const weatherSensor = createSlice({
    name: 'weatherSensor',
    initialState,
    reducers: {
    },
    extraReducers: {
        [getWeatherSensor.pending]: (state, action) => {
            state.isLoading = true;
            state.hasError = false;
        },
        [getWeatherSensor.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.hasError = false;
            state.humidity = action.payload.data.map((item) => item.humidity);
            state.temp = action.payload.data.map((item) => item.temp);
            state.prec = action.payload.data.map((item) => item.prec);
            state.time = action.payload.data.map((item) => item.time);
        },
        [getWeatherSensor.rejected]: (state, action) => {
            state.isLoading = false;
            state.hasError = true;
        }
    }
})

// Export Slice Selectors
export const humiditySelector = (state) => state.weatherSensor.humidity;
export const tempSelector = (state) => state.weatherSensor.temp;
export const precSelector = (state) => state.weatherSensor.prec;
export const timeSelector = (state) => state.weatherSensor.time;

// Export Slice Reducer
export default weatherSensor.reducer;
