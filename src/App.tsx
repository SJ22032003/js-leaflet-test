import { WeatherContext, weatherReducer, initialState } from "./context";
import { useReducer } from "react";
import WeatherForm from "./components/WeatherForm";

function App() {
  const [state, dispatch] = useReducer(weatherReducer, initialState);

  return (
    <WeatherContext.Provider value={{ state, dispatch }}>
      <main>
        <WeatherForm />
      </main>
    </WeatherContext.Provider>
  )
}

export default App;