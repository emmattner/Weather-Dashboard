const userFormEl = document.querySelector('#user-form');
const cityInputEl = document.querySelector('#city-input');
const cityContainer = document.querySelector('#city-container');
const citySearchTerm = document.querySelector('#city-search-term');
const currentWeather = document.querySelector('#current-weather');
const prevCity = document.querySelector('#previous-city');
const fiveDayForecast = document.querySelector('#forecast-cards');
const currentUVIndex = document.querySelector('#UV-index');

const API_KEY = '4a3134ff84b520e99655fd55fab2c3b8';

const cityArray = [];

const formSubmitHandler = function (event) {
    event.preventDefault();

    const city = cityInputEl.value.trim();

    if (city) {
        getCityWeather(city);
        getForcast(city);

        cityArray.push(city);
        localStorage.setItem('city', JSON.stringify(cityArray));

        cityInputEl.value = '';
    } else {
        alert('Please enter a City name');
    }
};

const buttonClickHandler = function (event) {

    const prevCityClick = event.currentTarget.textContext;

    getCityWeather(prevCityClick);
    getForcast(prevCityClick);
};

const getCityWeather = function (city) {

    const apiUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=metric&appid=" + API_KEY;

    fetch(apiUrl)
        .then(function (response) {
            if (response.ok) {
                console.log(response);
                response.json().then(function(data) {
                    console.log(data);
                    displayCityWeather(data, city);
                });
            } else {
                alert('Error: ' + response.statusText);
            }
        })
        .catch(function (error) {
            alert('Unable to connect to OpenWeather');
        });
};

const cityUVIndex = function (lon, lat, city) {
    const UvUrl ="https://api.openweathermap.org/data/2.5/uvi?q=" + city + "&appid=" + key + "&lat=" + lat + "&lon=" + lon; 

    fetch(UvUrl)
    .then(function (response) {
        if (response.ok) {
            response.json().then(function(lon, lat, city) {
                console.log(data);
                displayUVIndex(lon, lat, city);
            });
        } else {
            alert('Error: ' + response.statusText);
        }
    })
    .catch(function (error) {
        alert('Unable to connect to OpenWeather');
    });
};

const displayCityWeather = function (city, searchTerm) {
    cityContainer.textContent = '';
    citySearchTerm.textContent = searchTerm

    const displayCurrentDate = document.querySelector('#current-city-date')
    const todayDate = dayjs();
    displayCurrentDate.textContent = todayDate.format('dddd, MMMM D, YYYY, h:mmA');

    const displayTemperature = document.querySelector('#main-temp')
    const todayTemp = Math.round(city.main.temp) + " °C";
    displayTemperature.textContent = todayTemp;
}