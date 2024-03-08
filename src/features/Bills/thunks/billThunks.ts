import { createAsyncThunk } from "@reduxjs/toolkit";
import { setBills } from "../slices/billSlice";
import client from "../../../axiosConfig";


export const fetchBills = createAsyncThunk(
  'user/getBills',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const response = await client.get<[]>(`bills`);
      dispatch(setBills(response.data));
    } catch (error) {
      return rejectWithValue("An unexpected error occurred. Please try again.");
    }
  }
);

export const createBill = createAsyncThunk(
  'user/createBill',
  async (bill: any, { dispatch, rejectWithValue }) => {
    try {
      const response = await client.post("bills", bill);
      dispatch(fetchBills());
    } catch (error) {
      return rejectWithValue("An unexpected error occurred. Please try again.");
    }
  }
);
