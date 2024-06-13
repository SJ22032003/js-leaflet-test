import axios from "axios";

const appid = import.meta.env.VITE_API_WEATHER_KEY;

export const weatherApiInstance = axios.create({
  baseURL: "https://api.openweathermap.org/data/2.5",
  params: {
    appid,
    units: "metric",
  },
});
