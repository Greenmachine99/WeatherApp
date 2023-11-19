// Import Dependencies
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

// Import Backend API Dependencies
import { loadUserPosition, loadSavedLocations } from '../../../util/geolocation';

// Build Initial State
const initialState = {
    startPosition: [52.377, 4.896],
    storedLocations: [],
    isLoading: false,
    hasError: false,
    isLoadingLocations: false,
    hasErrorLocations: false
}

// Build Async Thunks
export const getUserPosition = createAsyncThunk(
    'map/getUserPosition',
    async (arg, thunkAPI) => {
      const position = await loadUserPosition();
      return position;
    }
  );

  export const getStoredLocations = createAsyncThunk(
    'map/loadSavedLocations',
    async (arg, thunkAPI) => {
        const locations = await loadSavedLocations();
        return locations;
    }
  )
  
// Build Slice
const options = {
    name: 'map',
    initialState,
    reducers: {
    },
    extraReducers: {
        [getUserPosition.pending]: (state, action) => {
            state.isLoading = true;
            state.hasError = false;
        },
        [getUserPosition.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.hasError = false;
            state.startPosition = action.payload;
        },
        [getUserPosition.rejected]: (state, action) => {
            state.isLoading = false;
            state.hasError = true;
        },
        [getStoredLocations.pending]: (state, action) => {
            state.isLoadingLocations = true;
            state.hasErrorLocations = false;
        },
        [getStoredLocations.fulfilled]: (state, action) => {
            state.isLoadingLocations = false;
            state.storedLocations = action.payload.data;
        },
        [getStoredLocations.rejected]: (state, action) => {
            state.isLoadingLocations = false;
            state.hasErrorLocations = true;
        }
    }
}

// Create Slice
const MapInfoSlice = createSlice(options);

// Export Selectors
export const startPositionSelector = (state) => state.map.startPosition;
export const nameLocationSelector = (state) => state.map.nameLocation;
export const storedLocationsSelector = (state) => state.map.storedLocations;

// Export Reducer
export default MapInfoSlice.reducer;
