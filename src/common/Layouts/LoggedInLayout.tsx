import React, { ReactNode } from "react";
import { LeftNav } from "../../features/Dashboard/components/LeftNav/LeftNav";
import { NavBar } from "../NavBar/components/NavBar";
import styled from "@emotion/styled";

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
`;

const RightSide = styled.div`
  display: flex;
  flex-direction: column;
  width: 75.7%;
  padding: 20px;
  margin-top: 10px;
`;

const MainContainer = styled.div`
  width: 100%;
  height: 93.9vh;
  display: flex;
  flex-direction: row;
  overflow: hidden;
`;
