import styled from "@emotion/styled";
import { Dialog } from "@mui/material";
import { Bill } from "../../types/Bill";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { Payment } from "../../../Payments/types/index";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

interface CreatePaymentProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  bill: Bill;
}

export const DetailsDialog = ({ open, setOpen, bill }: CreatePaymentProps) => {
  const transformedDate = new Date(bill.dueDate).toLocaleDateString();
  const transFormedPayments = bill.payments?.map((payment) => {
    console.log(payment, "payment");
    return {
      ...payment,
      date: new Date(payment.date).toLocaleDateString(),
    };
  });
  const sumOfPayments = bill.payments?.reduce((acc, payment) => {
    return acc + (payment.amount ?? 0);
  }, 0);
  return (
    <Dialog open={open} maxWidth="md" fullWidth={true}>
      <Wrapper>
        <DisplayFlex>
          <div></div>
          <Header>{bill.name}</Header>
          <CloseOutlinedIcon
            sx={{
              height: "40px",
              width: "40px",
              marginRight: "10px",
              cursor: "pointer",
            }}
            onClick={() => setOpen(false)}
          />
        </DisplayFlex>
        <DetailsSection>
          <DetailsFont>Next Due Date: {transformedDate}</DetailsFont>
          <DetailsFont>Amount: ${bill.amount}</DetailsFont>
          <DetailsFont>Total Payments: {bill.payments?.length}</DetailsFont>
          <DetailsFont>Total Amount Paid: ${sumOfPayments} </DetailsFont>
          <PaymentWrapper>
            <PaymentDetailsFontBold>
              {transFormedPayments?.length ? "Payments" : ""}
            </PaymentDetailsFontBold>
            <PaymentsDiv>
              {transFormedPayments?.map((payment: Payment) => {
                console.log(payment.amount, "payment");
                return (
                  <Card
                    key={payment.id}
                    sx={{
                      width: "43%",
                      padding: "1rem",
                    }}
                  >
                    <PaymentDetailsFont>
                      <BoldSpan>Date Paid: </BoldSpan>
                      {payment.date as String}
                    </PaymentDetailsFont>
                    <PaymentDetailsFont>
                      <BoldSpan> Amount: </BoldSpan>${payment.amount}
                    </PaymentDetailsFont>
                    <PaymentDetailsFont>
                      <BoldSpan>Confirmation Number:</BoldSpan>{" "}
                      {payment.confirmationNumber}
                    </PaymentDetailsFont>

                    <PaymentDetailsFont>
                      Note: {payment.note}
                    </PaymentDetailsFont>
                  </Card>
                );
              })}
            </PaymentsDiv>
          </PaymentWrapper>
        </DetailsSection>
      </Wrapper>
    </Dialog>
  );
};

const PaymentsDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  padding: 1rem;
`;

const PaymentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
  margin-left: 1rem;
`;

const DetailsFont = styled.p`
  font-size: 1.2rem;
  margin-bottom: 1rem;
  margin-left: 1rem;
`;

const PaymentDetailsFont = styled.div`
  font-size: 1.2rem;
  padding: 0;
  line-height: 1.5;
`;

const PaymentDetailsFontBold = styled(PaymentDetailsFont)`
  font-weight: bold;
`;

const BoldSpan = styled.span`
  font-weight: 900;
  margin-right: "100px";
`;

const DetailsSection = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const DisplayFlex = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const Wrapper = styled.section`
  display: flex;
  height: 100vh;
  flex-direction: column;
  align-items: center;
  background-color: #f8f9fa;
`;

const Header = styled.h2`
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 1rem;
  margin-left: 2%;
  padding-top: 2rem;
`;
