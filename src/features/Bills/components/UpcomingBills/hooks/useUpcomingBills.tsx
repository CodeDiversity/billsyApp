import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import dayjs from "dayjs";
import { selectUserBills } from "../../../slices/billSlice";
import { Bill } from "../../../types/Bill";

const useUpcomingBills = () => {
  const bills: Bill[] = useSelector(selectUserBills);
  const [upcomingBills, setUpcomingBills] = useState<Bill[]>([]);
  const [pastDueBills, setPastDueBills] = useState<Bill[]>([]);

  useEffect(() => {
    const today = dayjs();
    const upcoming = bills.filter(
      (bill) => dayjs(bill.dueDate).isAfter(today) && !bill.paid
    );
    const pastDue = bills.filter(
      (bill) => dayjs(bill.dueDate).isBefore(today) && !bill.paid
    );
    setUpcomingBills(upcoming);
    setPastDueBills(pastDue);
  }, [bills]);

  return { upcomingBills, pastDueBills };
};

export default useUpcomingBills;
