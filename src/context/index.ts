/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, Dispatch } from "react";
import { SET_ERROR, SET_LOADING, SET_WEATHER_DATA } from "./actions";
import { WeatherResponse, WeatherState } from "./types";
import { toast } from "sonner";

export const WeatherContext = createContext<{
  state: WeatherState;
  dispatch: Dispatch<Action>;
}>({
  state: {
    loading: "IDLE",
    error: null,
    data: null,
  },
  dispatch: () => {},
});

type State = WeatherState;
type Action = { type: string; payload?: any };

export const initialState: State = { loading: "IDLE", error: null, data: null };

export const weatherReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case SET_LOADING:
      return { ...state, loading: action.payload };
    case SET_WEATHER_DATA:
      toast.success("Weather data fetched successfully");
      return { ...state, data: action.payload as WeatherResponse };
    case SET_ERROR:
      toast.error(action.payload);
      return { ...state, error: action.payload };
    default:
      return state;
  }
};
