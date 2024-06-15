import styles from "./styles.module.css";
import { useContext } from "react";
import { WeatherContext } from "../../context";

function WeatherDisplay() {
  const {
    state: { data },
  } = useContext(WeatherContext);

  if (!data) {
    return <h1>No data to display</h1>;
  }

  const formatTemp = (temp: number) => {
    return temp.toFixed(2);
  };

  const currentWeather = data.weather[0];

  return (
    <section className={styles.mainDisplayContainer}>
      <div>
        <h2>{`${data.name}, ${data.sys.country}`}</h2>
        <p>
          Current temperature:{" "}
          <strong>{`${formatTemp(data.main.temp)}°C`}</strong>
        </p>
        <p>
          Feels like: <strong>{`${formatTemp(data.main.feels_like)}°C`}</strong>
        </p>
        <p>
          Humidity: <strong>{`${data.main.humidity}%`}</strong>
        </p>
        <p>
          Wind Speed: <strong>{`${data.wind.speed} m/s`}</strong>
        </p>
        <p>
          {currentWeather.description.charAt(0).toUpperCase() +
            currentWeather.description.slice(1)}
        </p>
      </div>
      <div className={styles.weatherIconContainer}>
        <img
          src={`http://openweathermap.org/img/wn/${currentWeather.icon}@4x.png`}
          alt={currentWeather.description}
          className={styles.weatherIcon}
        />
      </div>
    </section>
  );
}

export default WeatherDisplay;
