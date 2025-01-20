import { createAsyncThunk } from "@reduxjs/toolkit";
import client from "../../../axios/axiosConfig";
import { fetchBills } from "../../Bills/thunks/billThunks";

export const createPayment = createAsyncThunk(
  "payments/createPayment",
  async (payment: Payment, { dispatch, rejectWithValue }) => {
    try {
      const response = await client.post("/payment", payment);
      dispatch(fetchBills());
      return response.data;
    } catch (error: any) {
      console.error("CreatePayment Error:", error);
      return rejectWithValue(error.response?.data || "Payment creation failed");
    }
  }
);
