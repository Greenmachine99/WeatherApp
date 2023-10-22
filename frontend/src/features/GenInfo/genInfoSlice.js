// Import Dependencies
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Import Backend API Dependencies
import { fetchWeatherInfo } from '../../util/sensorAPI';

// Declare Initial State
const initialState = {
    // Declare State Variables
    temperature: 0,
    humidity: 0,
    rain: 0,
    status: 'idle',
}

// Build Async Thunks
export const fetchWeatherInfo = createAsyncThunk(
    'genInfo/fetchWeatherInfo',
    async () => {
        // Declare Async Thunk Logic
        const response = await fetchWeatherInfo();
        return response.data;
    }
);

// Build Slice
export const genInfoSlice = createSlice({
    name: 'genInfo',
    initialState,
    reducers: {
        // Declare Reducers

    },
})

// Export Slice Actions

// Export Slice Selectors

// Export Slice Reducer