const apikey = "3265874a2c77ae4a04bb96236a642d2f";

const url = (city) =>
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;

function KtoC(temparature){
        let C = temparature - 273.15;
        return C.toFixed(2);
}
var windSpeed = 0;
var pressure = 0;
var humidity = 0;
var weather_description = [];
let description = ""
async function getWeatherByLocation(city) {
        const resp = await fetch(url(city), { origin: "cors" });
        const respData = await resp.json();
        
        // console.log(respData);
        windSpeed = respData.wind.speed;
        pressure = respData.main.pressure;
        humidity = respData.main.humidity;
        weather_description = respData.weather;
        weather_description.forEach(element => {
            let main = (element.main)
            description = main;
        });
        console.log(description)
        // console.log(KtoC(respData.main.temp));
        showWeather(respData,city);
}

getWeatherByLocation("Kolkata")

const cityName = document.getElementById('cityName');
const tempValue = document.getElementById('tempValue');
const list = document.getElementById('list');
const timeDate = document.getElementById('timeDate');
const desc = document.getElementById('desc');


async function showWeather(data,city){
    const cont = document.getElementById('cont');
    const temp = KtoC(data.main.temp);
    cityName.innerText = `
            ${city}
    `;
    desc.innerText = description;
    let date = new Date();
    let time = date.toDateString();
    timeDate.innerHTML = `<h3>${time}</h3>`;
    tempValue.innerText = `${temp}°C`;
    list.innerHTML=`
                    <li>
                        <img src="./wind.jpg"  height="50px">
                        <h3>${windSpeed}</h3>
                        <div>mph</div>
                    </li>
                   
                    <li>
                        <img src="./hum.png" height="50px">
                        <h3>${humidity}</h3>
                         <div>%</div>
                    </li>
                `
}

const searchBtn = document.getElementById('searchBtn');
// const submitBtn = document.getElementById('submitBtn');
const form = document.getElementById('form');

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    let loc = searchBtn.value;
    if(loc){
    getWeatherByLocation(loc);
    }
})