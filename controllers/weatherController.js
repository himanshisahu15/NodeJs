import PromptSync from "prompt-sync";
import { getWeatherData } from "../services/weatherService.js";
import logger from "../middleware/logger/logger.js";
import { validateCity } from "../middleware/validations/validator.js";
import chalk from "chalk";

const prompt = PromptSync();

export const run = async () => {
    const cityName = prompt("Enter city name:");
    const { error } = validateCity(cityName);
 
    if (error) {
        logger.error(`Invalid input: ${error.message}`);
        return;
    }

    try {
        const data = await getWeatherData(cityName);
        if (data && data.main) {
            console.log(chalk.blue(`Weather in ${data.name}`));
            console.log(`Temperature: ${data.main.temp}°C`);
            console.log(`weather: ${data.weather[0].main}`)
            console.log(`Description: ${data.weather[0].description}`);
            console.log(`Humidity: ${data.main.humidity}%`);
            console.log(`Wind:  ${data.wind.speed}`)
        } else {
            logger.warn(`No weather data found for ${cityName}`);
        }
    } catch (err) {
        logger.error("Failed to fetch weather data.");
    }
};
