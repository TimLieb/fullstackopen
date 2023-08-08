import { useState } from "react";
import weatherService from "../services/weather.js";

const CountryList = ({ countries, clickHandler }) => {
    const [weather, setWeather] = useState(null);

    switch (true) {
        case countries.length > 10:
            return <div>Too many matches, specify another filter</div>;
        case countries.length === 1:
            weatherService
                .getWeather(
                    countries[0].capitalInfo.latlng[0],
                    countries[0].capitalInfo.latlng[1]
                )
                .then((newWeather) => setWeather(newWeather));

            return countries.map((country) => (
                <div key={country.name.official}>
                    <div>
                        <h2>{country.name.common}</h2>
                    </div>
                    <div>
                        <p>capital: {country.capital}</p>
                        <p>area: {country.area}</p>
                    </div>
                    <div>
                        <b>languages:</b>
                    </div>
                    <div>
                        <ul>
                            {Object.values(country.languages).map(
                                (language) => (
                                    <li key={language}>{language}</li>
                                )
                            )}
                        </ul>
                    </div>
                    <img
                        src={country.flags.png}
                        alt="Country flag"
                        width="150"
                        height="150"
                    />
                    <div>
                        <h3>Weather in {country.capital[0]}</h3>
                        <p>temperature {weather.current.temp} Celcius</p>
                        <img
                            src={`https://openweathermap.org/img/wn/${weather.current.weather[0].icon}@2x.png`}
                            alt="weather icon"
                        />
                        <p>wind {weather.current.wind_speed} m/s</p>
                    </div>
                </div>
            ));
        default:
            return countries.map((country) => (
                <div key={country.name.official}>
                    {country.name.common}{" "}
                    <button
                        country={country.name.common}
                        onClick={clickHandler}
                    >
                        show
                    </button>
                </div>
            ));
    }
};

export default CountryList;
