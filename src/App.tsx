import { WeatherContext, weatherReducer, initialState } from "./context";
import { useReducer } from "react";
import styles from "./app.module.css";
import WeatherForm from "./components/WeatherForm";
import WeatherDisplay from "./components/WeatherDisplay";
import MapDisplay from "./components/MapDisplay";
import { Toaster } from "sonner";

function App() {
  const [state, dispatch] = useReducer(weatherReducer, initialState);

  return (
    <>
    <Toaster />
    <main className={styles.mainContainer}>
      <WeatherContext.Provider value={{ state, dispatch }}>
        <aside>
          <WeatherForm />
          <WeatherDisplay />
        </aside>
        <aside>
          <MapDisplay />
        </aside>
      </WeatherContext.Provider>
    </main>
    </>
  );
}

export default App;
