const myAPIKey = config.myAPIKey;
const baseGeoUrl = 'http://api.openweathermap.org/geo/1.0/direct';
const baseOneCallUrl = 'https://api.openweathermap.org/data/2.5/onecall';

// use a known location for now 'NYC, NY'

let city = '';
let stateCode = '';
const country = 'USA';
const units = 'imperial';
let results;

// use input of the city,state to make a call to the geocoding API
// return the lat, lon of the city,state
const getCityLongLat = async () => {
    //declarations


    // ?q={city name},{state code},{country code}&limit={limit}&appid={API key}
    const params = `?q=${city},${stateCode},${country}`;
    const key = `&appid=${myAPIKey}`;
    const urlToFetch = `${baseGeoUrl}${params}${key}`;

    try {

        const response = await fetch(urlToFetch);
        if(response.ok) {
            const jsonResponse = await response.json();
            // console.log(jsonResponse);
            // console.log(typeof jsonResponse);
            const cityLat = jsonResponse[0]["lat"];
            const cityLon = jsonResponse[0]["lon"];
            // console.log(cityLat + ' ' + cityLon);

            const arr = [cityLat, cityLon];

            return arr;
        }
    } catch(error) {
        console.log(error);
    }
}


const getWeatherData = async () => {
    //declarations
    let cityArray = await getCityLongLat();

    // ?q={city name},{state code},{country code}&limit={limit}&appid={API key}
    const params = `?lat=${cityArray[0]}&lon=${cityArray[1]}&units=${units}`;
    const key = `&appid=${myAPIKey}`;
    const urlToFetch = `${baseOneCallUrl}${params}${key}`;

    try {

        const response = await fetch(urlToFetch);
        if(response.ok) {
            const jsonResponse = await response.json();
            weatherData = jsonResponse;
            //jsonResponse.current.temp;
            // console.log(typeof jsonResponse);
            // const cityLat = jsonResponse[0]["lat"];
            // const cityLon = jsonResponse[0]["lon"];

            return weatherData;

        }
    } catch(error) {
        console.log(error);
    }
}




window.addEventListener("DOMContentLoaded", event => {

    const divCurrentTemp = document.getElementById("current-temp");
    const divLocation = document.getElementById("location");
    const divCurrentWeather = document.getElementById("current-weather");
    const divWeatherDescription = document.getElementById("weather-description");
    const divHourlyTime = document.getElementById("hourly-time");
    const divHourlyTemp = document.getElementById("hourly-temp");
    const cityInput = document.getElementById("city");
    const stateInput = document.getElementById("state");
    const btn = document.getElementById("search");

    //attempt at hourly
    const hourlyContainer = document.getElementById("hourly-cards");


    cityInput.addEventListener("input", event => {
        city = event.target.value;

    });

    stateInput.addEventListener("input", event => {
        stateCode = event.target.value;
    });



    btn.addEventListener("click", event => {
        (async () => {
            await getWeatherData();

            divCurrentTemp.innerText = `${weatherData.current.temp}° F`;
            //divCurrentWeather.innerText = `${weatherData.current.weather[0].main}`;
            divWeatherDescription.innerText = `${weatherData.current.weather[0].description}`;
            let unixTimestamp = weatherData.hourly[0].dt;
            console.log(unixTimestamp);
            console.log(weatherData.hourly.length);
            let date = new Date(unixTimestamp * 1e3);
            //divHourlyTime.innerText = date.toLocaleTimeString();
            //divHourlyTemp.innerText = `${weatherData.hourly[0].temp}`;
            divLocation.innerText = `${city}, ${stateCode}`;
            //for hourly will need to create new divs in columns and allow scroll. each new div should be new hourly temp/data
            // weatherData.hourly.forEach(hour => divHourlyTemp.innerText = `${hour.temp}`);

            //attempt at adding hourly cards
            for(let i = 0; i < weatherData.hourly.length; i++) {
                const hourlyDivTime = document.createElement('div');
                const hourlyDivTemp = document.createElement('div');
                const newHourlyContainer = document.createElement('div');

                hourlyContainer.appendChild(newHourlyContainer);
                newHourlyContainer.appendChild(hourlyDivTime);
                newHourlyContainer.appendChild(hourlyDivTemp);
                // hourlyDivTime.append(hourlyDivTemp);


                let hUnixTimestamp = weatherData.hourly[i].dt;
                let hRaw = new Date(hUnixTimestamp * 1e3);

                let hTime = hRaw.toLocaleTimeString();
                let hTemp = weatherData.hourly[i].temp;

                newHourlyContainer.id = 'hourly-time-container-' + i;
                newHourlyContainer.classList.add('h-card-container');


                hourlyDivTime.id = 'hourly-time-' + i;
                hourlyDivTime.classList.add('h-card-top');
                hourlyDivTime.innerHTML = hTime;

                hourlyDivTemp.id = 'hourly-temp-' + i;
                hourlyDivTemp.classList.add('h-card');
                hourlyDivTemp.innerHTML = hTemp;


            }

        })();
    })



});
