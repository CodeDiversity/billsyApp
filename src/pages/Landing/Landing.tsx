import React from "react";
import styled from "@emotion/styled";
import { NavBar } from "../../common/NavBar/NavBar";
import { Dashboard } from "../../features/Dashboard/components/Dashboard";
import { MarketingPage } from "../MarketingPage/MarketingPage";
import { useIsUserLoggedIn } from "../../features/Authentication/hooks/useIsUserLoggedIn";

export const Landing = () => {
  const isUserLoggedIn = useIsUserLoggedIn();
  return (
    <Container>
      {
        isUserLoggedIn ? <Dashboard/> : <MarketingPage/>
      }
    </Container>
  );
};

const Container = styled.div``;
