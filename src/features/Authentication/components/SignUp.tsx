import styled from "@emotion/styled";
import { useFormik } from "formik";
import client from "../../../axios/axiosConfig";
import { useNavigate } from "react-router-dom";
import { getErrorMessage } from "../../../common/errorMessages";
import { useState } from "react";
import { LoggedOutLayout } from "../../../common/Layouts/LoggedOutLayout";

interface FormValues {
  email: string;
  password: string;
  username: string;
  fullName: string;
}

interface FormErrors {
  email?: string;
  password?: string;
  username?: string;
  fullName?: string;
}

export const SignUp = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const formik = useFormik<FormValues>({
    initialValues: {
      email: "",
      password: "",
      username: "",
      fullName: "",
    },
    onSubmit: (values) => {
      client
        .post("users", values)
        .then((response) => {
          console.log(response);
          navigate("/");
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

      if (!values.email) {
        errors.email = "Email is required";
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
      ) {
        errors.email = "Invalid email address";
      }

      if (!values.password) {
        errors.password = "Password is required";
      } else if (values.password.length < 8) {
        errors.password = "Password must be at least 8 characters long";
      }

      if (!values.username) {
        errors.username = "Username is required";
      }

      if (!values.fullName) {
        errors.fullName = "Name is required";
      }

      return errors;
    },
  });
  return (
    <LoggedOutLayout>
      <Wrapper>
        <Header>Sign Up</Header>
        <Form onSubmit={formik.handleSubmit}>
          <InputSection>
            <label htmlFor="email">Email Address</label>
            <Input
              id="email"
              name="email"
              type="email"
              onChange={formik.handleChange}
              value={formik.values.email}
            />
            {formik.errors.email ? (
              <StyledError>{formik.errors.email}</StyledError>
            ) : null}
          </InputSection>
          <InputSection>
            <label htmlFor="username">Username</label>
            <Input
              id="username"
              name="username"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.username}
            />
            {formik.errors.username ? (
              <StyledError>{formik.errors.username}</StyledError>
            ) : null}
          </InputSection>
          <InputSection>
            <label htmlFor="fullName">Name</label>
            <Input
              id="fullName"
              name="fullName"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.fullName}
            />
            {formik.errors.fullName ? (
              <StyledError>{formik.errors.username}</StyledError>
            ) : null}
          </InputSection>
          <InputSection>
            <label htmlFor="password">Password</label>
            <Input
              id="password"
              name="password"
              type="password"
              onChange={formik.handleChange}
              value={formik.values.password}
            />
            {formik.errors.password ? (
              <StyledError>{formik.errors.password}</StyledError>
            ) : null}
          </InputSection>
          <SubmitButton type="submit">Submit</SubmitButton>
          {error && <StyledError>{error}</StyledError>}
          <StyledMessage>
            Note: this app is in beta mode, real data should not be entered.
          </StyledMessage>
        </Form>
      </Wrapper>
    </LoggedOutLayout>
  );
};

const Wrapper = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  flex-direction: column;
`;

const StyledMessage = styled.p`
  color: #777;
  font-size: 1rem;
  font-weight: 800;
  text-align: center;
  margin-top: 1rem;
  font-weight: bold;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 300px;
  margin: 0 auto;
  padding: 2rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
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
  padding: 0.5rem;
  border-radius: 4px;
  border: 1px solid #ddd;
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
