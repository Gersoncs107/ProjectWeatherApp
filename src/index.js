        const form = document.getElementById('weather-form');
        const loadingIndicator = document.getElementById('loading');
        const weatherContainer = document.getElementById('weather-container');


        async function fetchWeatherData(location) {
            const apiKey = 'SUA_API_KEY';
            const url = `https://api.visualcrossing.com/forecast?location=${location}&unitGroup=metric&key=${apiKey}`;
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
        


        form.addEventListener('submit', (event) => {
            event.preventDefault();
            loadingIndicator.style.display = 'block';
            weatherContainer.innerHTML = '';

            const location = document.getElementById('location').value;
            const unit = form.unit.value;

            // Simulação para testes iniciais
            setTimeout(() => {
                loadingIndicator.style.display = 'none';
                weatherContainer.innerHTML = `<h2>Example Weather Data</h2>
                                              <p>Location: ${location}</p>
                                              <p>Unit: ${unit === 'metric' ? 'Celsius' : 'Fahrenheit'}</p>`;
            }, 2000);
        });