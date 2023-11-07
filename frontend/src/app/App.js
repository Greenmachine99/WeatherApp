// Import Dependencies
import React from 'react';
import logo from './logo.svg';

// Import React Components
import { Counter } from '../features/counter/Counter';
import { GenInfo } from '../features/GenInfo/genInfo';
import { WeatherInfo } from '../features/WeatherInfo/weatherInfo';

// Import CSS Module
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Counter />
      </header>
      <WeatherInfo />
    </div>
  );
}

export default App;
