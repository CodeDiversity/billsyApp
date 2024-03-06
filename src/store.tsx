// src/app/store.js
import { configureStore } from "@reduxjs/toolkit";
import userSlice from './features/Authentication/slices/userSlice';
import billSlice from "./features/Bills/slices/billSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    bill: billSlice
  },
  });


// Type for the dispatch function
export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;