import { ReactNode, createContext, useReducer } from "react";
import { OptionType, OptionTypeCity } from '../types';

interface IProps {
  children: ReactNode;
}

const initialState = {
  countries: [],
  states: [],
  cities: [],
  selectedCountry: null,
  selectedState: null,
};

type StateTypes = {
  countries: OptionType[],
  states: OptionType[],
  cities: OptionTypeCity[],
  selectedCountry: string | null,
  selectedState: string | null,
};

type ActionTypes =
  | { type: "SET_COUNTRIES", payload: OptionType[] }
  | { type: "SET_STATES", payload: OptionType[] }
  | { type: "SET_CITIES", payload: OptionTypeCity[] }
  | { type: "SET_SELECTED_COUNTRY", payload: string }
  | { type: "SET_SELECTED_STATES", payload: string };

type DispatchTypes = (action: ActionTypes) => void;

const reducer = (state: StateTypes, action: ActionTypes) => {
  switch (action.type) {
    case "SET_COUNTRIES":
      return {
        ...state,
        countries: action.payload,
      };
    case "SET_STATES":
      return {
        ...state,
        states: action.payload,
      };
    case "SET_CITIES":
      return {
        ...state,
        cities: action.payload,
      };
    case "SET_SELECTED_COUNTRY":
      return {
        ...state,
        selectedCountry: action.payload,
      };
    case "SET_SELECTED_STATES":
      return {
        ...state,
        selectedState: action.payload,
      };
    default:
      return state;
  }
};

const AppContext = createContext<{
  state: StateTypes;
  dispatch: React.Dispatch<ActionTypes>;
}>({ state: initialState, dispatch: () => { } });

function AppProvider({ children }: IProps) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export { AppContext, AppProvider };