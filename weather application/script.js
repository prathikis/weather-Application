const apikey = "api-key";
const Url = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchbox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weather_icon = document.querySelector(".weather-icon");

async function checkWeather(city) {
    const response = await fetch(Url + city + `&appid=${apikey}`);
    if (response.status == 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    } else {
        const data = await response.json();
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

        const weatherCondition = data.weather[0].main.toLowerCase();

        if (weatherCondition === 'clouds') {
            weather_icon.src = "./weather-app-img/images/clouds.png";
        } else if (weatherCondition === 'rain') {
            weather_icon.src = "./weather-app-img/images/rain.png";
        } else if (weatherCondition === 'clear') {
            weather_icon.src = "./weather-app-img/images/clear.png";
        } else if (weatherCondition === 'drizzle') {
            weather_icon.src = "./weather-app-img/images/drizzle.png";
        } else if (weatherCondition === 'mist') {
            weather_icon.src = "./weather-app-img/images/mist.png";
        }

        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";
    }
}

searchBtn.addEventListener('click', () => {
    checkWeather(searchbox.value);
});
