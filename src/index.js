import './styles.css'
import { fetchWeatherData, fetchGif} from "./apiUtils"
// Seleção de elementos do DOM
const form = document.getElementById('weather-form');
const loadingIndicator = document.getElementById('loading');
const weatherContainer = document.getElementById('weather-container');

// // Função para buscar os dados da API
// async function fetchWeatherData(location, unit) {
//     const apiKey = 'JDZWL2ANLHKLMVEPP724KJ4PQ'; // Substitua pela sua chave, se necessário
//     const unitGroup = unit === 'metric' ? 'metric' : 'us'; // Adaptação correta para a API
//     const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=${unitGroup}&key=${apiKey}`;
    
//     const response = await fetch(url);
//     if (!response.ok) {
//         throw new Error(`Failed to fetch weather data: ${response.statusText}`);
//     }
    
//     const data = await response.json();
//     console.log(data); // Para verificar os dados retornados pela API
//     return data;
// }

// async function fetchGif(condition) {
//     const apiKey = 'sw8RIujQ6WWHFZCMZ5NZ82Kk5vutbEzn'; // Substitua pela sua chave da Giphy API
//     const query = condition.split(' ')[0]; // Usa a primeira palavra da condição como termo de busca
//     const url = `https://cors-anywhere.herokuapp.com/https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${query}&limit=1`;
//     // const url = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${query}&limit=1`;
//     const response = await fetch(url);
//     if (!response.ok) {
//         throw new Error(`Failed to fetch GIF: ${response.statusText}`);
//     }

//     const data = await response.json();
//     return data.data.length > 0 ? data.data[0].images.original.url : '';
// }


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

    function updateTheme(condition) {
        const body = document.body;
    
        // Remove todas as classes de tema existentes
        body.classList.remove('theme-sunny', 'theme-rainy', 'theme-cloudy', 'theme-default');
    
        // Adiciona uma classe baseada na condição
        if (condition.includes('Rain')) {
            body.classList.add('theme-rainy');
        } else if (condition.includes('Cloud')) {
            body.classList.add('theme-cloudy');
        } else if (condition.includes('Clear') || condition.includes('Sunny')) {
            body.classList.add('theme-sunny');
        } else {
            body.classList.add('theme-default');
        }
    }
    

    if (!location) {
        loadingIndicator.style.display = 'none';
        weatherContainer.innerHTML = '<p>Please enter a valid location.</p>';
        return;
    }

    try {
        // Busca e processa os dados do clima
        const data = await fetchWeatherData(location, unit);
        const weather = processWeatherData(data);
        const gifUrl = await fetchGif(weather.condition);

        // Exibe os dados na página
        loadingIndicator.style.display = 'none';
        weatherContainer.innerHTML = `
            <h2>Weather Data</h2>
            <p>Temperature: ${weather.temperature}° ${unit === 'metric' ? 'Celsius' : 'Fahrenheit'}</p>
            <p>Condition: ${weather.condition}</p>
            <img src="${gifUrl}" alt="Weather GIF">
        `;
        updateTheme(weather.condition)

        
    } catch (error) {
        loadingIndicator.style.display = 'none';
        weatherContainer.innerHTML = '<p>Error fetching weather data. Please try again.</p>';
        console.error('Error:', error);
    }

    
});
