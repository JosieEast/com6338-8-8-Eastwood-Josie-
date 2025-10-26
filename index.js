// index.js

// Base API setup
const API_URL = "https://api.openweathermap.org/data/2.5/weather";
const API_KEY = "803e578d00ba72d669556cca3f00e79f"; // API key

// Get elements from the page
const form = document.querySelector("form");
const input = document.getElementById("weather-search");
const weatherSection = document.getElementById("weather");

// Convert UNIX time to readable format
function formatTime(unix) {
  const date = new Date(unix * 1000);
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
}

// Show error message when location not found
function showNotFound() {
  weatherSection.innerHTML = "<h2>Location not found</h2>";
}

// Show weather data when found
function showWeather(data) {
  const city = data.name;
  const country = data.sys.country;
  const lat = data.coord.lat;
  const lon = data.coord.lon;
  const desc = data.weather[0].description;
  const icon = data.weather[0].icon;
  const temp = data.main.temp;
  const feels = data.main.feels_like;
  const time = formatTime(data.dt);

  const mapLink = `https://www.google.com/maps/search/?api=1&query=${lat},${lon}`;
  const iconURL = `https://openweathermap.org/img/wn/${icon}@2x.png`;

  weatherSection.innerHTML = `
    <h2>${city}, ${country}</h2>
    <a href="${mapLink}" target="__BLANK">Click to view map</a>
    <img src="${iconURL}">
    <p style="text-transform: capitalize;">${desc}</p><br>
    <p>Current: ${temp}° F</p>
    <p>Feels like: ${feels}° F</p><br>
    <p>Last updated: ${time}</p>
  `;
}

// Handle form submit
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const query = input.value.trim();

  // Clear old results
  input.value = "";
  weatherSection.innerHTML = "";

  if (!query) return;

  const url = `${API_URL}?q=${query}&units=imperial&appid=${API_KEY}`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      if (data.cod == 200) {
        showWeather(data);
      } else {
        showNotFound();
      }
    })
    .catch(() => showNotFound());
});
