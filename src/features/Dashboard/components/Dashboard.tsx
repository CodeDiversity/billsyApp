import styled from "@emotion/styled";
import React from "react";
import { LoggedInLayout } from "../../../common/Layouts/LoggedInLayout";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../Authentication/slices/userSlice";
import { useNavigate } from "react-router-dom";
import { UpcomingBills } from "../../Bills/components/UpcomingBills/UpcomingBills";
import { breakpoints } from "../../../common/styled";
import { Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

export const Dashboard = () => {
  const currentUser = useSelector(selectCurrentUser);
  const firstName = currentUser?.fullName?.split(" ")[0];
  const navigate = useNavigate();
  return (
    <LoggedInLayout>
      <Container>
        <WelcomeBackText>Welcome back, {firstName}</WelcomeBackText>
        <UpcomingBills />
        <JustifyCenter>
          <Fab color="primary" aria-label="add">
            <AddIcon onClick={() => navigate('/new')} />
          </Fab>
        </JustifyCenter>
      </Container>
    </LoggedInLayout>
  );
};

const JustifyCenter = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 95%;
  @media (max-width: ${breakpoints.tablet}) {
    width: 95%;
  }
`;

const Container = styled.div`
  width: 100%;
  margin-top: 20px;
  overflow: auto;
  @media (max-width: ${breakpoints.tablet}) {
    margin-top: 0;
  }
`;

const WelcomeBackText = styled.h2`
  font-size: 18px;
  margin-bottom: 20px;
`;

const AddBillButton = styled.button`
  background-color: #3f51b5;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  margin-top: 20px;
  margin-bottom: 20px;
  font-size: 16px;
  font-weight: bold;
  transition: 0.3s;
  width: 40%;
  &:hover {
    background-color: #2f3d9e;
  }
`;
