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
            results = jsonResponse.current.temp;
            // console.log(typeof jsonResponse);
            // const cityLat = jsonResponse[0]["lat"];
            // const cityLon = jsonResponse[0]["lon"];

            return results;

        }
    } catch(error) {
        console.log(error);
    }
}




window.addEventListener("DOMContentLoaded", event => {

    const div = document.getElementById("results");
    const cityInput = document.getElementById("city");
    const stateInput = document.getElementById("state");
    const btn = document.getElementById("search");

    cityInput.addEventListener("input", event => {
        city = event.target.value;
    });

    stateInput.addEventListener("input", event => {
        stateCode = event.target.value;
    });



    btn.addEventListener("click", event => {
        (async () => {
            await getWeatherData();
            div.innerText = `temp in ${city} is ${results} ° F`;
        })();
    })



});
