// Import Dependencies
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Line } from 'react-chartjs-2';

// Import Slice Dependencies
import { getWeatherSensor, humiditySelector, timeSelector } from '../WeatherInfoSlice.js';

// Import CSS Module
import './humInfo.css';

// Build Component
export function HumInfo() {
    const dispatch = useDispatch();

    // Assign Redux State to Variables
    const humidity = useSelector(humiditySelector);
    const time = useSelector(timeSelector);

    useEffect(() => {
        dispatch(getWeatherSensor());
    }, [dispatch]);

    // Build Chart Data
    const data = {
        labels: time,
        datasets: [
            {
                label: 'Humidity',
                data: humidity,
                fill: false,
                backgroundColor: 'rgb(0, 0, 0)',
                borderColor: 'rgba(0, 0, 0, 0.2)',
            },
        ],
    };

    return (
        <div className = 'hum-info'>
            <h1> Humidity </h1>
            <Line data={data} />
        </div>
    )
}
