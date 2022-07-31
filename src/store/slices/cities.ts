import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import * as constant from '../../constant';
import { IGlobalCities } from '../../models/index.model';

export const name = "cities";

type DatasType = {
  countryISO2: string,
  stateISO2: string,
}

export const getAllCities = createAsyncThunk(
  `${name}/getAllCities`,

  async (datas: DatasType) => {
    // const {
    //   countryISO2,
    //   stateISO2
    // } = data
    console.log("datasssssss", datas)

    try {
      const { data } = await axios.get(`${constant.API_URL}countries/${datas.countryISO2}/states/${datas.stateISO2}/cities`, {
        // const { data } = await axios.get(`${constant.API_URL}countries/IN/states/MH/cities`, {
        method: 'GET',
        headers: {
          [`${constant.API_NAME}`]: `${constant.API_KEY}`,
        },
      });
      return data;
    } catch (err) {
      console.log(err)
    }
  }
);

const initialState: IGlobalCities = {
  cities: [],
  loading: "",
};

const citiesSlice = createSlice({
  name,
  initialState,
  reducers: {},
  extraReducers: {
    [`${getAllCities.pending}`]: (state: IGlobalCities) => {
      state.loading = constant.HTTP_STATUS.PENDING;

      console.log("pending", state)
    },
    [`${getAllCities.fulfilled}`]: (state: IGlobalCities, { payload }) => {
      state.loading = constant.HTTP_STATUS.FULFILLED;
      state.cities = payload;

      console.log("fulfilled", state)
    },
    [`${getAllCities.rejected}`]: (state: IGlobalCities) => {
      state.loading = constant.HTTP_STATUS.REJECTED;

      console.log("pending", state)
    }
  }
});

export default citiesSlice.reducer;