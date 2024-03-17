import { useSelector } from "react-redux";
import { selectUserBills } from "../../slices/billSlice";
import { Bill } from "../../types/Bill";
import styled from "@emotion/styled";

export const UpcomingBills = () => {
  const bills: Bill[] = useSelector(selectUserBills);
  const upcomingBills = bills.filter((b) => {
    return new Date(b.dueDate) > new Date();
  }).slice(0, 5);
  return (
    <>
      <StyledHeader>Upcoming Bills</StyledHeader>
      <div>
        {upcomingBills?.map((b) => {
          return (
            <StyledBill key={b.name}>
              <div>
                <StyledParagraphBold>{b.name}</StyledParagraphBold>
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
    </>
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

const StyledParagraphBold = styled(StyledParagraph)`
  margin-bottom: 10px;
  font-weight: bolder;
  font-size: 1.2rem;
`;

const StyledHeader = styled.h2`
  font-size: 2.2rem;
  font-weight: bold;
  margin-top: 20px;
  margin-bottom: 20px;
`;
