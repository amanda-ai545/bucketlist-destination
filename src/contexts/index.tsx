import { ReactNode, createContext, useReducer } from 'react';
import { OptionType, OptionTypeCity } from '../types';

interface IProps {
  children: ReactNode;
};

const initialState = {
  countries: [],
  states: [],
  cities: [],
};

type StateTypes = {
  countries: OptionType[],
  states: OptionType[],
  cities: OptionTypeCity[],
};

type ActionTypes =
  | { type: "SET_COUNTRIES", payload: OptionType[] }
  | { type: "SET_STATES", payload: OptionType[] }
  | { type: "SET_CITIES", payload: OptionTypeCity[] };

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
    default:
      return state;
  };
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
};

export { AppContext, AppProvider };