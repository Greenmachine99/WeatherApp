// Import Necessary Dependencies
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// Import CSS Module
import './genInfo.css';

// Import Slice Dependencies
import { loadWeather, tempFeelslikeSelector, tempSelector, windSpeedSelector, cloudinessSelector, rainSelector, isLoadingSelector, hasErrorSelector } from './genInfoSlice';
import { startPositionSelector } from '../WeatherInfo/MapInfo/mapInfoSlice';

// Build Component
export function GenInfo() {
    const dispatch = useDispatch();

    // Declare State Variables
    const isLoading = useSelector(isLoadingSelector);
    const hasError = useSelector(hasErrorSelector);

    const temperature = useSelector(tempSelector);
    const temperatureFeelsLike = useSelector(tempFeelslikeSelector);
    const precipitation = useSelector(rainSelector);
    const windSpeed = useSelector(windSpeedSelector);

    const [lat, lon] = useSelector(startPositionSelector);

    // Load Weather Data
    useEffect(() => {
        dispatch(loadWeather({lat ,lon}));
      }, [dispatch, lat, lon]);

    return (
        <div className = 'weather-header'>
            <h1> Current Weather Info </h1>
            <h1> {temperature}°C  </h1>
            <h1> {temperatureFeelsLike}°C </h1>
            <h1> {precipitation}mm </h1>
        </div> 
    )
}
