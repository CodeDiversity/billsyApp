import useUpcomingBills from "./useUpcomingBills";
import { renderHookWithProviders } from "../../../../../utils/test-utils";
import dayjs from "dayjs";
import { Bill } from "../../../types/Bill";

describe("useUpcomingBills", () => {
  const bills: Bill[] = [
    {
      _id: '1',
      name: "Rent",
      amount: 1000,
      dueDate: dayjs().add(7, "days").toISOString(),
      paid: false,
      category: ""
    },
    {
      _id: '2',
      name: "Electricity",
      amount: 100,
      dueDate: dayjs().subtract(7, "days").toISOString(),
      paid: false,
      category: ""
    },
    {
      _id: '3',
      name: "Internet",
      amount: 50,
      dueDate: dayjs().add(14, "days").toISOString(),
      paid: true,
      category: ""
    },
  ];

  it("should filter upcoming bills correctly", () => {
    const { result } = renderHookWithProviders(() => useUpcomingBills(), {
      preloadedState: { bill: { bills, error: "" } },
    });
    const { upcomingBills } = result.current;
    expect(upcomingBills).toHaveLength(1);
    expect(upcomingBills[0]._id).toBe('1');
  });

  it("should filter past due bills correctly", () => {
    const { result } = renderHookWithProviders(() => useUpcomingBills(), {
      preloadedState: { bill: { bills, error: "" } },
    });
    const { pastDueBills } = result.current;
    expect(pastDueBills).toHaveLength(1);
    expect(pastDueBills[0]._id).toBe('2');
  });

  it("should not include paid bills in upcoming or past due bills", () => {
    const { result } = renderHookWithProviders(() => useUpcomingBills(), {
      preloadedState: { bill: { bills, error: "" } },
    });
    const { upcomingBills, pastDueBills } = result.current;
    expect(upcomingBills.find((bill: Bill) => bill.paid)).toBeUndefined();
    expect(pastDueBills.find((bill: Bill) => bill.paid)).toBeUndefined();
  });
});
