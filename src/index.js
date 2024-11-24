        const form = document.getElementById('weather-form');
        const loadingIndicator = document.getElementById('loading');
        const weatherContainer = document.getElementById('weather-container');


        async function fetchWeatherData(location) {
            const apiKey = 'JDZWL2ANLHKLMVEPP724KJ4PQ';
            const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&key=${apiKey}`;;
            const response = await fetch(url);
            const data = await response.json();
            console.log(data);
        }
        
        function processWeatherData(data) {
            return {
                temperature: data.currentConditions.temp,
                condition: data.currentConditions.conditions,
                icon: data.currentConditions.icon,
            };
        }
        


        form.addEventListener('submit', async (event) => {
            event.preventDefault();
            loadingIndicator.style.display = 'block';
            weatherContainer.innerHTML = '';
        
            const location = document.getElementById('location').value;
            const unit = form.unit.value;
        
            try {
                const data = await fetchWeatherData(location);
                const weather = processWeatherData(data);
        
                loadingIndicator.style.display = 'none';
                weatherContainer.innerHTML = `
                    <h2>Weather Data</h2>
                    <p>Temperature: ${weather.temperature}° ${unit === 'metric' ? 'Celsius' : 'Fahrenheit'}</p>
                    <p>Condition: ${weather.condition}</p>
                    <img src="${weather.icon}" alt="Weather Icon">
                `;
            } catch (error) {
                loadingIndicator.style.display = 'none';
                weatherContainer.innerHTML = '<p>Error fetching weather data. Please try again.</p>';
                console.error('Error:', error);
            }
        });
        