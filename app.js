const API_KEY = 'b7814b89dc8cacc57ae9da4664b45aee';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

let currentTempF = null;
let isCelsius    = false;

async function getWeather(city) {
  const url = `${BASE_URL}?q=${city}&appid=${API_KEY}&units=imperial`;

  try {
    const res  = await fetch(url);

    if (!res.ok) throw new Error('City not found');

    const data = await res.json();

    displayWeather(data);

  } catch (err) {
    document.getElementById('error-msg').textContent
      = err.message;
  }
}

function displayWeather(data) {

  // clear any previous error
  document.getElementById('error-msg').textContent = '';

  document.getElementById('city-name').textContent
    = data.name;

  document.getElementById('weather-icon').src
    = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

  document.getElementById('temp').textContent
    = `${Math.round(data.main.temp)}°F`;

  document.getElementById('description').textContent
    = data.weather[0].description;

  document.getElementById('humidity').textContent
    = `Humidity: ${data.main.humidity}%`;

  document.getElementById('wind').textContent
    = `Wind: ${Math.round(data.wind.speed)} mph`;

  currentTempF = data.main.temp;
  isCelsius = false;  

}

// Button click
document.getElementById('search-btn')
  .addEventListener("click",() => {
    const city = document
      .getElementById('city-input').value.trim();
    if (city) getWeather(city);
  });

// Enter key
document.getElementById('city-input')
  .addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const city = e.target.value.trim();
      if (city) getWeather(city);
    }
  });

  function toggleUnit() {
  isCelsius = !isCelsius;

  if (isCelsius) {
    const c = (currentTempF - 32) * 5/9;
    document.getElementById('temp').textContent
      = `${Math.round(c)}°C`;
    document.getElementById('unit-toggle').textContent
      = 'Switch to °F';
  } else {
    document.getElementById('temp').textContent
      = `${Math.round(currentTempF)}°F`;
    document.getElementById('unit-toggle').textContent
      = 'Switch to °C';
  }
}

// event listener for the toggle button
document.getElementById('unit-toggle')
  .addEventListener('click', toggleUnit);