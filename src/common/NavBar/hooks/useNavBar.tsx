import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../../features/Authentication/slices/userSlice";
import { LoginButton } from "../styled";

export const useNavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const token = localStorage.getItem("token");

  function isTokenExpired(token: string) {
    const decodedToken = JSON.parse(atob(token.split(".")[1]));
    const currentTime = Date.now() / 1000;
    return decodedToken.exp < currentTime;
  }

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

  const isUserLoggedIn = () => {
    if (isLoggedIn) {
      return <LoginButton onClick={handleLogout}>Logout</LoginButton>;
    } else {
      return (
        <LoginButton onClick={() => navigate("/login")}>Login</LoginButton>
      );
    }
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/");
  };

  return {
    isUserLoggedIn,
    isTokenExpired
  };
};
