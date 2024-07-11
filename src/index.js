import { getWeatherData, processWeatherDataF } from "./data";

// this function logs the weather info to the console after being inputted
function logWeatherInfo(locationObjectData) {
    console.log(`Location: ${locationObjectData.location}`);
    console.log(`Current temperature: ${locationObjectData.currTemp}`);
    console.log(`Feels like: ${locationObjectData.currTempFeelsLike}`);
    console.log(`Condition: ${locationObjectData.currCondition}`);
    locationObjectData.forecast.forEach((day) => {
        console.log(`Forecast for: ${day.date}`);
        console.log(`Temperature: ${day.temp}`);
        console.log(`Condition: ${day.condition}`);
    });
}

const submitButton = document.querySelector(".submit-button");
const inputField = document.querySelector(".location");

// add an event listener to the submit button that logs
// the weather info for the inputted location
submitButton.addEventListener("click", (event) => {
    event.preventDefault();

    getWeatherData(inputField.value).then(weatherData => {
        const processedData = processWeatherDataF(weatherData);
        logWeatherInfo(processedData);
    })
    .catch(error => {
        console.log(error);
    });

    inputField.value = "";
});