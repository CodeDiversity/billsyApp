import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { ReactElement } from "react";
import { rootReducer } from "../../../../store";

interface TestStoreOptions {
  preloadedState?: any;
  mockDispatch?: boolean;
}

export const setupTestStore = ({
  preloadedState = {},
  mockDispatch = false,
}: TestStoreOptions = {}) => {
  const store = configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  });

  if (mockDispatch) {
    store.dispatch = jest.fn().mockImplementation(() => ({
      unwrap: () => Promise.resolve({ success: true }),
    }));
  }

  return store;
};

export const withRedux = (
  component: ReactElement,
  options: TestStoreOptions = {}
) => {
  const store = setupTestStore(options);
  return {
    store,
    component: <Provider store={store}>{component}</Provider>,
  };
};
