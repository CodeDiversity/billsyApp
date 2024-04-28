import { useState } from "react";
import { LoggedInLayout } from "../../../../common/Layouts/LoggedInLayout";
import styled from "@emotion/styled";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { selectCategories } from "../../../Authentication/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import Select from "@mui/material/Select";
import { MenuItem } from "@mui/material";
import TextField from "@mui/material/TextField";
import { createBill } from "../../thunks/billThunks";
import { AppDispatch } from "../../../../store";
import { Bill } from "../../types/Bill";
import { toast } from "react-toastify";
import { RecurringFrequency } from '../../types/RecurringFrequency';
import { breakpoints } from "../../../../common/styled";

interface FormValues {
  name: string;
  amount: number;
  category: string;
  dueDate: Date;
  payLink?: string;
  isRecurring?: boolean;
  recurringFrequency: RecurringFrequency;
}

export const CreateBill = () => {
  const categories = useSelector(selectCategories);
  //TODO style date to match the rest or remove MUI date picker.
  const navigate = useNavigate();
  const [resError, setResError] = useState("");
  const [isRecurring, setIsRecurring] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const [formErrors, setFormErrors] = useState({
    name: "",
    amount: "",
    category: "",
    dueDate: "",
    payLink: "",
    isRecurring: "",
    recurringFrequency: '',
  });
  const validateForm = () => {
    let error = false;
    const errors = {
      name: "",
      amount: "",
      category: "",
      dueDate: "",
      payLink: "",
      isRecurring: "",
      recurringFrequency: '',
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
        payLink: "",
        isRecurring: "",
        recurringFrequency: '',
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
      payLink: "",
      isRecurring: false,
      recurringFrequency: RecurringFrequency.MONTHLY,
    },
    onSubmit: async (values: any) => {
      const errorFree = validateForm();
      if (!errorFree) {
        return;
      }
      const bill: Partial<Bill> = {
        name: values.name,
        amount: values.amount,
        dueDate: values.dueDate,
        category: values.category,
        payLink: values.payLink,
        isRecurring: Boolean(values.isRecurring),
        recurringFrequency: values.recurringFrequency,
      };
      await dispatch(createBill(bill)).unwrap();
      toast.success("Bill created!");
      navigate("/"); // Navigate on success
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
          {/* Pay Link Field Add */}
          <InputSection>
            <label htmlFor="payLink">Pay Link</label>
            <Input
              id="payLink"
              name="payLink"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.payLink}
            />
            {formik.errors.payLink ? (
              <StyledError>{formik.errors.payLink}</StyledError>
            ) : null}
          </InputSection>
          <InputSection>
            <label htmlFor="isRecurring">Recurring</label>
            <Select
              id="isRecurring"
              name="isRecurring"
              displayEmpty
              onChange={() => {
                setIsRecurring(!isRecurring);
                formik.setFieldValue("isRecurring", !isRecurring);
              }}
              value={formik.values.isRecurring}
              label="Recurring"
            >
              <MenuItem value="">Select Recurring</MenuItem>
              <MenuItem value={"true"}>Yes</MenuItem>
              <MenuItem value={"false"}>No</MenuItem>
            </Select>
          </InputSection>
          {isRecurring === true && (
            <InputSection>
              <label htmlFor="recurringFrequency">Recurring Frequency</label>
              <Select
                id="recurringFrequency"
                name="recurringFrequency"
                displayEmpty
                onChange={formik.handleChange}
                value={formik.values.recurringFrequency}
                label="Recurring Frequency"
              >
                <MenuItem value={RecurringFrequency.MONTHLY}>Monthly</MenuItem>
                <MenuItem value={RecurringFrequency.WEEKLY}>Weekly</MenuItem>
                <MenuItem value={RecurringFrequency.BIWEEKLY}>
                  Bi-weekly
                </MenuItem>
                <MenuItem value={RecurringFrequency.ANNUALLY}>Yearly</MenuItem>
              </Select>
            </InputSection>
          )}
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
  @media (max-width: ${breakpoints.tablet}) {
    align-items: center;
  }

`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 40%;
  padding: 2rem;
  border-radius: 4px;
  @media (max-width: ${breakpoints.tablet}) {
    width: 100%;
  }
`;

const Header = styled.h1`
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 1rem;
  margin-left: 2.5%;
  @media (max-width: ${breakpoints.tablet}) {
    margin-left: 0;
    margin-bottom: .5rem;
  }
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