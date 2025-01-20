// src/app/store.js
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from './features/Authentication/slices/userSlice';
import billReducer from "./features/Bills/slices/billSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    bill: billReducer,
  },
});


export const rootReducer = combineReducers({
  user: userReducer,
  bill: billReducer,
});


export function setupStore(preloadedState = {}) {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
}


// Type for the dispatch function
export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];