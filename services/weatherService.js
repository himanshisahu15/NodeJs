import { API_KEY, BASE_URL } from '../config.js';
import logger from "../middleware/logger/logger.js";


export const getWeatherData = async (city) => {
    try {
        const url = `${BASE_URL}?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;
        logger.info(`Fetching weather data for: ${city}`)
        const response = await fetch(url);
        const weatherData = await response.json();
        return weatherData;
    } catch (error) {
        logger.error(`Error fetching weather data: ${error.message}`);
        throw error;
    }
}