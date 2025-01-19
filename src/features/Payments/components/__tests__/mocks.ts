export const mockThunks = () => {
  const createPaymentMock = jest.fn().mockImplementation((payment) => {
    return () => Promise.resolve({
      type: "payments/createPayment/fulfilled",
      payload: { id: "123", amount: payment.amount },
    });
  });

  const payBillMock = jest.fn().mockReturnValue({
    unwrap: () => Promise.resolve({ success: true }),
  });

  const mockDispatch = jest.fn().mockImplementation((action) => {
    if (action === payBillMock()) {
      return action;
    }
    return Promise.resolve(action);
  });

  return { createPaymentMock, payBillMock, mockDispatch };
};
