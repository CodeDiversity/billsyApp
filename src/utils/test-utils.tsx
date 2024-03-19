import React, { PropsWithChildren } from "react";
import { render, renderHook } from "@testing-library/react";
import type { RenderOptions } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MockRouter from "./mockRouter";

import { setupStore, type AppStore, type RootState } from "../store";
// As a basic setup, import your same slice reducers
import userReducer from "../features/Authentication/slices/userSlice";
import billReducer from "../features/Bills/slices/billSlice";

// This type interface extends the default options for render from RTL, as well
// as allows the user to specify other things such as initialState, store.
interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {
  preloadedState?: Partial<RootState>;
  store?: AppStore;
}

export function renderWithProviders(
  ui: React.ReactElement,
  extendedRenderOptions: ExtendedRenderOptions = {}
) {
  const {
    preloadedState = {},
    // Automatically create a store instance if no store was passed in
    store = setupStore(preloadedState),
    ...renderOptions
  } = extendedRenderOptions;

  const Wrapper = ({ children }: PropsWithChildren) => (
    <MockRouter>
      <Provider store={store}> {children} </Provider>
    </MockRouter>
  );

  // Return an object with the store and all of RTL's query functions
  return {
    store,
    ...render(ui, { wrapper: Wrapper, ...renderOptions }),
  };
}

export function renderHookWithProviders(
  callback: (...args: any[]) => any,
  extendedRenderOptions: ExtendedRenderOptions = {}
) {
  const { preloadedState = {}, store = setupStore(preloadedState) } =
    extendedRenderOptions;

  const Wrapper = ({ children }: PropsWithChildren) => (
    <MockRouter>
      <Provider store={store}> {children} </Provider>
    </MockRouter>
  );

  return renderHook(callback, { wrapper: Wrapper });
}
