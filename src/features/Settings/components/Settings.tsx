import React from "react";
import { LoggedInLayout } from "../../../common/Layouts/LoggedInLayout";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser, updateUserInfo } from "../../Authentication/slices/userSlice";
import { MenuItem, Select, TextField } from "@mui/material";
import styled from "@emotion/styled";
import { updateUser } from "../../Authentication/thunks/userThunks";
import { AppDispatch } from "../../../store";
import { SettingsUser, User } from "../../Authentication/types/userTypes";
import { toast } from "react-toastify";

export default function Settings() {
  const user = useSelector(selectCurrentUser) as SettingsUser
  const dispatch = useDispatch<AppDispatch>();
  console.log(user);
  const formik = useFormik({
    initialValues: {
      email: user?.email || "",
      fullName: user?.fullName || "",
      phoneNumber: user?.phoneNumber || "",
      emailReminderTime: user?.emailReminderTime || "",
      currency: user?.currency || "",
    },
    onSubmit: async (values: SettingsUser) => {
      const user = {
        ...values,
      };
      await dispatch(updateUser(user)).unwrap();
      toast.success("User settings updated!");
    },
    enableReinitialize: true,
  });

  return (
    <LoggedInLayout>
      <Header>Settings</Header>
      <Form onSubmit={formik.handleSubmit}>
        <InputSection>
          <label htmlFor="email">Email</label>
          <TextField
            id="email"
            name="email"
            type="email"
            onChange={formik.handleChange}
            value={formik.values.email}
          />
        </InputSection>
        <InputSection>
          <label htmlFor="name">Name</label>
          <TextField
            id="fullName"
            name="fullName"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.fullName}
          />
        </InputSection>
        <InputSection>
          <label htmlFor="phoneNumber">Phone Number</label>
          <TextField
            id="phoneNumber"
            name="phoneNumber"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.phoneNumber}
          />
        </InputSection>
        <InputSection>
          {/* make the email time a dropdown */}
          <label htmlFor="emailReminderTime">Email Reminder Time</label>
          <Select
            id="emailReminderTime"
            name="emailReminderTime"
            displayEmpty
            onChange={formik.handleChange}
            value={formik.values.emailReminderTime}
            sx={{ height: 30, width: 100 }}
          >
            {/* options 12a to 12p */}
            {Array.from({ length: 24 }, (_, i) => i).map((hour) => (
              <MenuItem key={hour} value={hour}>
                {hour % 12 === 0 ? 12 : hour % 12} {hour < 12 ? "a" : "p"}
              </MenuItem>
            ))}
          </Select>
        </InputSection>
        <InputSection>
          <label htmlFor="currency">Currency</label>
          <TextField
            id="currency"
            name="currency"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.currency}
          />
        </InputSection>
        <SubmitButton type="submit">Submit</SubmitButton>
      </Form>
    </LoggedInLayout>
  );
}

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
