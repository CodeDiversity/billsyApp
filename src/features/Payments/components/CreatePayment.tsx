import { Dialog } from "@mui/material";
import { Bill } from "../../Bills/types/Bill";
import { Delete } from "@mui/icons-material";
import { useFormik } from "formik";
import styled from "@emotion/styled";
import { DatePicker } from "@mui/x-date-pickers";
import { useAppDispatch } from "../../../hooks/hooks";
import { createPayment } from "../thunks/paymentThunks";
import { Payment } from "../types";
import { payBill } from "../../Bills/thunks/billThunks";
import { useMemo } from "react";
import { toast } from "react-toastify";

interface CreatePaymentProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  bill: Bill;
}

export const CreatePayment = ({ open, setOpen, bill }: CreatePaymentProps) => {
  // useform with amount, confirmationNumber and note
  const initialValues =  useMemo(() => {
    const date = new Date(bill.dueDate)
    return {
      amount: bill.amount,
      confirmationNumber: "",
      note: "",
      date: date as Date,
    }
  }, [bill])
  console.log(bill, "bill from create payment");
  const dispatch = useAppDispatch();
  const date = new Date(bill.dueDate)

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (values: any) => {
      const payment: Payment = {
        amount: values.amount,
        confirmationNumber: values.confirmationNumber,
        note: values.note,
        bill: bill._id,
        date: values.dueDate || new Date(),
      };
      dispatch(createPayment(payment));
      dispatch(payBill(bill._id!)).unwrap();
      setOpen(false);
      toast.success("Bill Paid");
    },
    enableReinitialize: true,
  });
  return (
    <Dialog open={open} maxWidth="md" fullWidth={true}>
      <Wrapper>
        <Header>Add Payment Details</Header>
        <Form onSubmit={formik.handleSubmit}>
          <p>Enter optional details for {bill.name} payment</p>
          <label htmlFor="amount">Amount</label>
          <Input
            type="number"
            id="amount"
            name="amount"
            value={formik.values.amount}
            onChange={formik.handleChange}
          />
          <label htmlFor="date">Date Paid</label>
          <DatePicker
            value={formik.values.date}
            sx={{ borderRadius: "0.5rem", fontFamily: "inherit" }}
            onChange={(value) => formik.setFieldValue("date", value, true)}
            slotProps={{
              textField: {
                variant: "outlined",
              },
            }}
          />
          <label htmlFor="confirmationNumber">Confirmation Number</label>
          <Input
            type="text"
            id="confirmationNumber"
            name="confirmationNumber"
            value={formik.values.confirmationNumber}
            onChange={formik.handleChange}
          />
          <label htmlFor="note">Note</label>
          <Input
            type="text"
            id="note"
            name="note"
            value={formik.values.note}
            onChange={formik.handleChange}
          />
          <SubmitButton type="submit">Create Payment</SubmitButton>
        </Form>
      </Wrapper>
    </Dialog>
  );
};

const Wrapper = styled.section`
  display: flex;
  height: 100vh;
  flex-direction: column;
  align-items: center;
  padding-top: 2rem;
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
