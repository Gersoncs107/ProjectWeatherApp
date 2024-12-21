// Função para buscar os dados da API
export async function fetchWeatherData(location, unit) {
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

export async function fetchGif(condition) {
    const apiKey = 'sw8RIujQ6WWHFZCMZ5NZ82Kk5vutbEzn'; // Substitua pela sua chave da Giphy API
    const query = condition.split(' ')[0]; // Usa a primeira palavra da condição como termo de busca
    const url = `https://cors-anywhere.herokuapp.com/https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${query}&limit=1`;
    // const url = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${query}&limit=1`;
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Failed to fetch GIF: ${response.statusText}`);
    }

    const data = await response.json();
    return data.data.length > 0 ? data.data[0].images.original.url : '';
}
