import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import * as constant from '../../constant';
import { IGlobalCountries } from '../../models/index.model';

export const name = "countries";

export const getAllCountries = createAsyncThunk(
  `${name}/getAllCountries`,

  async () => {
    try {
      const { data } = await axios.get(`${constant.API_URL}countries`, {
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

const initialState: IGlobalCountries = {
  countries: [],
  loading: "",
};

const countrySlice = createSlice({
  name,
  initialState,
  reducers: {},
  extraReducers: {
    [`${getAllCountries.pending}`]: (state: IGlobalCountries) => {
      state.loading = constant.HTTP_STATUS.PENDING;

      console.log("pending", state)
    },
    [`${getAllCountries.fulfilled}`]: (state: IGlobalCountries, { payload }) => {
      state.loading = constant.HTTP_STATUS.FULFILLED;
      state.countries = payload;

      console.log("fulfilled", state)
    },
    [`${getAllCountries.rejected}`]: (state: IGlobalCountries) => {
      state.loading = constant.HTTP_STATUS.REJECTED;

      console.log("pending", state)
    }
  }
});

export default countrySlice.reducer;