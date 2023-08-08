import axios from "axios";

const getWeather = (lat, lng) => {
    const request = axios.get(
        `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lng}&exclude=minutely,hourly,daily,alerts&appid=${process.env.REACT_APP_API_KEY}&units=metric`
    );
    return request.then((response) => response.data);
};

export default { getWeather };
