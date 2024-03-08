import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUserBills } from "../../slices/billSlice";
import { Bill } from "../../types/billTypes";

export const UpcomingBills = () => {
  const bills: Bill[] = useSelector(selectUserBills);
  useEffect(() => {
    console.log(bills);
  }, [bills]);
  return (
    <div>
      <h1>Upcoming Bills</h1>
      <div>
        {bills?.map((b) => {
          return (
            <div key={b.name}>
              <p>{b.name}</p>
              <p>{b.amount}</p>
              <p>
                {new Date(b.dueDate).toLocaleDateString("en-us", {
                  weekday: "long",
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </p>
              <p>{b.category}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
