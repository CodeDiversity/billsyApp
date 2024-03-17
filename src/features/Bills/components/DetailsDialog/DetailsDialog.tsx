import styled from "@emotion/styled";
import { Dialog } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { useFormik } from "formik";
import { useMemo } from "react";
import { useAppDispatch } from "../../../../hooks/hooks";
import { createPayment } from "../../../Payments/thunks/paymentThunks";
import { Payment } from "../../../Payments/types";
import { payBill } from "../../thunks/billThunks";
import { Bill } from "../../types/Bill";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

interface CreatePaymentProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  bill: Bill;
}

export const DetailsDialog = ({ open, setOpen, bill }: CreatePaymentProps) => {
  // useform with amount, confirmationNumber and note
  const initialValues = useMemo(() => {
    const date = new Date(bill.dueDate);
    return {
      amount: bill.amount,
      confirmationNumber: "",
      note: "",
      date: date as Date,
    };
  }, [bill]);
  console.log(bill, "bill from create payment");
  const dispatch = useAppDispatch();
  const date = new Date(bill.dueDate);

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
      </Wrapper>
    </Dialog>
  );
};

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

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 40%;
  padding: 2rem;
  border-radius: 4px;
`;

const Header = styled.h2`
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 1rem;
  margin-left: 2%;
  padding-top: 2rem;
`;

const InputSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Input = styled.input`
  padding: 16px;
  border-radius: 0.5rem;
  border: 1px solid #ddd;
  width: 93%;
  margin-left: 5px;
  margin-top: 10px;
`;

const SubmitButton = styled.button`
  padding: 0.5rem;
  border-radius: 4px;
  border: none;
  background-color: #007bff;
  color: white;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;
  &:hover {
    background-color: #0056b3;
  }
`;

const StyledError = styled.div`
  color: red;
  font-size: 0.875rem;
  font-weight: 800;
`;
