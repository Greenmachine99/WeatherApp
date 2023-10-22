// Import Dependencies
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

// Import Backend API Dependencies

// Build Initial State
const initialState = {
    // Declare State Variables
    humidity: 0,
    status: 'idle',
}

// Build Async Thunks

// Build Slice
export const humInfoSlice = createSlice({
    name: 'humInfo',
    initialState,
    reducers: {
        // Declare Reducers

    },
})

// Export Slice Actions

// Export Slice Selectors

// Export Slice Reducer
