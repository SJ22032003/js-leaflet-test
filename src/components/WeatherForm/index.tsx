import { useForm } from "react-hook-form";
import { weatherApiInstance } from "../../api";
import { useContext, useEffect } from "react";
import { WeatherContext } from "../../context";
import {
  SET_ERROR,
  SET_LOADING,
  SET_WEATHER_DATA,
} from "../../context/actions";
import styles from "./styles.module.css";

type TFormData = {
  lat: string;
  lon: string;
  q: string;
};

function WeatherForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<TFormData>();

  const { dispatch, state } = useContext(WeatherContext);

  // FORM SUBMISSION FUNCTION
  const onSubmit = async (weatherData: TFormData) => {
    dispatch({ type: SET_LOADING, payload: "PENDING" });
    await weatherApiInstance
      .get("/weather", {
        params: weatherData,
      })
      .then((response) => {
        dispatch({ type: SET_WEATHER_DATA, payload: response.data });
        reset();
      })
      .catch((error) => {
        dispatch({ type: SET_ERROR, payload: error.message });
      })
      .finally(() => {
        dispatch({ type: SET_LOADING, payload: "IDLE" });
      });
  };

  useEffect(() => {
    if (state.data?.coord) {
      setValue("lat", state.data.coord.lat.toString());
      setValue("lon", state.data.coord.lon.toString());
      setValue("q", state.data.name);
    }
  }, [state.data?.coord]);

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
          {errors.lat && <span className="error-text">Latitude is required</span>}
        </div>

        {/* LONGITUDE INPUT */}
        <div>
          <label htmlFor="lon">Longitude</label>
          <input
            type="string"
            id="lon"
            {...register("lon", { required: true })}
          />
          {errors.lon && <span className="error-text">Longitude is required</span>}
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

        <button type="submit" disabled={state.loading === "PENDING"}>
          Submit
        </button>
      </form>
    </section>
  );
}

export default WeatherForm;
