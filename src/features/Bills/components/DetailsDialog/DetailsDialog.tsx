import styled from "@emotion/styled";
import { Dialog } from "@mui/material";
import { Bill } from "../../types/Bill";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { Payment } from '../../../Payments/types/index';
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
            <PaymentDetailsFont>Payments:</PaymentDetailsFont>
            {transFormedPayments?.map((payment: Payment) => {
              console.log(payment.amount, "payment");
              return (
                <Card key={payment.id}>
                    <PaymentDetailsFont>
                      Date Paid: {payment.date as String}
                    </PaymentDetailsFont>
                    <PaymentDetailsFont>
                      Amount: ${payment.amount}
                    </PaymentDetailsFont>
                    <PaymentDetailsFont>
                      Confirmation Number: {payment.confirmationNumber}
                    </PaymentDetailsFont>

                    <PaymentDetailsFont>
                      Note: {payment.note}
                    </PaymentDetailsFont>
                  </Card>
              );
            })}
          </PaymentWrapper>
        </DetailsSection>
      </Wrapper>
    </Dialog>
  );
};

const PaymentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
`;

const PaymentDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

const DetailsFont = styled.p`
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const PaymentDetailsFont = styled(DetailsFont)`
  font-size: 1.2rem;
  margin-right: 1rem;
  padding: 0;
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





