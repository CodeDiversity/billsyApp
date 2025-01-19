import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CreatePayment } from "../CreatePayment";
import { toast } from "react-toastify";
import { withRedux } from "./testUtils";

// Mock the dependencies
jest.mock("react-toastify", () => ({
  toast: {
    success: jest.fn(),
  },
}));

// Mock the MUI DatePicker
jest.mock("@mui/x-date-pickers", () => ({
  DatePicker: ({ value, onChange }: any) => (
    <input
      type="date"
      value={value?.toISOString().split("T")[0] || ""}
      onChange={(e) => onChange(new Date(e.target.value))}
      data-testid="date-picker"
    />
  ),
}));

// Mock the thunks
jest.mock("../../thunks/paymentThunks", () => ({
  createPayment: jest.fn(() => ({
    type: "payments/createPayment/fulfilled",
  })),
}));

jest.mock("../../../Bills/thunks/billThunks", () => ({
  payBill: jest.fn(() => ({
    type: "bills/payBill/fulfilled",
    unwrap: () => Promise.resolve({ success: true }),
  })),
}));

// Get references to the mocks after they're created
const createPaymentMock = jest.requireMock(
  "../../thunks/paymentThunks"
).createPayment;
const payBillMock = jest.requireMock(
  "../../../Bills/thunks/billThunks"
).payBill;

describe("CreatePayment", () => {
  const mockBill = {
    _id: "123",
    name: "Test Bill",
    amount: 100,
    dueDate: new Date("2024-03-20"),
    category: "Utilities",
  };

  const mockSetOpen = jest.fn();

  const renderComponent = () => {
    const { component } = withRedux(
      <CreatePayment open={true} setOpen={mockSetOpen} bill={mockBill} />,
      {
        bills: { items: [mockBill] },
      }
    );
    render(component);
  };

  it("renders the component with initial values", () => {
    renderComponent();

    expect(screen.getByText("Add Payment Details")).toBeInTheDocument();
    expect(
      screen.getByText(`Enter optional details for ${mockBill.name} payment`)
    ).toBeInTheDocument();

    // Check if initial amount is set
    const amountInput = screen.getByLabelText("Amount") as HTMLInputElement;
    expect(amountInput.value).toBe(mockBill.amount.toString());
  });

  it("closes the dialog when clicking the close button", () => {
    renderComponent();

    const closeButton = screen.getByTestId("CloseIcon").parentElement;
    fireEvent.click(closeButton!);

    expect(mockSetOpen).toHaveBeenCalledWith(false);
  });

  it("updates form values when inputs change", async () => {
    renderComponent();

    const confirmationInput = screen.getByLabelText(
      "Confirmation Number"
    ) as HTMLInputElement;
    const noteInput = screen.getByLabelText("Note") as HTMLInputElement;

    await act(async () => {
      userEvent.type(confirmationInput, "12345");
      userEvent.type(noteInput, "Test note");
    });

    expect(confirmationInput.value).toBe("12345");
    expect(noteInput.value).toBe("Test note");
  });

  it("submits the form with correct values and calls API", async () => {
    renderComponent();

    const confirmationInput = screen.getByLabelText("Confirmation Number");
    const noteInput = screen.getByLabelText("Note");
    const datePicker = screen.getByTestId("date-picker");
    const submitButton = screen.getByText("Create Payment");

    await act(async () => {
      userEvent.type(confirmationInput, "12345");
      userEvent.type(noteInput, "Test note");
      fireEvent.change(datePicker, { target: { value: "2024-03-25" } });
      fireEvent.click(submitButton);
    });

    await waitFor(() => {
      expect(createPaymentMock).toHaveBeenCalled();
      expect(payBillMock).toHaveBeenCalledWith(mockBill._id);
      expect(mockSetOpen).toHaveBeenCalledWith(false);
      expect(toast.success).toHaveBeenCalledWith("Bill Paid");
    });
  });

  it("handles amount changes correctly", async () => {
    renderComponent();

    const amountInput = screen.getByLabelText("Amount") as HTMLInputElement;
    await act(async () => {
      userEvent.clear(amountInput);
      userEvent.type(amountInput, "200");
    });

    expect(amountInput.value).toBe("200");
  });

  it("handles date changes correctly", async () => {
    renderComponent();

    const datePicker = screen.getByTestId("date-picker") as HTMLInputElement;
    await act(async () => {
      fireEvent.change(datePicker, { target: { value: "2024-03-25" } });
    });

    expect(datePicker.value).toBe("2024-03-25");
  });
});
