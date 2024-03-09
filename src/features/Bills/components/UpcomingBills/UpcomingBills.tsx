import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUserBills } from "../../slices/billSlice";
import { Bill } from "../../types/billTypes";
import styled from "@emotion/styled";

export const UpcomingBills = () => {
  const bills: Bill[] = useSelector(selectUserBills).slice(0, 5)
  return (
    <div>
      <StyledHeader>Upcoming Bills</StyledHeader>
      <div>
        {bills?.map((b) => {
          return (
            <StyledBill key={b.name}>
              <div>
                <StyledParagraph>{b.name}</StyledParagraph>
                <StyledParagraph>
                  Due on{" "}
                  {new Date(b.dueDate).toLocaleDateString("en-us", {
                    weekday: "long",
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </StyledParagraph>
                <StyledParagraph>{b.category}</StyledParagraph>
              </div>
              <StyledParagraph>${b.amount.toLocaleString()}</StyledParagraph>
            </StyledBill>
          );
        })}
      </div>
    </div>
  );
};

const StyledBill = styled.div`
  display: flex;
  width: 50%;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid #ccc;
  margin-bottom: 10px;
  &:last-child {
    border-bottom: none;
  }
`;

const StyledParagraph = styled.p`
  margin-bottom: 10px;
`;

const StyledHeader = styled.h2`
  font-size: 2rem;
  font-weight: bold;
  margin-top: 20px;
  margin-bottom: 20px;
`;
