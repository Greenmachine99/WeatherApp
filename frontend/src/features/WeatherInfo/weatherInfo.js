// Import Dependencies
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// Import React Components
import { TempInfo } from './TempInfo/tempInfo.js';
import { HumInfo } from './HumInfo/humInfo.js';
import { RainInfo } from './RainInfo/rainInfo.js';
import { MapInfo } from './MapInfo/mapInfo.js';

// Import Slice Dependencies

// Import CSS Module
import './weatherInfo.css';

// Build Component
function WeatherInfo() {
    return (
        <div className = 'weather-window'>
            <h1> Weather Information </h1>
            <div className = 'weather-info'>
                <div className = 'big'>
                    <MapInfo />
                </div>
                <div className = 'small containers'>
                    <div className = 'small'>
                        <TempInfo />
                        <RainInfo />
                        <HumInfo />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WeatherInfo;