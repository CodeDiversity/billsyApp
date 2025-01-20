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
  createPayment: jest.fn((payment) => ({
    unwrap: () => Promise.resolve({ success: true }),
  })),
}));

jest.mock("../../../Bills/thunks/billThunks", () => ({
  payBill: jest.fn((id) => ({
    unwrap: () => Promise.resolve({ success: true }),
  })),
}));

describe("CreatePayment", () => {
  const mockBill = {
    _id: "123",
    name: "Test Bill",
    amount: 100,
    dueDate: new Date("2024-03-20"),
    category: "Utilities",
  };

  const mockSetOpen = jest.fn();

  const renderComponent = (mockDispatch = false) => {
    const { component } = withRedux(
      <CreatePayment open={true} setOpen={mockSetOpen} bill={mockBill} />,
      {
        preloadedState: { bill: { items: [mockBill] } },
        mockDispatch,
      }
    );
    return render(component);
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the component with initial values", () => {
    renderComponent();

    expect(screen.getByText("Add Payment Details")).toBeInTheDocument();
    expect(
      screen.getByText(`Enter optional details for ${mockBill.name} payment`)
    ).toBeInTheDocument();

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

    const confirmationInput = screen.getByLabelText("Confirmation Number");
    const noteInput = screen.getByLabelText("Note");

    await act(async () => {
      userEvent.type(confirmationInput, "12345");
      userEvent.type(noteInput, "Test note");
    });

    expect(confirmationInput).toHaveValue("12345");
    expect(noteInput).toHaveValue("Test note");
  });

  it("submits the form with correct values", async () => {
    renderComponent(true);

    await userEvent.type(screen.getByLabelText("Confirmation Number"), "12345");
    await userEvent.type(screen.getByLabelText("Note"), "Test note");
    fireEvent.change(screen.getByTestId("date-picker"), {
      target: { value: "2024-03-25" },
    });

    await userEvent.click(screen.getByText("Create Payment"));

    await waitFor(() => {
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

    expect(amountInput).toHaveValue(200);
  });

  it("handles date changes correctly", async () => {
    renderComponent();

    const datePicker = screen.getByTestId("date-picker") as HTMLInputElement;
    await act(async () => {
      fireEvent.change(datePicker, { target: { value: "2024-03-25" } });
    });

    expect(datePicker).toHaveValue("2024-03-25");
  });
});
