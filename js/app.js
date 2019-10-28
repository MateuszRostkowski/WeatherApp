window.addEventListener('load', () => {
    let long;
    let lat;
    let temperatureDescription = document.querySelector(".temperature__description");
    let temperatureDegree = document.querySelector(".temperature__display");
    let locationTimezone = document.querySelector(".location__timezone");
    let temperatureSection = document.querySelector(".temperature__degree");
    let temperatureSpan = document.querySelector(".temperature__degree span");


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
                    //Formula for celsius
                    let celsius = (temperature - 32) * (5 / 9)

                    // Set icon
                    setIcons(icon, document.querySelector('.icon'));

                    temperatureSection.addEventListener('click', () => {
                        if(temperatureSpan.innerText == "F") {
                            temperatureSpan.innerText = "C";
                            temperatureDegree.innerText = Math.floor(celsius);
                        } else {
                            temperatureSpan.innerText = "F";
                            temperatureDegree.innerText = temperature;
                        }
                    })
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