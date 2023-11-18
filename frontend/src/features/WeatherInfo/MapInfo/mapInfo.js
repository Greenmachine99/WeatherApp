// Import React & Redux Dependencies
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// Import Leaflet Dependencies
import { MapContainer, TileLayer, Marker, Popup} from "react-leaflet";
import { Icon } from "leaflet";
import 'leaflet/dist/leaflet.css';

// Import Slice Dependencies
import { getUserPosition, startPositionSelector, getStoredLocations, storedLocationsSelector} from "./mapInfoSlice";

// Import CSS Module
import './mapInfo.css';

// Build Component
export function MapInfo() {
const dispatch = useDispatch();

// Assign Redux State to Variables
const startPosition = useSelector(startPositionSelector);
const storedLocations = useSelector(storedLocationsSelector);
const hasError = useSelector((state) => state.map.hasError);
const isLoading = useSelector((state) => state.map.isLoading);

// Set Icon for Marker
const positionIcon = new Icon({
    iconUrl: "https://img.icons8.com/emoji/48/000000/round-pushpin-emoji.png",
    iconSize: [40, 40]
})

console.log(storedLocations);

// Load Current Location
useEffect(() => {
    dispatch(getUserPosition());
    dispatch(getStoredLocations());
},
[dispatch])

    return (
        <div className="map-container">
        {isLoading ? (
            <p> Loading current location... </p>
        ) : (!hasError ? (
        <MapContainer center={startPosition} zoom={13} >
            <TileLayer 
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={startPosition} icon={positionIcon}>
                <Popup>
                    You are here!
                </Popup>
            </Marker>
            {storedLocations.map((location) => (
                <Marker position = {[location.lat, location.lon]} icon = {positionIcon}>
                    <Popup>
                        {location.name}
                    </Popup>
                </Marker>
            )
            )}               
        </MapContainer>
        ) :
        <p> Cannot load current location </p>
        )}
    </div>
    
    )
}