import { createPayment } from "../paymentThunks";
import client from "../../../../axios/axiosConfig";

jest.mock("../../../../axios/axiosConfig");

describe("paymentThunks", () => {
  it("createPayment calls the API with correct data", async () => {
    const mockPayment = {
      amount: 100,
      confirmationNumber: "12345",
      note: "Test note",
      bill: "bill_123",
      date: new Date(),
    };

    const mockDispatch = jest.fn();
    const mockGetState = jest.fn();
    const mockExtra = {};

    await createPayment(mockPayment)(mockDispatch, mockGetState, mockExtra);

    expect(client.post).toHaveBeenCalledWith("/payment", mockPayment);
  });
}); 