let input = document.querySelector("input");
let button = document.querySelector("button");
let image = document.querySelector("img");
let locationIcon = document.querySelector("#location-icon");

function gotLocation(position) {
    let url = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}&localityLanguage=en`;

    fetch(url).then(response => response.json()).then(data => {getWeatherInfo(data.city)});
}

function failedToGet() {
    document.querySelector(".container").innerHTML = `<h2>Please allow Loaction</h2> <img src="404.png">`;
    setTimeout(() => {
        location.reload();
    }, 1500);
}

locationIcon.addEventListener("click", async ()=> {
    const result = navigator.geolocation.getCurrentPosition(gotLocation,failedToGet);
})

let getWeatherInfo = async (city) => {
    try {
        const apiKey = "4f3af9db6729c52c68e44c282a7fa608";
        const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey;

        const data = await fetch(url).then(response => response.json());

        document.querySelector("#cityName").innerText = city;
        document.querySelector("#Weather-Type").innerText = data.weather[0].description;
        document.querySelector("#temp").innerHTML = Math.round(data.main.temp - 273) + `<sup>°</sup>` + "C";
        document.querySelector("#humidity").innerText = data.main.humidity + "%";
        document.querySelector("#windSpeed").innerText = data.wind.speed + "Km/h";

        let condition = data.weather[0].main;
        if(condition == 'Clouds') {
            image.src = "cloud.png";
        }
        else if(condition == 'Clear') {
            image.src = "clear.png";
        }
        else if(condition == 'Rain') {
            image.src = "rain.png";
        }
        else if(condition == 'Mist') {
            image.src = "mist.png";
        }
        else if(condition == 'Snow') {
            image.src = "snow.png";
        }

        document.querySelector("#Details").style.display = 'block';
    } catch (error) {
        document.querySelector(".container").innerHTML = `<h2>No city Found !!!</h2> <img src="404.png">`;
        setTimeout(() => {
            location.reload();
        }, 1500);
    }
}

button.addEventListener("click",(e)=> {
    e.preventDefault();
    getWeatherInfo(input.value);
})