// Tutorial by http://youtube.com/CodeExplained
// api key : 82005d27a116c2880c8f0fcb866998a0

//Element Selection
const iconElement=document.querySelector(".weather-icon");
const tempElement=document.querySelector(".weather-temperature p");
const decriElement=document.querySelector(".weather-status p");
const locationElement=document.querySelector(".location p");
const notificationElement=document.querySelector(".notification");

//app data

const weather={};

weather.temperature={
    unit:"celcious"
}

const Kelvin=273;
const Key="82005d27a116c2880c8f0fcb866998a0";

// check if browser supports geolocation
if('geolocation' in navigator){
    navigator.geolocation.getCurrentPosition(setPosition,showError);

}
else{
    notificationElement.style.display="block";
    notificationElement.innerHTML="<p>Browser doesn't Support Geolocation</p>";
}

//set users position
function setPosition(position){
    let latitude=position.coords.latitude;
    let longitude=position.coords.longitude;

    getWeather(latitude,longitude)

}

//show error if there is issue with geoloaction
function showError(){
    notificationElement.style.display="block";
    notificationElement.innerHTML=`<p>${error.message}</p>`
}

//fetch report from api
function getWeather(latitude,longitude){
    let api=`http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${Key}`;

    fetch(api)
    .then(function(response){
        let data=response.json();
        return data;
    })
    .then(function(data){
        weather.temperature.value=Math.floor(data.main.temp-Kelvin);
        weather.description=data.weather[0].description;
        weather.iconId=data.weather[0].icon;
        weather.city=data.name;
        weather.country=data.sys.country;
    })
    .then(function(){
        displayWeather();
    })
}

//display weather to UI
function displayWeather(){
    iconElement.innerHTML=`<img src="icons/${weather.iconId}.png"/>`;
    tempElement.innerHTML=`${weather.temperature.value}°<span>C</span>`;
    decriElement.innerHTML=weather.description;
    locationElement.innerHTML=`${weather.city},${weather.country}`;
}

// C to F conversion
function celsiusToFahrenheit(temperature){
    return (temperature * 9/5) + 32;
}

// WHEN THE USER CLICKS ON THE TEMPERATURE ELEMENET
tempElement.addEventListener("click", function(){
    if(weather.temperature.value === undefined) return;
    
    if(weather.temperature.unit == "celsius"){
        let fahrenheit = celsiusToFahrenheit(weather.temperature.value);
        fahrenheit = Math.floor(fahrenheit);
        
        tempElement.innerHTML = `${fahrenheit}°<span>F</span>`;
        weather.temperature.unit = "fahrenheit";
    }else{
        tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
        weather.temperature.unit = "celsius"
    }
});
