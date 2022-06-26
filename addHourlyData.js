export function addHourlyCards(weatherData) {
    const hourlyContainer = document.getElementById("hourly-cards");
        //attempt at adding hourly cards
        for(let i = 0; i < weatherData.hourly.length; i++) {
            const hourlyDivTime = document.createElement('div');
            const hourlyDivTemp = document.createElement('div');
            const newHourlyContainer = document.createElement('div');
            const hourlyDivIcon = document.createElement('div');
            const hourlyDivDesc = document.createElement('div');

            hourlyContainer.appendChild(newHourlyContainer);
            newHourlyContainer.appendChild(hourlyDivTime);
            newHourlyContainer.append(hourlyDivTemp);
            newHourlyContainer.appendChild(hourlyDivIcon);
            newHourlyContainer.appendChild(hourlyDivDesc);


            let hUnixTimestamp = weatherData.hourly[i].dt;
            let hRaw = new Date(hUnixTimestamp * 1e3);

            let hTime = hRaw.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
            let hTemp = Math.round(weatherData.hourly[i].temp);
            let icon = weatherData.hourly[i].weather[0].icon;
            let desc = weatherData.hourly[i].weather[0].main;

            newHourlyContainer.id = 'hourly-time-container-' + i;
            newHourlyContainer.classList.add('h-card-container');


            hourlyDivTime.id = 'hourly-time-' + i;
            hourlyDivTime.classList.add('h-card-top');
            hourlyDivTime.innerHTML = hTime;

            hourlyDivTemp.id = 'hourly-temp-' + i;
            hourlyDivTemp.classList.add('h-card');
            hourlyDivTemp.innerHTML = hTemp + '°F';

            hourlyDivIcon.id = 'hourly-icon-' + i;
            hourlyDivIcon.setAttribute("style", `background-image: url(http://openweathermap.org/img/wn/${icon}@2x.png)`);
            hourlyDivIcon.classList.add('h-icon');

            hourlyDivDesc.id = 'hourly-desc-' + i;
            hourlyDivDesc.classList.add('h-desc');
            hourlyDivDesc.innerHTML = desc;


        }
}
