const apiKey = "a50118d11c95cec297729d33cec9db57";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const card = document.querySelector(".card")

async function checkWeather(city) {

    if(!city){
       return checkWeather("halifax")
    }

    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    
    if(response.status == 404){
        document.querySelector(".error").style.display = "block"
    } else {
        let data = await response.json();

        console.log(data);
        const sunriseDate = new Date(data.sys.sunrise * 1000);
        const sunsetDate = new Date(data.sys.sunset * 1000);
        const sunriseTime = sunriseDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
        const sunsetTime = sunsetDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });

        document.querySelector(".city").innerHTML=data.name;
        document.querySelector(".temp").innerHTML=Math.round(data.main.temp) + "°";
        document.querySelector(".humidity").innerHTML=data.main.humidity + "%";
        document.querySelector(".wind").innerHTML=data.wind.speed + "km/h";
        document.querySelector(".sunrise").innerHTML=sunriseTime;
        document.querySelector(".sunset").innerHTML=sunsetTime;

        if(data.weather[0].main === "Clouds"){
            weatherIcon.src = "images/clouds.png"
            card.style.background = "linear-gradient(135deg, #757F9A, #D7DDE8)";
        } else if(data.weather[0].main === "Rain"){
            weatherIcon.src = "images/rain.png"
            card.style.background = "linear-gradient(135deg, #4DA0B0, #D39D38)";
        } else if(data.weather[0].main === "Drizzle"){
            weatherIcon.src = "images/drizzle.png"
            card.style.background = "linear-gradient(135deg, #89f7fe, #66a6ff)";
        }  else if(data.weather[0].main === "Mist"){
            weatherIcon.src = "images/mist.png"
            card.style.background = "linear-gradient(135deg, #8e9eab, #eef2f3)"; 
        }  else if(data.weather[0].main === "Clear"){
            weatherIcon.src = "images/clear.png"
            card.style.background = "linear-gradient(135deg, #a1c4fd, #c2e9fb)"; 
        }    
        document.querySelector(".error").style.display = "none"

        }
}

searchBtn.addEventListener("click",()=> {
    checkWeather(searchBox.value);
})



checkWeather();