// Import React & Redux Dependencies
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// Import Functions & States
import { saveLocation } from '../../../util/geolocation';
import { startPositionSelector } from '../MapInfo/mapInfoSlice';
// Import CSS Module
import './saveLocation.css';

// Create Component
export function SaveLocation() {
    // Assign Redux State to Variables
    const startPosition = useSelector(startPositionSelector);
    // Assign Variables to State
    const lat = startPosition[0];
    const lon = startPosition[1];

    // Use useState to manage the location state
    const [location, setLocation] = useState('');

    // Handle Submit
    const handleSubmit = (e) => {
        e.preventDefault();

        saveLocation(location, lat, lon);
        setLocation('');
    }

    return (
        <div className = 'save-location-container'>
            <form className = 'search-form' onSubmit={handleSubmit}>
                <input 
                    type = 'text' 
                    placeholder = {location}
                    value = {location} 
                    className = 'name-input' 
                    onChange={(e) => {
                        // Update the location state using setLocation
                        setLocation(e.target.value);
                    }}
                />
                <input 
                    type = 'submit' 
                    value = 'Save Location' 
                    className = 'save-button' />
            </form>
        </div>
    )
} 
