import { getWeatherData, processWeatherDataF, processWeatherDataC } from "./data";

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

        // process with correct temperature unit
        if (fahrenheitBox.checked) {
            processedData = processWeatherDataF(weatherData);
        }
        else {
            processedData = processWeatherDataC(weatherData);
        }
        logWeatherInfo(processedData);
    })
    .catch(error => {
        console.log(error);
    });

    inputField.value = "";
});