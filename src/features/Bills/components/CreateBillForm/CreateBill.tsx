import { useState } from "react";
import { LoggedInLayout } from "../../../../common/Layouts/LoggedInLayout";
import styled from "@emotion/styled";
import { getErrorMessage } from "../../../../common/errorMessages";
import client from "../../../../axiosConfig";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { selectCategories } from "../../../Authentication/slices/userSlice";
import { useSelector } from "react-redux";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { InputLabel, MenuItem } from "@mui/material";
import TextField from "@mui/material/TextField";

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
  dueDate: Date;
}

export const CreateBill = () => {
  const categories = useSelector(selectCategories);
  //TODO style date to match the rest or remove MUI date picker.
  const navigate = useNavigate();
  const [resError, setResError] = useState("");
  const [formErrors, setFormErrors] = useState({
    name: "",
    amount: "",
    category: "",
    dueDate: "",
  });
  const validateForm = () => {
    let error = false;
    let errors = {
      name: "",
      amount: "",
      category: "",
      dueDate: "",
    };
    if (!formik.values.name) {
      errors.name = "Name is required";
      error = true;
    }
    if (!formik.values.amount) {
      errors.amount = "Amount is required";
      error = true;
    }
    if (!formik.values.category) {
      errors.category = "Category is required";
      error = true;
    }
    if (!formik.values.dueDate) {
      errors.dueDate = "Due date is required";
      error = true;
    }
    if (!error) {
      setFormErrors({
        name: "",
        amount: "",
        category: "",
        dueDate: "",
      });
      return true;
    } else {
      setFormErrors(errors);
      return false;
    }
  };
  const formik = useFormik<FormValues>({
    initialValues: {
      name: "",
      amount: 0,
      category: "",
      dueDate: new Date(),
    },
    onSubmit: (values: any) => {
      const errorFree = validateForm();
      if (!errorFree) {
        return;
      }
      const bill: Bill = {
        name: values.name,
        amount: values.amount,
        dueDate: values.dueDate,
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
            setResError(getErrorMessage(error.response.data.code));
          } else {
            setResError("An unexpected error occurred. Please try again.");
          }
        });
    },
  });
  return (
    <LoggedInLayout>
      <Wrapper>
        <Header>Add New Bill</Header>
        <Form onSubmit={formik.handleSubmit}>
          <InputSection>
            <label htmlFor="name">Name</label>
            <TextField
              id="name"
              name="name"
              type="text"
              variant="outlined"
              onChange={formik.handleChange}
              value={formik.values.name}
              placeholder="Enter bill name"
            />
            {formErrors.name ? (
              <StyledError>{formErrors.name}</StyledError>
            ) : null}
          </InputSection>
          <InputSection>
            <label htmlFor="amount">Amount</label>
            <TextField
              id="amount"
              name="amount"
              type="number"
              variant="outlined"
              data-type="currency"
              onChange={formik.handleChange}
              value={formik.values.amount}
              placeholder="$0.00"
            />
            {formErrors.amount ? (
              <StyledError>{formErrors.amount}</StyledError>
            ) : null}
          </InputSection>
          <InputSection>
            <label id="Category">Category</label>
            <Select
              id="category"
              name="category"
              displayEmpty
              onChange={formik.handleChange}
              value={formik.values.category}
              label="Category"
            >
              <MenuItem value="">Select Category</MenuItem>
              {categories?.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
            {formErrors.category ? (
              <StyledError>{formErrors.category}</StyledError>
            ) : null}
          </InputSection>
          <InputSection>
            <label htmlFor="dueDate">Due Date</label>
            <DatePicker
              value={formik.values.dueDate}
              sx={{ borderRadius: "0.5rem", fontFamily: "inherit" }}
              onChange={(value) => formik.setFieldValue("dueDate", value, true)}
              slotProps={{
                textField: {
                  variant: "outlined",
                },
              }}
            />
            {formik.errors.dueDate ? (
              <StyledError>{formErrors.dueDate}</StyledError>
            ) : null}
          </InputSection>
          <SubmitButton type="submit">Submit</SubmitButton>
          {resError && <StyledError>{resError}</StyledError>}
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
