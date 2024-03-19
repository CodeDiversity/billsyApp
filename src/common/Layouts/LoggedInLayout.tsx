import React, { ReactNode } from "react";
import { LeftNav } from "../../features/Dashboard/components/LeftNav/LeftNav";
import { NavBar } from "../NavBar/components/NavBar";
import styled from "@emotion/styled";
import { breakpoints } from "../styled";

interface LayoutProps {
  children: ReactNode; // Use ReactNode for accepting any type of children
}

export const LoggedInLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <NavBar />
      <MainContainer>
        <LeftSide>
          <LeftNav />
        </LeftSide>
        <RightSide>{children}</RightSide>
      </MainContainer>
    </>
  );
};

const LeftSide = styled.div`
  display: flex;
  flex-direction: row;
  width: 20%;
  height: 93.5vh;
  padding-top: 40px;
  justify-content: center;
  padding: 20px;
  @media (max-width: ${breakpoints.tablet}) {
    width: 100%;
    justify-content: center;
    height: 75px;
    padding: 10px;
  }
`;

const RightSide = styled.div`
  display: flex;
  flex-direction: column;
  width: 75.7%;
  padding: 20px;
  margin-top: 10px;
  @media (max-width: ${breakpoints.tablet}) {
    padding: 10px;
    align-items: center;
    width: 100%;
  }
`;

const MainContainer = styled.div`
  width: 100%;
  height: 93.9vh;
  display: flex;
  flex-direction: row;
  overflow: hidden;
  @media (max-width: ${breakpoints.tablet}) {
    flex-direction: column;
  }
`;
