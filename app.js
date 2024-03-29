let input = document.querySelector("input");
let button = document.querySelector("button");
let image = document.querySelector("img");

let getWeatherInfo = async (city) => {
    try {
        const apiKey = "4f3af9db6729c52c68e44c282a7fa608";
        const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey;

        const data = await fetch(url).then(response => response.json());

        document.querySelector("#cityName").innerText = input.value;
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
        document.querySelector("#Details").style.display = 'none';
        alert("No city Found!!");
    }
}

button.addEventListener("click",(e)=> {
    e.preventDefault();
    getWeatherInfo(input.value);
})