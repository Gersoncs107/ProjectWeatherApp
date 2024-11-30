import './styles.css'
// Seleção de elementos do DOM
const form = document.getElementById('weather-form');
const loadingIndicator = document.getElementById('loading');
const weatherContainer = document.getElementById('weather-container');

// Função para buscar os dados da API
async function fetchWeatherData(location, unit) {
    const apiKey = 'JDZWL2ANLHKLMVEPP724KJ4PQ'; // Substitua pela sua chave, se necessário
    const unitGroup = unit === 'metric' ? 'metric' : 'us'; // Adaptação correta para a API
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=${unitGroup}&key=${apiKey}`;
    
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Failed to fetch weather data: ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log(data); // Para verificar os dados retornados pela API
    return data;
}

// Função para processar os dados recebidos
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

// Evento de envio do formulário
form.addEventListener('submit', async (event) => {
    event.preventDefault();
    loadingIndicator.style.display = 'block';
    weatherContainer.innerHTML = ''; // Limpa o contêiner de exibição

    // Captura os valores do formulário
    const location = document.getElementById('location').value.trim();
    const unit = form.unit.value; // "metric" ou "us"

    if (!location) {
        loadingIndicator.style.display = 'none';
        weatherContainer.innerHTML = '<p>Please enter a valid location.</p>';
        return;
    }

    try {
        // Busca e processa os dados do clima
        const data = await fetchWeatherData(location, unit);
        const weather = processWeatherData(data);

        // Exibe os dados na página
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
