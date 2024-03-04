import styled from "@emotion/styled";
import React, { Component } from "react";
import { NavLink } from "react-router-dom";

export const LeftNav = () => {
  return (
    <LeftNavContainer>
      <NavList>
        <ul>
          <NavItem to="/">Overview</NavItem>
          <NavItem to="/bills">Bills</NavItem>
          <NavItem to="/settings">Settings</NavItem>
          <NavItem to="/help">Help</NavItem>
        </ul>
      </NavList>
    </LeftNavContainer>
  );
};

const LeftNavContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 20%;
  height: 100%;
  padding-top: 40px;
`;

const NavList = styled.ul`
  list-style-type: none;
  padding: 0;
  width: 70%;
`;

const NavItem = styled(NavLink)`
  display: block;
  padding: 10px;
  margin-top: 10px;
  color: #333;
  text-decoration: none;
  width: 100%;
  border-radius: 5px;

  &.active {
    background-color: #ddd; // Style for active state
  }

  &:hover {
    background-color: #eee; // Style for hover state
  }
`;
