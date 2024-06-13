/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, Dispatch } from "react";
import { SET_ERROR, SET_LOADING, SET_WEATHER_DATA } from "./actions";

export const WeatherContext = createContext<{
  state: Record<string, any>;
  dispatch: Dispatch<Action>;
}>({
  state: {},
  dispatch: () => {},
});

type State = { loading: string; error: string | null; data: any };
type Action = { type: string; payload?: any };

export const initialState: State = { loading: "IDLE", error: null, data: null };

export const weatherReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case SET_LOADING:
      return { ...state, loading: action.payload };
    case SET_WEATHER_DATA:
      return { ...state, data: action.payload };
    case SET_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};
