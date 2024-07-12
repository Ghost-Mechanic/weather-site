
// this function returns the weather data of a certain location
async function getWeatherData(location) {
    try {
        const apiKey = process.env.API_KEY;
        const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=3`, {
            mode: 'cors'
        });
        const weatherData = await response.json();

        return weatherData;
    } catch (error) {
        console.log(error);
    }
}

// this function processes the weather data to return an object
// with only the required data in fahrenheit
function processWeatherDataF(weatherData) {
    if (!weatherData) {
        return null;
    }

    // create new properties with data from API
    const location = weatherData.location.name;
    const currTemp = weatherData.current.temp_f;
    const currTempFeelsLike = weatherData.current.feelslike_f;
    const currCondition = weatherData.current.condition.text;
    const currConditionIcon = weatherData.current.condition.icon;
    const forecast = weatherData.forecast.forecastday.map((day) => ({
        date: day.date,
        temp: day.day.avgtemp_f,
        condition: day.day.condition.text,
        conditionIcon: day.day.condition.icon
    }));

    // return object with properties for needed data
    return {
        location,
        currTemp,
        currTempFeelsLike,
        currCondition,
        currConditionIcon,
        forecast
    };
}

// this function processes the weather data to return an object
// with only the required data in fahrenheit
function processWeatherDataC(weatherData) {
    if (!weatherData) {
        return null;
    }

    // create new properties with data from API
    const location = weatherData.location.name;
    const currTemp = weatherData.current.temp_c;
    const currTempFeelsLike = weatherData.current.feelslike_c;
    const currCondition = weatherData.current.condition.text;
    const currConditionIcon = weatherData.current.condition.icon;
    console.log(weatherData.current.condition.icon);
    const forecast = weatherData.forecast.forecastday.map((day) => ({
        date: day.date,
        temp: day.day.avgtemp_c,
        condition: day.day.condition.text,
        conditionIcon: day.day.condition.icon
    }));

    // return object with properties for needed data
    return {
        location,
        currTemp,
        currTempFeelsLike,
        currCondition,
        currConditionIcon,
        forecast
    };
}

export { getWeatherData, processWeatherDataF, processWeatherDataC };