import { createAsyncThunk } from "@reduxjs/toolkit";
import { setBills } from "../slices/billSlice";
import client from "../../../axios/axiosConfig";


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
      await client.post("bills", bill);
      dispatch(fetchBills());
    } catch (error) {
      return rejectWithValue("An unexpected error occurred. Please try again.");
    }
  }
);

export const deleteBillSoft = createAsyncThunk(
  'user/deleteBillSoft',
  async (id: string, { dispatch, rejectWithValue }) => {
    try {
      await client.patch(`bills/delete/${id}`);
      dispatch(fetchBills()).unwrap();
    } catch (error) {
      return rejectWithValue("An unexpected error occurred. Please try again.");
    }
  }
);

export const editBill = createAsyncThunk(
  'user/editBill',
  async (bill: any, { dispatch, rejectWithValue }) => {
    try {
      await client.patch(`bills/${bill._id}`, bill);
      dispatch(fetchBills()).unwrap();
    } catch (error) {
      return rejectWithValue("An unexpected error occurred. Please try again.");
    }
  }
);

export const payBill = createAsyncThunk(
  'user/payBill',
  async (id: string, { dispatch, rejectWithValue }) => {
    try {
      await client.patch(`bills/paid/${id}`);
      dispatch(fetchBills()).unwrap();
    } catch (error) {
      return rejectWithValue("An unexpected error occurred. Please try again.");
    }
  }
);
