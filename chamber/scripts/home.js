const lat = "-7.1637800";
const lon = "-78.5002700";
const apiKey = "534bbc5a9632a7a8058dee220e05b0fa";

const units = "metric";

const currentURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;

const currentTempEl = document.querySelector("#current-temp");
const weatherIconEl = document.querySelector("#weather-icon");
const weatherDescEl = document.querySelector("#weather-desc");
const forecastContainerEl = document.querySelector("#forecast");

async function fetchWeather() {
    try {
        const [currentResponse, forecastResponse] = await Promise.all([
            fetch(currentURL),
            fetch(forecastURL)
        ]);

        if (currentResponse.ok && forecastResponse.ok) {
            const currentData = await currentResponse.json();
            const forecastData = await forecastResponse.json();

            displayCurrentWeather(currentData);
            displayForecast(forecastData);

        } else {
            throw Error('Error trying to connect with the API of OpenWeatherMap');
        }
    } catch (error) {
        console.error("Error with fetchWeather:", error);
        weatherDescEl.textContent = "Error while loading the weather.";
    }
}

function displayCurrentWeather(data) {
    const temp = Math.round(data.main.temp);
    currentTempEl.textContent = temp;

    const iconCode = data.weather[0].icon;
    const iconSrc = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    weatherIconEl.setAttribute("src", iconSrc);

    const desc = data.weather[0].description;
    weatherDescEl.textContent = desc.charAt(0).toUpperCase() + desc.slice(1);
    weatherIconEl.setAttribute("alt", desc);
}

function displayForecast(data) {
    const forecastList = data.list.filter(item =>
        item.dt_txt.includes("12:00:00")
    );

    const nextThreeDays = forecastList.slice(0, 3);

    forecastContainerEl.innerHTML = "";

    nextThreeDays.forEach(day => {
        let dayCard = document.createElement("div");
        dayCard.className = "forecast-item";

        const date = new Date(day.dt * 1000);
        const dayName = date.toLocaleDateString("es-PE", { weekday: 'short' });

        const iconCode = day.weather[0].icon;
        const iconSrc = `https://openweathermap.org/img/wn/${iconCode}.png`;

        const temp = Math.round(day.main.temp);

        dayCard.innerHTML = `
            <p><strong>${dayName.charAt(0).toUpperCase() + dayName.slice(1)}</strong></p>
            <img src="${iconSrc}" alt="${day.weather[0].description}" width="40" height="40">
            <p>${temp}&deg;${units === 'metric' ? 'C' : 'F'}</p>
        `;

        forecastContainerEl.appendChild(dayCard);
    });
}

fetchWeather();

/* ------------------ SPOTLIGHTS ------------------ */

const membersURL = "data/home-members.json";
const spotlightsContainerEl = document.querySelector(".home-grid");
const numSpotlights = 3;

async function getSpotlights() {
    try {
        const response = await fetch(membersURL);
        if (response.ok) {
            const data = await response.json();
            displaySpotlights(data.members);
        } else {
            throw Error('Error al cargar el archivo JSON de miembros');
        }
    } catch (error) {
        console.error("Error en getSpotlights:", error);
    }
}

function displaySpotlights(members) {

    const qualifiedMembers = members.filter(member =>
        member.membershipLevel === "Gold" || member.membershipLevel === "Silver"
    );

    const shuffled = qualifiedMembers.sort(() => 0.5 - Math.random());
    const selection = shuffled.slice(0, numSpotlights);

    selection.forEach(member => {
        let card = document.createElement("section");
        card.className = "spotlight-card";

        let logoSrc = `images/members/${member.image}`;

        card.innerHTML = `
            <h3>${member.name}</h3> 
            <img src="${logoSrc}" alt="Logo de ${member.name}" width="100" height="100">
            <p>${member.phone}</p>
            <p>${member.address}</p>
            <a href="${member.website}" target="_blank">Visit Website</a>
            <hr>
            <p><strong>${member.membershipLevel} Member</strong></p>
        `;

        spotlightsContainerEl.appendChild(card);
    });
}

getSpotlights();