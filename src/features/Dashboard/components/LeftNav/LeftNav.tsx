import styled from "@emotion/styled";
import React, { Component } from "react";
import { NavLink } from "react-router-dom";

export const LeftNav = () => {
  return (
    <NavList>
      <ul>
        <NavItem to="/">Overview</NavItem>
        <NavItem to="/bills">Bills</NavItem>
        <NavItem to="/settings">Settings</NavItem>
        <NavItem to="/help">Help</NavItem>
      </ul>
    </NavList>
  );
};

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
