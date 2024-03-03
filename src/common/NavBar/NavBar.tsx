import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { Button } from "@mui/material";
import { styled as muiStyled } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../features/Authentication/slices/userSlice";
import LogoImg from "../../images/logo.webp";


// Navbar component
export const NavBar = () => {
const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  function isTokenExpired(token: string) {
    const decodedToken = JSON.parse(atob(token.split(".")[1]));
    const currentTime = Date.now() / 1000;
    return decodedToken.exp < currentTime;
  }

  const handleLogout = () => {
    dispatch(logoutUser());
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  const isUserLoggedIn = () => {
    if (isLoggedIn) {
      return <LoginButton onClick={handleLogout}>Logout</LoginButton>;
    } else {
      return (
        <LoginButton onClick={() => navigate("/login")}>Login</LoginButton>
      );
    }
  };

  useEffect(() => {
    if (token && !isTokenExpired(token)) {
      setIsLoggedIn(true);
    }
    const checkExpireInterval = setInterval(() => {
      if (!token) {
        return;
      }
      if (isTokenExpired(token)) {
        handleLogout();
      } else if (!isLoggedIn) {
        setIsLoggedIn(true);
      }
    }, 5000);
    return () => clearInterval(checkExpireInterval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return (
    <NavContainer>
      <LogoText>
        Billsy
      </LogoText>
      <NavLinks>
        <NavLinkItem>
          <NavLink href="#">Link 1</NavLink>
        </NavLinkItem>
        <NavLinkItem>
          <NavLink href="#">Link 2</NavLink>
        </NavLinkItem>
        <NavLinkItem>
          <NavLink href="#">Link 3</NavLink>
        </NavLinkItem>
        <NavLinkItem>
          <NavLink href="#">Link 4</NavLink>
        </NavLinkItem>
        <NavLinkItem>
          <NavLink href="#">Link 5</NavLink>
        </NavLinkItem>
        <NavLinkItem>{isUserLoggedIn()}</NavLinkItem>
      </NavLinks>
    </NavContainer>
  );
};

export const NavContainer = styled.nav`
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