import { assignDay } from "./assignDay.js";

export function addCurrentData(weatherData, city, stateCode, userAddress) {
    const currentDate = document.getElementById("date");
    const divCurrentTemp = document.getElementById("current-temp");
    const divLocation = document.getElementById("location");
    const divWeatherDescription = document.getElementById("weather-description");


    divCurrentTemp.innerText = `${weatherData.current.temp}° F`;
    divWeatherDescription.innerText = `${weatherData.current.weather[0].description}`;
    let unixTimestamp = weatherData.hourly[0].dt;
    console.log(unixTimestamp);
    console.log(weatherData.hourly.length);

    if(!city && !stateCode) {
        divLocation.innerText = `${userAddress}`;
    } else {
        divLocation.innerText = `${city}, ${stateCode}`;
    }



    let hUnixTimestamp = weatherData.daily[0].dt;
    //console.log(weatherData.daily[i].dt);
    let hRaw = new Date(hUnixTimestamp * 1e3);

    let dTime = hRaw.toLocaleDateString();
    let findDay = hRaw.getDay();
    console.log(findDay);
    let dDay = assignDay(findDay);
    console.log(dDay);



    currentDate.innerHTML = dDay + " " + dTime;
}
