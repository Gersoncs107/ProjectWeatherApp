        const form = document.getElementById('weather-form');
        const loadingIndicator = document.getElementById('loading');
        const weatherContainer = document.getElementById('weather-container');


        async function fetchWeatherData(location) {
            const apiKey = 'JDZWL2ANLHKLMVEPP724KJ4PQ';
            const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&key=${apiKey}`;
            
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Failed to fetch weather data: ${response.statusText}`);
            }
            
            const data = await response.json();
            console.log(data);
            return data;
        }
        
        
        function processWeatherData(data) {
            if (!data.currentConditions) {
                throw new Error('Missing currentConditions data');
            }
            return {
                temperature: data.currentConditions.temp || 'N/A',
                condition: data.currentConditions.conditions || 'Unknown',
                icon: data.currentConditions.icon || 'default-icon.png', // Ícone padrão, se necessário
            };
        }
        
        


        form.addEventListener('submit', async (event) => {
            event.preventDefault();
            loadingIndicator.style.display = 'block';
            weatherContainer.innerHTML = '';
        
            const location = document.getElementById('location').value.trim();
            const unit = form.unit.value;
        
            if (!location) {
                loadingIndicator.style.display = 'none';
                weatherContainer.innerHTML = '<p>Please enter a valid location.</p>';
                return;
            }
        
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
                weatherContainer.innerHTML = `<p>Error: ${error.message}</p>`;
                console.error('Error:', error);
            }
        });
        
        
        