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
    // const rainType = typeof precipitation;
    const windSpeed = useSelector(windSpeedSelector);
    const cloudiness = useSelector(cloudinessSelector);

    const [lat, lon] = useSelector(startPositionSelector);

    // Load Weather Data
    useEffect(() => {
        dispatch(loadWeather({lat ,lon}));
      }, [dispatch, lat, lon]);

    return (
        <div className = 'weather-header'>
            <h1> Current Weather Info </h1>
            <div className = 'info'> 
                <h1> Temperature </h1>
                <h2> {temperature}°C  </h2>
            </div>
            <div className = 'info'> 
                <h1> Windspeed </h1>
                <h2> {windSpeed} m/s </h2>
            </div>
            <div className = 'info'> 
                <h1> Cloudiness </h1>
                <h2> {cloudiness}% </h2>
            </div>
            <div className = 'info'> 
                <h1> Feels Like </h1>
                <h2> {temperatureFeelsLike}°C  </h2>
            </div>
            <div className = 'info'>
                <h1> Precipitation</h1>
                {typeof precipitation == Number ? (<h2> mm </h2>) : (<h2> {precipitation} </h2>)}
            </div>
        </div> 
    )
}
