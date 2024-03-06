import { Routes, Route, BrowserRouter } from "react-router-dom";
import { SignUp } from "./features/Authentication/components/SignUp";
import { Landing } from "./pages/Landing/Landing";
import { Login } from "./pages/Login/components/Login";
import { useEffect } from "react";
import { rehydrateAuthState } from "./features/Authentication/thunks/userThunks";
import { logoutUser } from "./features/Authentication/slices/userSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "./store";
import { Bills } from "./features/Bills/components/Bills";
import Settings from "./features/Settings/components/Settings";
import Help from "./features/Help/components/Help";
import { RequireAuth } from "./features/Authentication/hooks/protectedRoute";
import { CreateBill } from "./features/Bills/components/CreateBillForm/CreateBill";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";

function App() {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(rehydrateAuthState()).then((actionResult) => {
      if (actionResult.payload === null) {
        // No token found, dispatch logout
        dispatch(logoutUser());
      }
      // If there's a token, you might want to set up your user state here
    });
  }, [dispatch]);

  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Routes>
          <Route path="/register" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Landing />} />

          <Route element={<RequireAuth />}>
            <Route path="/bills" element={<Bills />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/help" element={<Help />} />
            <Route path="/new" element={<CreateBill />} />
          </Route>
        </Routes>
      </LocalizationProvider>
    </div>
  );
}

export default App;
