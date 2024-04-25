import React, { useState } from 'react';
import './WeatherApp.css';
import search_icon from "../Assets/search.png";
import clear_icon from "../Assets/clear.png";
import cloud_icon from "../Assets/cloud.png";
import rain_icon from "../Assets/rain.png";
import snow_icon from "../Assets/snow.png";
import wind_icon from "../Assets/wind.png";
import humidity_icon from "../Assets/humidity.png";

const WeatherApp = () => {
    let api_key = "967132c23ef7d55578d66e811a3c96f4";

    const [wicon, setWicon] = useState(cloud_icon);
    const [weatherDescription, setWeatherDescription] = useState("Partly cloudy");

    const search = async () => {
        const element = document.getElementsByClassName("cityInput");
        if (element[0].value === "") {
            return 0;
        }
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&appid=${api_key}`;

        let response = await fetch(url);
        let data = await response.json();
        const humidity = document.getElementsByClassName("humidity-percent");
        const wind = document.getElementsByClassName("wind-rate");
        const temperature = document.getElementsByClassName("weather-temp");
        const location = document.getElementsByClassName("weather-location");

        humidity[0].innerHTML = data.main.humidity + " %";
        wind[0].innerHTML = Math.floor(data.wind.speed) + " km/h";
        temperature[0].innerHTML = Math.floor(data.main.temp - 273.15) + " °C";
        location[0].innerHTML = data.name;

        switch (data.weather[0].icon) {
            case "01d":
            case "01n":
                setWeatherDescription("Clear sky");
                setWicon(clear_icon);
                break;
            case "02d":
            case "02n":
                setWeatherDescription("Few clouds");
                setWicon(cloud_icon);
                break;
            case "03d":
            case "03n":
                setWeatherDescription("Scattered clouds");
                setWicon(cloud_icon);
                break;
            case "04d":
            case "04n":
                setWeatherDescription("Broken clouds");
                setWicon(cloud_icon);
                break;
            case "09d":
            case "09n":
                setWeatherDescription("Shower rain");
                setWicon(rain_icon);
                break;
            case "10d":
            case "10n":
                setWeatherDescription("Rain");
                setWicon(rain_icon);
                break;
            case "13d":
            case "13n":
                setWeatherDescription("Snow");
                setWicon(snow_icon);
                break;
            default:
                setWeatherDescription("Unknown");
                setWicon(clear_icon);
                break;
        }
    };

    return (
        
        <div className="big-container">
            <h1>My Weather App</h1>
            <div className='container'>
                <div className="top-bar">
                    <input type="text" className="cityInput" placeholder='Search' />
                    <div className="search-icon" onClick={() => { search() }}>
                        <img src={search_icon} alt="" />
                    </div>
                </div>
                <div className="weather-image">
                    <img src={wicon} alt="" />
                </div>
                <div className="weather-temp">24°</div>
                <div className="weather-location">London</div>
                <div className="weather-description">{weatherDescription}</div>
                <div className="data-container">
                    <div className="element">
                        <img src={humidity_icon} alt="" className="icon" />
                        <div className="data">
                            <div className="humidity-percent">64%</div>
                            <div className="text">Humidity</div>
                        </div>
                    </div>
                    <div className="element">
                        <img src={wind_icon} alt="" className="icon" />
                        <div className="data">
                            <div className="wind-rate">18 km/h</div>
                            <div className="text">Wind Speed</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    )
}

export default WeatherApp;
