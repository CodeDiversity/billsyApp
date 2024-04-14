import { useSelector } from "react-redux";
import { selectUserBills } from "../../slices/billSlice";
import { Bill } from "../../types/Bill";
import styled from "@emotion/styled";
import { breakpoints } from "../../../../common/styled";
import { useNavigate } from "react-router-dom";

export const UpcomingBills = () => {
  const bills: Bill[] = useSelector(selectUserBills);
  const navigate = useNavigate();
  const upcomingBills = bills.filter((b) => {
    return new Date(b.dueDate) > new Date();
  }).slice(0, 5);

  const pastDue = bills.filter((b) => {
    return new Date(b.dueDate) < new Date();
  }
  );

  return (
    <>
      {pastDue.length > 0 && (
        <>
          <StyledHeader>
            Past Due Bills
          </StyledHeader>
          <div>
            {pastDue?.map((b) => {
              return (
                <StyledBill onClick={() => navigate('/bills')} key={b.name}>
                  <div>
                    <StyledParagraphBold>{b.name}</StyledParagraphBold>
                    <StyledParagraphRed>
                      Due on{" "}
                      {new Date(b.dueDate).toLocaleDateString("en-us", {
                        weekday: "long",
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </StyledParagraphRed>
                    <StyledParagraph>{b.category}</StyledParagraph>
                  </div>
                  <StyledParagraph>${b.amount.toLocaleString()}</StyledParagraph>
                </StyledBill>
              );
            })}
          </div>
        </>
      )}
      {upcomingBills.length > 0 && (
        <>
          <StyledHeader>Upcoming Bills</StyledHeader>
          <div>
            {upcomingBills?.map((b) => {
              return (
                <StyledBill onClick={() => navigate('/bills')} key={b.name}>
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
      )}
      {upcomingBills.length === 0 && pastDue.length === 0 && (
        <StyledHeader>No upcoming bills</StyledHeader>
      )}
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
  cursor: pointer;
  &:last-child {
    border-bottom: none;
  }
  @media (max-width: ${breakpoints.tablet}) {
    flex-direction: column;
    width: 100%;
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


const StyledParagraphRed = styled(StyledParagraph)`
  color: red;
`;


const StyledHeader = styled.h2`
  font-size: 2.2rem;
  font-weight: bold;
  margin-top: 20px;
  margin-bottom: 20px;
`;


