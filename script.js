const apiKey = "1c3fcce6aa9bef56eae0f6dd6a471bb9";

const searchBtn = document.getElementById("searchBtn");
const locationBtn = document.getElementById("locationBtn");
const darkToggle = document.getElementById("darkToggle");

const weatherCard = document.getElementById("weatherCard");
const forecastContainer = document.getElementById("forecast");
const errorText = document.getElementById("error");
const rainContainer = document.getElementById("rain");

searchBtn.addEventListener("click", () => {
  const city = document.getElementById("cityInput").value;
  if (city) getWeather(city);
});

locationBtn.addEventListener("click", () => {
  navigator.geolocation.getCurrentPosition(position => {
    getWeatherByCoords(position.coords.latitude, position.coords.longitude);
  });
});

darkToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

async function getWeather(city) {
  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`
    );

    if (!res.ok) throw new Error("City not found");

    const data = await res.json();
    displayWeather(data);
  } catch (err) {
    errorText.innerText = err.message;
  }
}

async function getWeatherByCoords(lat, lon) {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
  );
  const data = await res.json();
  displayWeather(data);
}

function displayWeather(data) {
  errorText.innerText = "";

  const current = data.list[0];

  weatherCard.innerHTML = `
    <h3>${data.city.name}</h3>
    <img src="https://openweathermap.org/img/wn/${current.weather[0].icon}@2x.png">
    <div class="temp">${Math.round(current.main.temp)}°C</div>
    <p>${current.weather[0].description}</p>
  `;

  createForecast(data);
  handleRain(current.weather[0].main);
}

function createForecast(data) {
  forecastContainer.innerHTML = "";

  const dailyData = data.list.filter(item => item.dt_txt.includes("12:00:00"));

  dailyData.slice(0,5).forEach(day => {
    const div = document.createElement("div");
    div.innerHTML = `
      <p>${new Date(day.dt_txt).toLocaleDateString()}</p>
      <img src="https://openweathermap.org/img/wn/${day.weather[0].icon}.png">
      <p>${Math.round(day.main.temp)}°C</p>
    `;
    forecastContainer.appendChild(div);
  });
}

function handleRain(condition) {
  rainContainer.innerHTML = "";

  if (condition.includes("Rain")) {
    for (let i = 0; i < 100; i++) {
      const drop = document.createElement("div");
      drop.classList.add("drop");
      drop.style.left = Math.random() * 100 + "vw";
      drop.style.animationDuration = Math.random() * 1 + 0.5 + "s";
      rainContainer.appendChild(drop);
    }
  }
}





