// Import Necessary Dependencies
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// Import CSS Module
import './genInfo.css';

// Import Slice Dependencies

// Build Component
export function GenInfo() {

    // Declare State Variables
    const temperature = 20;
    const humidity = 90;
    const precipitation = 10;

    return (
        <div className = 'weather-header'>
            <h1> Weather App </h1>
            <h1> {temperature}°C  </h1>
            <h1> {humidity}% </h1>
            <h1> {precipitation}mm </h1>
        </div> 
    )
}
