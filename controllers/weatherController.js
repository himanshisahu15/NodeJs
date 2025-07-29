
import { getWeatherData } from "../services/weatherService.js";
import logger from "../middleware/logger/logger.js";
import { validateCity } from "../middleware/validations/validator.js";



export const run = async (req,res) => {
 const {cityName}=req.query;
    const { error } = validateCity(cityName);
 
    if (error) {
        logger.error(`Invalid input: ${error.message}`);
        return res.status(400).json({error:error.message});
    }

    try {
        const data = await getWeatherData(cityName);
        if (data && data.main) {
            res.json({
                location: data.name,
                temperature: `${data.main.temp}°C`,
                weather: data.weather[0].main,
                description: data.weather[0].description,
                humidity: `${data.main.humidity}%`,
                windSpeed: `${data.wind.speed} m/s`,
            });
        } else {
            logger.warn(`No weather data found for ${cityName}`);
             res.status(404).json({ message: "No weather data found." });
        }
    } catch (err) {
        logger.error("Failed to fetch weather data.");
          res.status(500).json({ error: "Internal server error" });
    }
};
