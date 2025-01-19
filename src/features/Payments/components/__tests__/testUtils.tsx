import { Provider } from "react-redux";
import { ReactElement } from "react";

interface MockState {
  bills?: any;
  payments?: any;
  user?: any;
}

export const setupMockStore = (initialState: MockState = {}) => ({
  dispatch: jest.fn().mockImplementation(() => ({
    unwrap: () => Promise.resolve({ success: true }),
  })),
  getState: jest.fn().mockReturnValue(initialState),
  subscribe: jest.fn(),
  replaceReducer: jest.fn(),
  [Symbol.observable]: jest.fn(),
});

export const withRedux = (
  component: ReactElement,
  initialState: MockState = {}
) => {
  const store = setupMockStore(initialState);
  return {
    store,
    component: <Provider store={store}>{component}</Provider>,
  };
};
