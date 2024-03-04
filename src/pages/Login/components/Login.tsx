import { useFormik } from "formik";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../../features/Authentication/thunks/userThunks";
import { AppDispatch } from "../../../store";
import {
  selectCurrentError,
  setError,
} from "../../../features/Authentication/slices/userSlice";

// Define TypeScript interfaces for form values and validation errors
interface FormValues {
  password: string;
  username: string;
}

interface FormErrors {
  email?: string;
  password?: string;
  username?: string;
}

export const Login: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const error = useSelector(selectCurrentError);
  console.log(error, "redux error");
  const formik = useFormik<FormValues>({
    initialValues: {
      password: "",
      username: "",
    },
    onSubmit: async (values) => {
      handleSubmit(values);
    },
    validate: (values) => {
      const errors: FormErrors = {};

      if (!values.password) {
        errors.password = "Password is required";
      }
      if (!values.username) {
        errors.username = "Username is required";
      }

      return errors;
    },
  });

  const handleSubmit = async (values: FormValues) => {
    try {
      // unwrap the promise so we can catch the error
      await dispatch(loginUser(values)).unwrap();
      navigate("/"); // Navigate on success
    } catch (error) {
      dispatch(setError(error as string)); // Set the error state
    }
  };

  return (
    <Wrapper>
      <Header>Login</Header>
      <Form onSubmit={formik.handleSubmit}>
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
      </Form>
      <SignUpSection>
        <p>
          Don't have an account?{" "}
          <a href="#" onClick={() => navigate("/register")}>
            Sign up
          </a>
        </p>
      </SignUpSection>
    </Wrapper>
  );
};

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

const SignUpSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1rem;
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

const Wrapper = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  flex-direction: column;
`;
