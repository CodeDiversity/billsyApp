import styled from "@emotion/styled";
import React from "react";
import { NavLink } from "react-router-dom";
import { LeftNav } from "./LeftNav/LeftNav";
import { LoggedInLayout } from "../../../common/Layouts/LoggedInLayout";

type Props = {};

export const Dashboard = (props: Props) => {
  return (
    <LoggedInLayout>
      Dashboard
    </LoggedInLayout>
  );
};


const NavItem = styled(NavLink)`
  display: block;
  padding: 10px;
  color: #333;
  text-decoration: none;
  width: 100%;

  &.active {
    background-color: #ddd; // Style for active state
  }

  &:hover {
    background-color: #eee; // Style for hover state
  }
`;
