import React, { useState } from "react";
import { LoggedInLayout } from "../../../../common/Layouts/LoggedInLayout";
import styled from "@emotion/styled";
import { getErrorMessage } from "../../../../common/errorMessages";
import client from "../../../../axiosConfig";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { makeStyles } from "@mui/material";

interface Bill {
  name: string;
  amount: number;
  dueDate: Date;
  isPaid: boolean;
  category: string;
  lastPaidAt?: Date;
}

interface FormValues {
  name: string;
  amount: number;
  category: string;
}

// const useStyles = makeStyles({
//   root: {
//     "& .MuiOutlinedInput-input": {
//       border: 0,
//       borderRadius: 3,
//       color: "red",
//       fontSize: 24,
//     },
//   },
// });

export const CreateBill = () => {
  //TODO style date to match the rest or remove MUI date picker.
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [date, setDate] = useState<Date | Dayjs | null>(dayjs(new Date()));
  const formik = useFormik<FormValues>({
    initialValues: {
      name: "",
      amount: 0,
      category: "",
    },
    onSubmit: (values: any) => {
      console.log(values);
      console.log(date?.toString());
      const bill: Bill = {
        name: values.name,
        amount: values.amount,
        dueDate: date as Date,
        isPaid: false,
        category: values.category,
      };
      client
        .post("bills", bill)
        .then((response) => {
          console.log(response);
          navigate("/bills");
        })
        .catch((error) => {
          console.error(error);
          if (error.response.data?.code) {
            setError(getErrorMessage(error.response.data.code));
          } else {
            setError("An unexpected error occurred. Please try again.");
          }
        });
    },
    validate: (values) => {
      const errors: FormErrors = {};

      return errors;
    },
  });
  return (
    <LoggedInLayout>
      <Wrapper>
        <Header>Add New Bill</Header>
        <Form onSubmit={formik.handleSubmit}>
          <InputSection>
            <label htmlFor="name">Name</label>
            <Input
              id="name"
              name="name"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.name}
              placeholder="Enter bill name"
            />
            {formik.errors.name ? (
              <StyledError>{formik.errors.name}</StyledError>
            ) : null}
          </InputSection>
          <InputSection>
            <label htmlFor="amount">Amount</label>
            <Input
              id="amount"
              name="amount"
              type="number"
              data-type="currency"
              min="0.01"
              step="0.01"
              max="100000"
              onChange={formik.handleChange}
              value={formik.values.amount}
              placeholder="$0.00"
            />
            {formik.errors.amount ? (
              <StyledError>{formik.errors.amount}</StyledError>
            ) : null}
          </InputSection>
          <InputSection>
            <label htmlFor="category">Category</label>
            <Input
              id="category"
              name="category"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.category}
              placeholder="Enter category"
            />
            {formik.errors.category ? (
              <StyledError>{formik.errors.category}</StyledError>
            ) : null}
          </InputSection>
          <InputSection>
            <label htmlFor="dueDate">Due Date</label>
            <DatePicker
              data-testId="dueDate"
              name="dueDate"
              value={date}
              onChange={(date) => setDate(date)}
              sx={{
                borderRadius: "0.5rem",
                width: "100%",
                marginLeft: "5px",
                marginTop: "10px",
                fontFamily: "Montserrat, sans-serif",
                fontSize: "10px",
              }}
            />
            {/* {formik.errors.dueDate ? (
              <StyledError>{formik.errors.name}</StyledError>
            ) : null} */}
          </InputSection>
          <SubmitButton type="submit">Submit</SubmitButton>
          {error && <StyledError>{error}</StyledError>}
        </Form>
      </Wrapper>
    </LoggedInLayout>
  );
};

const Wrapper = styled.section`
  display: flex;
  height: 100vh;
  flex-direction: column;
  align-items: flex-start;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 40%;
  padding: 2rem;
  border-radius: 4px;
`;

const Header = styled.h1`
  text-align: center;
  font-size: 2rem;
  margin-bottom: 1rem;
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

interface FormErrors {}

/*

 userId: { type: ObjectId, required: true, ref: 'User' },
  name: { type: String, required: true },
  amount: { type: Number, required: true },
  dueDate: { type: Date },
  isPaid: { type: Boolean, required: true, default: false },
  created: { type: Date, default: Date.now },
  isRecurring: { type: Boolean, required: true, default: false },
  category: { type: String },
  createdAt: { type: Date, default: Date.now },
  lastPaidAt: { type: Date },

*/
