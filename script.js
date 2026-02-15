async function getWeather() {
    const city = document.getElementById("cityInput").value.trim();
    const apiKey = "1c3fcce6aa9bef56eae0f6dd6a471bb9";

    if (!city) return alert("Enter city name");

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod !== 200) {
            alert(data.message);
            return;
        }

        document.getElementById("cityName").innerText = data.name;
        document.getElementById("temperature").innerText = `Temperature:🌡 ${data.main.temp} °C`;
        document.getElementById("description").innerText = `Climate: ☁ ${data.weather[0].main}`;
        document.getElementById("humidity").innerText = `Humidity:💧 ${data.main.humidity}%`;
        document.getElementById("wind").innerText = `Wind Speed:💨 ${data.wind.speed} m/s`;

        applyWeatherEffect(data.weather[0].main);

    } catch (error) {
        alert("Error fetching weather");
    }
}

function applyWeatherEffect(type) {
    const effects = document.getElementById("weatherEffects");
    effects.innerHTML = "";
    document.body.classList.remove("flash");

    if (type === "Rain") {
        for (let i = 0; i < 100; i++) {
            const drop = document.createElement("div");
            drop.classList.add("rain-drop");
            drop.style.left = Math.random() * window.innerWidth + "px";
            drop.style.animationDuration = (0.5 + Math.random()) + "s";
            effects.appendChild(drop);
        }
        document.body.style.background = "linear-gradient(to right, #4e54c8, #8f94fb)";
    }

    else if (type === "Snow") {
        for (let i = 0; i < 60; i++) {
            const snow = document.createElement("div");
            snow.classList.add("snowflake");
            snow.innerHTML = "❄";
            snow.style.left = Math.random() * window.innerWidth + "px";
            snow.style.animationDuration = (3 + Math.random() * 2) + "s";
            effects.appendChild(snow);
        }
        document.body.style.background = "linear-gradient(to right, #83a4d4, #b6fbff)";
    }

    else if (type === "Clear") {
        const sun = document.createElement("div");
        sun.classList.add("sun");
        effects.appendChild(sun);
        document.body.style.background = "linear-gradient(to right, #fceabb, #f8b500)";
    }

    else if (type === "Thunderstorm") {
        document.body.style.background = "#2c3e50";
        setInterval(() => {
            document.body.classList.add("flash");
            setTimeout(() => document.body.classList.remove("flash"), 100);
        }, 3000);
    }

    else {
        document.body.style.background = "linear-gradient(to right, #4facfe, #00f2fe)";
    }
}



