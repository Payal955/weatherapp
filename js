document.addEventListener('DOMContentLoaded', function() {
    const weatherForm = document.getElementById('weather-form');
    const cityInput = document.getElementById('city-input');
    const weatherInfo = document.getElementById('weather-info');

    const apiKey = 'YOUR_API_KEY'; // Replace with your API key
    const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

    weatherForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const city = cityInput.value.trim();
        if (city) {
            getWeather(city);
        }
    });

    async function getWeather(city) {
        try {
            const response = await fetch(`${apiUrl}?q=${city}&appid=${apiKey}&units=metric`);
            if (!response.ok) {
                throw new Error('Weather data not available');
            }
            const weatherData = await response.json();
            displayWeather(weatherData);
        } catch (error) {
            console.error('Error fetching weather data:', error);
            weatherInfo.innerHTML = '<p>Weather data not available</p>';
        }
    }

    function displayWeather(data) {
        const { name, main, weather } = data;
        const temperature = main.temp;
        const description = weather[0].description;

        weatherInfo.innerHTML = `
            <h2>${name}</h2>
            <p>Temperature: ${temperature} &deg;C</p>
            <p>Description: ${description}</p>
        `;
    }
});
