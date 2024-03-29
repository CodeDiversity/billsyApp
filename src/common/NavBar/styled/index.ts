import styled from "@emotion/styled";
import { Button } from "@mui/material";
import { styled as muiStyled } from "@mui/system";


const NavContainer = styled.nav`
  background-color: rgba(35, 111, 141); /* Blue background */
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
`;

const NavLinks = styled.ul`
  list-style-type: none;
  display: flex;
  align-items: center;
`;

const NavLinkItem = styled.li`
  margin-right: 15px;
`;

const NavLink = styled.a`
  color: #ffffff; /* White links */
  text-decoration: none;
  padding: 5px 10px;
  border-radius: 5px;
  transition: background-color 0.3s ease;
  font-size: 18px;

  &:hover {
    background-color: #0089b3; /* Darker blue on hover */
  }
`;

const LoginButton = muiStyled(Button)({
  backgroundColor: "rgb(41, 143, 161)", // Green
  color: "#ffffff", // White text
  padding: "5px 10px",
  borderRadius: "5px",
  transition: "background-color 0.3s ease",
  fontSize: "18px",
  "&:hover": {
    backgroundColor: "rgb(41, 95, 161)", // Darker green on hover
  },
});

const LogoText = styled.h1`
  font-size: 2rem;
  color: white;
  margin-left: 10px;
  font-family: "Madimi One", sans-serif;
  font-weight: 400;
  font-style: normal;
`;


export { NavContainer, NavLinks, NavLinkItem, NavLink, LoginButton, LogoText };