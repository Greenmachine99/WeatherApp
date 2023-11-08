// Import Dependencies
import React from 'react';
import logo from './logo.svg';

// Import React Components
import { GenInfo } from '../features/GenInfo/genInfo';
import { WeatherInfo } from '../features/WeatherInfo/weatherInfo';

// Import CSS Module
import './App.css';

function App() {
  return (
    <div className="App">
      <GenInfo />
      <WeatherInfo />
    </div>
  );
}

export default App;
