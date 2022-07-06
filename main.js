function preloader()
{
    setTimeout(function() {
        
        var body    =   document.getElementsByTagName("BODY")[0];
        var loader  =   document.getElementById("preloader");
        var pulsar  =   document.getElementById("pulsar");
        
        body.className   -=   "cut";
        pulsar.className +=   "hide";
        loader.className +=   "moveUp";
        
    }, 3000)
}


const api = {
    key: "f2cd2d3f5d02bb2a62537a234b359b3c",
    base: "https://api.openweathermap.org/data/2.5/"
}
const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);

function setQuery(evt) {
    if (evt.keyCode == 13) {
        getResults(searchbox.value);
    }
}

function getResults(query){
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then(weather =>{
        return weather.json();
    }).then(displayResults);
}

var degrees = 0;


function displayResults(weather){
    let city = document.querySelector('.location .city');
    city.innerText = `${weather.name}, ${weather.sys.country}`;
    
    let now = new Date();
    let date = document.querySelector('.location .date');
    date.innerText = dateBuilder(now);

    let temp = document.querySelector('.current .temp');
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°</br>Celcius</span>`;
    var tempDegrees = parseInt(weather.main.temp);
    

    let weather_el = document.querySelector('.current .weather');
    weather_el.innerText = weather.weather[0].main;
    var weatherStatus = String(weather.weather[0].main);
    backgroundImage(weatherStatus);
    fitImagesDesc(tempDegrees, weatherStatus);
    fitImagesDisplay(tempDegrees, weatherStatus);

    let hilow = document.querySelector('.hi-low');
    hilow.innerText = `${Math.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)}°c`;

    let scrolldown = document.querySelector('.scrollDown');
    scrolldown.innerHTML = `<bold>Scroll down</bold>`;

    let scrolldownimage = document.querySelector('.scrollDownImage');
    scrolldownimage.innerHTML = `<img id="scrollImage" src="scroll.png" alt="Sroll Icon"></img>`;
}

function dateBuilder (d){
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

     return `${day} ${date} ${month} ${year}`;
}

function backgroundImage(weather){ 
    if (weather == 'Clouds'){
        document.getElementById('a').style.backgroundImage="url('/images/cloudBg.jpg')";
    }
    else if (weather == 'Snow'){
        document.getElementById('a').style.backgroundImage="url('/images/snowBg.jpg')";
    }
    else if (weather == 'Clear'){
        document.getElementById('a').style.backgroundImage="url('/images/bg.png')";
    }
    else if (weather == 'Rain' || 'Drizzle' || 'Thunderstorm'){
        document.getElementById('a').style.backgroundImage="url('/images/rainBg.jpg')";
    }
    else{
        document.getElementById('a').style.backgroundImage="url('/images/bg.png')";;
    }
}
function fitImagesDesc(t, w){
    var images = document.querySelector(".images")
    var fits = document.querySelector(".fits")
    if (t < 5){
        images.innerHTML = `<b>Very Cold Weather<b><br> <br> Suggest Wearing 3 layers including: <br> - A Windbreaker or Pufferjacket<br> - Hoodie or Sweatshirt <br> - Thermal or Longsleeve <br> - Long Pants or Sweatpants <br> <br>Optional: Gloves, Beanie`;
    
    }
    else if (t < 15 && t>=5){
        
        images.innerHTML = `Cold Weather <br><br> Suggest Wearing 2-3 layers <br> Optional: Beanie`;
    }
    else if (t < 20 && t>=15){
        images.innerHTML = `Cold Weather <br><br> Suggest Wearing 2 layers`;
    }
    else if (t < 25 && t>=20){
        images.innerHTML = `Not Cold, but Not Hot Weather <br><br> Suggest wearing either: <br> Hoodie and shorts<br>or<br>Pants and shirt`;
    }
    else if (t < 30 && t>=25){
        images.innerHTML = `Warm Weather <br><br> Suggest wearing either: <br> Hoodie and shorts<br>or<br>Pants and shirt`;
    }
    else{
        images.innerHTML = `Hot Weather <br><br> Suggest wearing shirt and shorts`;
    }
}

function fitImagesDisplay(t, w){
    var fits = document.querySelector(".fits")
    if (t < 5){
        fits.innerHTML = `<img src="Images/below5/a.JPG" alt="5.1"><br><img src="Images/below5/b.JPG" alt="5.2"><br><img src="Images/below5/c.JPG" alt="5.3">`;
    }
    else if (t < 15 && t>=5){
        fits.innerHTML = `<img src="Images/below15/a.JPG" alt="5-15.2"><br><img src="Images/below15/b.JPG" alt="5-15.3"><br><img src="Images/below15/c.png" alt="5.15.1">`;
    }
    else if (t < 20 && t>=15){
        fits.innerHTML = `<img src="Images/below20/a.JPG" alt="15-20.1"><br><img src="Images/below20/b.JPG" alt="15-20.2"><br><img src="Images/below20/c.JPG" alt="15-20.3">`;
    }
    else if (t < 30 && t>=20){
        fits.innerHTML = `<img src="Images/below25/a.png" alt="20-25.1"><br><img src="Images/below25/b.png" alt="20-25.2"><br><img src="Images/below25/c.JPG" alt="20-25.3"><br><img src="Images/below25/d.PNG" alt="20-25.4">`;
    }
    else{
        fits.innerHTML = `<img src="Images/above25/a.png" alt="25+1"><img src="Images/above25/b.png" alt="30+1"><img src="Images/above25/c.JPG" alt="30+2"><img src="Images/above25/d.JPG" alt="30+4">`;
    }
}