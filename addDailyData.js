import { assignDay } from "./assignDay.js";


export function addDailyCards(weatherData) {
    const dailyContainer = document.getElementById("daily-cards");
        //attempt at adding hourly cards
        for(let i = 0; i < weatherData.daily.length; i++) {
            const dailyDivTime = document.createElement('div');
            const dailyDivTemp = document.createElement('div');
            const newDailyContainer = document.createElement('div');
            const dailyDivIcon = document.createElement('div');
            const dailyDivDesc =  document.createElement('div');


            dailyContainer.appendChild(newDailyContainer);
            newDailyContainer.append(dailyDivTime);
            newDailyContainer.appendChild(dailyDivTemp);
            newDailyContainer.appendChild(dailyDivIcon);
            newDailyContainer.appendChild(dailyDivDesc);


            let hUnixTimestamp = weatherData.daily[i].dt;
            //console.log(weatherData.daily[i].dt);
            let hRaw = new Date(hUnixTimestamp * 1e3);

            let dTime = hRaw.toLocaleDateString();
            let findDay = hRaw.getDay();
            console.log(findDay);
            let dDay = assignDay(findDay);
            let dTemp = Math.round(weatherData.daily[i].temp.day);
            console.log(dDay);
            let icon = weatherData.daily[i].weather[0].icon;
            let desc = weatherData.daily[i].weather[0].description;



            newDailyContainer.id = 'daily-time-container-' + i;
            newDailyContainer.classList.add('daily-card-container');


            dailyDivTime.id = 'hourly-time-' + i;
            dailyDivTime.classList.add('d-card-top');
            dailyDivTime.innerHTML = dTime + "<br>" + dDay;



            dailyDivTemp.id = 'daily-temp-' + i;
            dailyDivTemp.classList.add('d-temp');
            dailyDivTemp.innerHTML = dTemp + '°F';



            dailyDivIcon.id = 'daily-icon-' + i;
            dailyDivIcon.setAttribute("style", `background-image: url(http://openweathermap.org/img/wn/${icon}@2x.png)`);
            dailyDivIcon.classList.add('d-icon');

            dailyDivDesc.id = 'daily-desc-' + i;
            dailyDivDesc.classList.add('d-desc');
            dailyDivDesc.innerHTML = desc;


        }




}
