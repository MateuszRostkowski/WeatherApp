window.addEventListener('load', () => {
    let long;
    let lat;
    let temperatureDescription = document.querySelector(".temperature__description");
    let temperatureDegree = document.querySelector(".temperature__display");
    let locationTimezone = document.querySelector(".location__timezone");


    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const proxy = 'https://cors-anywhere.herokuapp.com/'
            const api = `${proxy}https://api.darksky.net/forecast/606651ecad5e3a16093bb3f114f1134a/${lat},${long}`;
            
            fetch(api)
                .then(data => data.json())
                .then(data => {
                    const {temperature, summary, icon } = data.currently;

                    temperatureDegree.innerText = temperature;
                    temperatureDescription.innerText = summary;
                    locationTimezone.innerText = data.timezone;

                    setIcons(icon, document.querySelector('.icon'));
                })
        });
    }

    function setIcons(icon, iconID) {
        const skycons = new Skycons({color: "white"});
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID,Skycons[currentIcon]);
    }
})