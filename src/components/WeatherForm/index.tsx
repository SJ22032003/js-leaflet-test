import { useForm } from "react-hook-form";
import { weatherApiInstance } from "../../api";
import { useContext } from "react";
import { WeatherContext } from "../../context";
import { SET_ERROR, SET_LOADING, SET_WEATHER_DATA } from "../../context/actions";
import styles from './styles.module.css';

type TFormData = {
  lat: number;
  lon: number;
  q: string;
};

function WeatherForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TFormData>();

  const { dispatch } = useContext(WeatherContext);

  // FORM SUBMISSION FUNCTION
  const onSubmit = async (weatherData: TFormData) => {
    dispatch({ type: SET_LOADING, payload: "PENDING" })
    await weatherApiInstance.get("/forecast", {
      params: weatherData
    }).then((response) => {
      dispatch({ type: SET_WEATHER_DATA, payload: response.data });
      reset();
    }).catch((error) => {
      dispatch({ type: SET_ERROR, payload: error.message })
    }).finally(() => {
      dispatch({ type: SET_LOADING, payload: "IDLE" })
    })
  };

  return (
    <section className={styles.mainContainer}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.formContainer}>
        {/* LATITUDE INPUT */}
        <div>
          <label htmlFor="lat">Latitude</label>
          <input
            type="string"
            id="lat"
            {...register("lat", { required: true })}
          />
          {errors.lat && <span>Latitude is required</span>}
        </div>

        {/* LONGITUDE INPUT */}
        <div>
          <label htmlFor="lon">Longitude</label>
          <input
            type="string"
            id="lon"
            {...register("lon", { required: true })}
          />
          {errors.lon && <span>Longitude is required</span>}
        </div>

        {/* LOCATION SEARCH HERE */}
        <div>
          <label htmlFor="q">Location</label>
          <input
            type="text"
            id="q"
            {...register("q")}
            placeholder="Enter location"
          />
        </div>

        <button type="submit">Submit</button>
      </form>
    </section>
  );
}

export default WeatherForm;
