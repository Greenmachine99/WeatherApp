const fetchWeatherInfo = async () => {
    const response = fetch('http://127.0.0.1:5000/weather', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const data = await response.json();
    return data;
};

export default fetchWeatherInfo;