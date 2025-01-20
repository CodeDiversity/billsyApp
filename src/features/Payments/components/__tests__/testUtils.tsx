import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { ReactElement } from "react";
import { rootReducer } from "../../../../store";

export const setupTestStore = (preloadedState = {}) => {
  const store = configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  });

  // Mock the dispatch function
  store.dispatch = jest.fn().mockImplementation(() => ({
    unwrap: () => Promise.resolve({ success: true }),
  }));

  return store;
};

export const withRedux = (component: ReactElement, preloadedState = {}) => {
  const store = setupTestStore(preloadedState);
  return {
    store,
    component: <Provider store={store}>{component}</Provider>,
  };
};
