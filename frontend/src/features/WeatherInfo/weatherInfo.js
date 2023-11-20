// Import Dependencies
import React from 'react';

// Import React Components
import { TempInfo } from './TempInfo/tempInfo.js';
import { HumInfo } from './HumInfo/humInfo.js';
import { RainInfo } from './RainInfo/rainInfo.js';
import { MapInfo } from './MapInfo/mapInfo.js';
import { SaveLocation } from './SaveLocation/saveLocation.js';

// Import Slice Dependencies

// Import CSS Module
import './weatherInfo.css';

// Build Component
export function WeatherInfo() {
    return (
        <div className = 'weather-window'>
            <div className = 'header'>
                <h1> Weather Information </h1>
                <SaveLocation />
            </div>
            <div className = 'weather-info'>
                <div className = 'big-container'>
                    <MapInfo />
                </div>
                <div className = 'small-containers'>
                        <TempInfo />
                        <RainInfo />
                        <HumInfo />
                </div>
            </div>
        </div>
    )
}
