// Import OpenWeather API Key
import { OpenWeatherKey } from './APIkeys.js';

// Set API URL
const openWeatherMapURL = 'https://api.openweathermap.org/data/2.5/weather?';

// Set API Call Conditions
const units = 'metric';

// Load Weather Data
export const fetchWeather = async (lat, lon) => {
    const openWeatherCall = `${openWeatherMapURL}lat=${lat}&lon=${lon}&appid=${OpenWeatherKey}&units=${units}`;

    const response = await fetch(openWeatherCall);
    console.log(response);
    const data = await response.json();
    return data;
}