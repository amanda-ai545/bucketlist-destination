import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import * as constant from '../../constant';
import { IGlobalStates } from '../../models/index.model';

export const name = "states";

export const getAllStates = createAsyncThunk(
  `${name}/getAllStates`,

  async (iso2: string) => {
    try {
      const { data } = await axios.get(`${constant.API_URL}countries/${iso2}/states`, {
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

const initialState: IGlobalStates = {
  states: [],
  loading: "",
};

const statesSlice = createSlice({
  name,
  initialState,
  reducers: {},
  extraReducers: {
    [`${getAllStates.pending}`]: (state: IGlobalStates) => {
      state.loading = constant.HTTP_STATUS.PENDING;

      console.log("pending", state)
    },
    [`${getAllStates.fulfilled}`]: (state: IGlobalStates, { payload }) => {
      state.loading = constant.HTTP_STATUS.FULFILLED;
      state.states = payload;

      console.log("fulfilled", state)
    },
    [`${getAllStates.rejected}`]: (state: IGlobalStates) => {
      state.loading = constant.HTTP_STATUS.REJECTED;

      console.log("pending", state)
    }
  }
});

export default statesSlice.reducer;