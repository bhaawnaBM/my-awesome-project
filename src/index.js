//Challenge - Display current day and time

function todayDay() {
  let date = new Date();
  let weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let today = weekDays[date.getDay()];
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let currentDay = document.querySelector("#date");
  currentDay.innerHTML = `${today} ${hours}:${minutes}`;
}
let todaysDay = todayDay();

//Function to display weekly forecast

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row images">`;
  let days = ["Thu", "Fri", "Sat", "Sun", "Mon", "Tue"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      ` 
  <div class="col-2">
      <div class="weather-forecast-date">${day}</div>
        <img
          src="https://s3.amazonaws.com/shecodesio-production/uploads/files/000/054/840/original/rainy.png?1668991313"
          width="50"
        />
      <div class="weather-forecast-temp">
          <span class="weather-forecast-max">18°</span>
          <span class="weather-forecast-min">12°</span>
      </div>
    </div>
 `;
  });
  forecastHTML = forecastHTML + ` </div>`;
  forecastElement.innerHTML = forecastHTML;
}

//Challenge 2 - Search for a city and display the city name
//Challenge 4- when a user searches for a city (example: New York), it should display the name of the city on the result page and the current temperature of the city.

function search(city) {
  let apiKey = "8402ccd9e55983fce71eeeaa1d2bd1fc";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiURL).then(cityTemp);
}

function handleSubmit(event) {
  event.preventDefault();
  let citySearch = document.querySelector("#cityInput");
  search(citySearch.value);
}
let searchCity = document.querySelector("#search-form");
searchCity.addEventListener("submit", handleSubmit);

//Challenge 3 - Convert the Celsius to Farenhit and visa versa
function displayFahrenheitTemp(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#temp");

  unitCClick.classList.remove("active");
  unitFClick.classList.add("active");
  let farenhite = Math.round(celciusTemp * 1.8 + 32);
  tempElement.innerHTML = Math.round(farenhite);
}

let unitFClick = document.querySelector("#fahrenheit");
unitFClick.addEventListener("click", displayFahrenheitTemp);

function displayCelciusTempts(event) {
  event.preventDefault();
  unitCClick.classList.add("active");
  unitFClick.classList.remove("active");
  let tempElement = document.querySelector("#temp");
  tempElement.innerHTML = Math.round(celciusTemp);
}
let celcius = null;

let unitCClick = document.querySelector("#celsius");
unitCClick.addEventListener("click", displayCelciusTempts);

//Add a Current Location button. When clicking on it, it uses the Geolocation API to get your GPS coordinates and display and the city and current temperature using the OpenWeather API.
function currentTemp(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(currentCityPosition);
}

let current = document.querySelector(".currentTemp");
current.addEventListener("click", currentTemp);

function currentCityPosition(position) {
  let lat = position.coords.latitude;
  let longi = position.coords.longitude;
  let apiKey = "8402ccd9e55983fce71eeeaa1d2bd1fc";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${longi}&limit=5&units=metric&appid=${apiKey}`;
  axios.get(apiURL).then(cityTemp);
}

function cityTemp(response) {
  console.log(response);

  let currentTemp = document.querySelector("#temp");
  celciusTemp = response.data.main.temp;
  currentTemp.innerHTML = Math.round(celciusTemp);

  let feelsLike = Math.round(response.data.main.feels_like);
  let maxTemp = Math.round(response.data.main.temp_max);
  let minTemp = Math.round(response.data.main.temp_min);
  let maxMinTemp = document.querySelector("#maxmintemp");
  maxMinTemp.innerHTML = `${maxTemp}° / ${minTemp}° Feels like ${feelsLike}`;

  let city = document.querySelector("#city");
  city.innerHTML = `${response.data.name}`;
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.weather[0].description;

  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.main.humidity;
  let windSpeedElement = document.querySelector("#windSpeed");
  windSpeedElement.innerHTML = Math.round(response.data.wind.speed);

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

search("Tarneit");
displayForecast();
