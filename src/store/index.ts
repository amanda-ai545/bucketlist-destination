import { configureStore } from '@reduxjs/toolkit';

import countriesReducer from './slices/countries';
import statesReducer from './slices/states';
import citiesReducer from './slices/cities';


const store = configureStore({
  reducer: {
    countries: countriesReducer,
    states: statesReducer,
    cities: citiesReducer,
  }
});

export type AppDispatch = typeof store.dispatch;

export default store;