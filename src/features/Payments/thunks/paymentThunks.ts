import { createAsyncThunk } from "@reduxjs/toolkit";
import client from "../../../axios/axiosConfig";
import { Payment } from "../types";
import { fetchBills } from "../../Bills/thunks/billThunks";

export const createPayment = createAsyncThunk(
  "payments/createPayment",
  async (payment: Payment, { dispatch }) => {
    try {
      const response = await client.post("/payment", payment);
      dispatch(fetchBills());
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);
