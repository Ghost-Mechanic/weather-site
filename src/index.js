import { getWeatherData, processWeatherDataF, processWeatherDataC } from "./data";
import "./style.css";

// this function logs the weather info to the console after being inputted
function logWeatherInfo(locationObjectData) {
    console.log(`Location: ${locationObjectData.location}`);
    console.log(`Current temperature: ${locationObjectData.currTemp}\u00B0`);
    console.log(`Feels like: ${locationObjectData.currTempFeelsLike}\u00B0`);
    console.log(`Condition: ${locationObjectData.currCondition}`);
    locationObjectData.forecast.forEach((day) => {
        console.log(`Forecast for: ${day.date}`);
        console.log(`Temperature: ${day.temp}\u00B0`);
        console.log(`Condition: ${day.condition}`);
    });
}

// this function will display the weather info on the webpage for
// the given location
function displayWeatherInfo(locationObjectData) {
    const container = document.querySelector(".container");
    
    // clear previous screen
    container.replaceChildren(container.firstElementChild);

    // create div for current weather
    const currWeather = document.createElement("div");
    currWeather.classList.add("current");

    // create new elements for location, current temperature, 
    // current feels like temperature, and current condition
    const location = document.createElement("h1");
    const currTemp = document.createElement("h3");
    const currFeelsLike = document.createElement("h3");
    const currCondition = document.createElement("h3");
    const currConditionIcon = document.createElement("img");
    location.textContent = locationObjectData.location;
    currTemp.textContent = `Current Temperature: ${locationObjectData.currTemp}\u00B0`;
    currFeelsLike.textContent = `Feels Like: ${locationObjectData.currTempFeelsLike}\u00B0`;
    currCondition.textContent = locationObjectData.currCondition;
    currConditionIcon.src = locationObjectData.currConditionIcon;

    currWeather.appendChild(location);
    currWeather.appendChild(currTemp);
    currWeather.appendChild(currFeelsLike);
    currWeather.appendChild(currCondition);
    currWeather.appendChild(currConditionIcon);

    container.appendChild(currWeather);

    // include a title for forecast
    const forecast = document.createElement("h2");
    forecast.classList.add("forecast-title");
    forecast.textContent = 'Forecast';
    container.appendChild(forecast);

    // create div for forecasts
    const forecasts = document.createElement("div");
    forecasts.classList.add("forecasts");

    // create new elements for three forecast days including the date,
    // forecasted temperature, and forecasted conditions
    locationObjectData.forecast.forEach((day) => {
        // create div for forecast
        const currForecast = document.createElement("div");
        currForecast.classList.add("forecast");

        const forecastDay = document.createElement("h2");
        const forecastTemp = document.createElement("h3");
        const forecastCondition = document.createElement("h3");
        const forecastConditionIcon = document.createElement("img");
        forecastDay.textContent = day.date.slice(5);
        forecastTemp.textContent = `Day Average: ${day.temp}\u00B0`;
        forecastCondition.textContent = day.condition;
        forecastConditionIcon.src = day.conditionIcon;

        currForecast.appendChild(forecastDay);
        currForecast.appendChild(forecastTemp);
        currForecast.appendChild(forecastCondition);
        currForecast.appendChild(forecastConditionIcon);

        forecasts.appendChild(currForecast);
    });

    container.appendChild(forecasts);
}

const inputField = document.querySelector("#location");
const fahrenheitBox = document.querySelector("#fahrenheit");
const celsiusBox = document.querySelector("#celsius");
const submitButton = document.querySelector(".submit-button");

// add an event listener to the fahrenheit checkbox to select it when clicked
fahrenheitBox.addEventListener("click", () => {

    // ensure that exactly one box is checked at a time
    if (fahrenheitBox.checked) {
        celsiusBox.checked = false
    }
    else {
        fahrenheitBox.checked = true;
    }
});

// add an event listener to the celsius checkbox to select it when clicked
celsiusBox.addEventListener("click", () => {

    // ensure that exactly one box is checked at a time
    if (celsiusBox.checked) {
        fahrenheitBox.checked = false;
    }
    else {
        celsiusBox.checked = true;
    }
});

// add an event listener to the submit button that logs
// the weather info for the inputted location
submitButton.addEventListener("click", (event) => {
    event.preventDefault();

    getWeatherData(inputField.value).then(weatherData => {
        let processedData;
        console.log(weatherData);

        // process with correct temperature unit
        if (fahrenheitBox.checked) {
            processedData = processWeatherDataF(weatherData);
        }
        else {
            processedData = processWeatherDataC(weatherData);
        }
        logWeatherInfo(processedData);
        displayWeatherInfo(processedData);
    })
    .catch(error => {
        console.log(error);
    });

    inputField.value = "";
});