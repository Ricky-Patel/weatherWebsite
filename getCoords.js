import { addDailyCards } from "./addDailyData.js";
import { addHourlyCards } from "/addHourlyData.js";
import { addCurrentData } from "./addCurrentData.js";
// import { getLocation } from "./getUserLocation.js"; not sure if needed

const myAPIKey = config.myAPIKey;
const baseGeoUrl = 'http://api.openweathermap.org/geo/1.0/direct';
const baseOneCallUrl = 'https://api.openweathermap.org/data/2.5/onecall';

// use a known location for now 'NYC, NY'

let city = '';
let stateCode = '';
const country = 'USA';
const units = 'imperial';

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
    let weatherData;

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

const getWeatherDataUser = async (cityArrayUser) => {
    //declarations
    let cityArray = cityArrayUser;
    console.log(cityArrayUser);
    let weatherData;

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

(async () => {

    let arr = [];
    let cityArrayUser = [];

    let getLocationPromise = new Promise((resolve, reject) => {
        if(navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {

                // console.log(position.coords.latitude, position.coords.longitude) //test...

                let lat = position.coords.latitude
                let long = position.coords.longitude

                // console.log("LATLONG1: ", lat, long) //test...

                // Resolving the values which I need
                resolve({latitude: lat,
                        longitude: long})
            })

        } else {
            reject("your browser doesn't support geolocation API")
        }
    });

    cityArrayUser = await getLocationPromise.then((location) => {
        return arr = [location.latitude, location.longitude];
    }).catch((err) => {
        console.log(err);
    });


    let latlng = { lat: cityArrayUser[0], lng: cityArrayUser[1] };

    let address = "";

    let results = "";


    let geocoder = new google.maps.Geocoder();

    let userAddress = await geocoder
    .geocode({ location: latlng })
    .then((response) => {
        results = response.results;
        address = results[0].formatted_address;
        // console.log(address);
        return address;
    });

    console.log(userAddress);







    let weatherData = await getWeatherDataUser(cityArrayUser);
    console.log(cityArrayUser);
    console.log(weatherData);



    addCurrentData(weatherData, city, stateCode, userAddress);
    console.log(city);
    addHourlyCards(weatherData);
    addDailyCards(weatherData);

    })();


    const cityInput = document.getElementById("city");
    const stateInput = document.getElementById("state");
    const btn = document.getElementById("search");



    cityInput.addEventListener("input", event => {
        city = event.target.value;
        return city;
    });

    stateInput.addEventListener("input", event => {
        stateCode = event.target.value;
        return stateCode;
    });



    btn.addEventListener("click", event => {
        (async () => {
            let weatherData = await getWeatherData();



            addCurrentData(weatherData, city, stateCode);
            console.log(city);
            addHourlyCards(weatherData);
            addDailyCards(weatherData);

        })();
    })



});
