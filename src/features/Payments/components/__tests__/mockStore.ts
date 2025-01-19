interface MockState {
  // Define your state shape here
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
}); 