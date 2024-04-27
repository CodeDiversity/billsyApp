import { createAsyncThunk } from "@reduxjs/toolkit";
import client from "../../../axios/axiosConfig";
import { Payment } from "../types";
import { fetchBills } from "../../Bills/thunks/billThunks";
import { AxiosError } from "axios";

export const createPayment = createAsyncThunk(
  "payments/createPayment",
  async (payment: Payment, { dispatch, rejectWithValue }) => {
    try {
      const response = await client.post("/payment", payment);
      dispatch(fetchBills());
      return response.data;
    } catch (error: any) {
      return rejectWithValue((error as AxiosError).response?.data);
    }
  }
);
