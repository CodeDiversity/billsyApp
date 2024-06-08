import styled from "@emotion/styled";
import { NavLink } from "react-router-dom";
import { breakpoints } from "../../../../common/styled";

export const LeftNav = () => {
  return (
    <NavList>
      <UnorderedList>
        <NavItem to="/">Overview</NavItem>
        <NavItem to="/bills">Bills</NavItem>
        <NavItem to="/settings">Settings</NavItem>
        {/* <NavItem to="/help">Help</NavItem> */}
      </UnorderedList>
    </NavList>
  );
};

const UnorderedList = styled.ul`
  list-style-type: none;
  padding: 0;
  width: 70%;
  @media (max-width: ${breakpoints.tablet}) {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    width: 100%;
    height: 50px;
  }
`;

const NavList = styled.ul`
  list-style-type: none;
  padding: 0;
  width: 70%;
  @media (max-width: ${breakpoints.tablet}) {
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: space-evenly
  }
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
  @media (max-width: ${breakpoints.tablet}) {
    width: 100px;
    height: 30px;
    display: flex;
    text-align: center;
    justify-content: center;
    align-items: center;
    margin-top: 0;
  }
`;
