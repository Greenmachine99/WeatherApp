// Import Dependencies
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Line } from 'react-chartjs-2';

// Import Slice Dependencies
import { getWeatherSensor, timeSelector, precSelector } from '../WeatherInfoSlice.js';

// Import CSS Module
import './rainInfo.css';

// Build Component
export function RainInfo() {
    const dispatch = dispatch();

    // Assign Redux State to Variables
    const time = useSelector(timeSelector);
    const precip = useSelector(precSelector);

    // Dispatch Action to Get Weather Data
    useEffect(() => {
        dispatch(getWeatherSensor());
    }, [dispatch]);

    // Build Chart Data
    const data = {
        labels: time,
        datasets: [
            {
                label: 'Precipitation',
                data: precip,
                fill: false,
                backgroundColor: 'rgb(0, 0, 0)',
                borderColor: 'rgba(0, 0, 0, 0.2)',
            },
        ],
    }

    return (
        <div className = 'rain-info'>
            <h1> Precipitation </h1>
            <Line data={data} />
        </div>
    )
}
