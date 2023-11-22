// Import Dependencies
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Line } from 'react-chartjs-2';

// Import Slice Dependencies
import { getWeatherSensor, timeSelector, tempSelector } from '../WeatherInfoSlice';

// Import CSS Module
import './tempInfo.css';

// Build Component
export function TempInfo() {
    const dispatch = useDispatch();

    // Assign Redux State to Variables
    const time = useSelector(timeSelector);
    const temp = useSelector(tempSelector);

    // Dispatch Action to Get Weather Data
    useEffect(() => {
        dispatch(getWeatherSensor());
    }, [dispatch]);

    // Build Chart Data
    const data = {
        labels: time,
        datasets: [
            {
                label: 'Temperature',
                data: temp,
                fill: false,
                backgroundColor: 'rgb(0, 0, 0)',
                borderColor: 'rgba(0, 0, 0, 0.2)',
            },
        ],
    }

    return (
        <div className = 'temp-info'>    
            <h1> Temperature </h1>
            <Line data={data} />
        </div>    
    )
}
