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
        getForecast(city);

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
    getForecast(prevCityClick);
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

    const displayCurrentTemperature = document.querySelector('#main-temp')
    const todayTemp = Math.round(city.main.temp) + " °C";
    displayCurrentTemperature.textContent = todayTemp;

    const displayWindSpeed = document.querySelector('#wind-speed')
    const todayWindSpeed = city.wind.speed + " MPH"
    displayWindSpeed.textContent = todayWindSpeed;

    const displayCurrentHumidity = document.querySelector('#current-humidity')
    const todayHumidity = city.main.humidity + " %"
    displayCurrentHumidity.textContent = todayHumidity;

    const newCity = document.createElement('li');
    newCity.className = "list-group-item";
    newCity.textContent = searchTerm;
    newCity.addEventListener("click", buttonClickHandler);
    prevCity.appendChild(newCity);

    const lon = city.coord.lon;
    const lat = city.coord.lat;

    searchCityUV(lon, lat, city);

};

const displayUVIndex = function(data) {
    const UV = data.value;
    if (uv >= 6) {
        currentUVIndex.classList="badge badge-danger"
        currentUVIndex.innerHTML=" " + UV + " ";
    } else if (UV > 3) {
        currentUVIndex.classList="badge badge-warning"
        currentUVIndex.innerHTML=" " + UV + " ";
    } else {
        currentUVIndex.classList="badge badge-success"
        currentUVIndex.innerHTML=" " + UV + " ";
    }
}

const getForecast = function(city) {
    const forecastURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=metric&appid=" + API_KEY;

    fetch(forecastURL).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                displayForecast(data.list);
            });
        } else {
            alert("Error:" + response.statusText);
        }
    })
    .catch(function(error) {
        alert("Unable to connect to OpenWeather");
    })
};

const displayForecast = function(list) {
    for (const i = 0; i <= 4; i++) {

        const displayDateOne = document.querySelector('#date-0');
        const forecastDateOne = dayjs().add(1, "days").format('dddd, MMMM D, YYYY, h:mmA');
        displayDateOne.textContent = forecastDateOne;

        const displayDateTwo = document.querySelector('#date-0');
        const forecastDateTwo = dayjs().add(1, "days").format('dddd, MMMM D, YYYY, h:mmA');
        displayDateTwo.textContent = forecastDateTwo;

        const displayDateThree = document.querySelector('#date-0');
        const forecastDateThree = dayjs().add(1, "days").format('dddd, MMMM D, YYYY, h:mmA');
        displayDateThree.textContent = forecastDateThree;

        const displayDateFour = document.querySelector('#date-0');
        const forecastDateFour = dayjs().add(1, "days").format('dddd, MMMM D, YYYY, h:mmA');
        displayDateFour.textContent = forecastDateFour;

        const displayDateFive = document.querySelector('#date-0');
        const forecastDateFive = dayjs().add(1, "days").format('dddd, MMMM D, YYYY, h:mmA');
        displayDateFive.textContent = forecastDateFive;

        const displayCurrentTemperature = document.querySelector(`#temp-${i}`);
        const forecastTemp = list[i].main.temp + "°C"
    }  
}