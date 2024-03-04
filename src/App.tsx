import { Routes, Route } from "react-router-dom";
import { SignUp } from "./features/Authentication/components/SignUp";
import { Landing } from "./pages/Landing/Landing";
import { Login } from "./pages/Login/components/Login";
import { useEffect } from "react";
import { rehydrateAuthState } from "./features/Authentication/thunks/userThunks";
import { logoutUser } from "./features/Authentication/slices/userSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "./store";
import {Bills} from "./features/Bills/components/Bills";
import Settings from "./features/Settings/components/Settings";
import Help from "./features/Help/components/Help";

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
      <Routes>
        <Route path="/register" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/bills" element={<Bills />} />
        <Route path="/" element={<Landing />} />
        <Route path='/settings' element={<Settings/>}/>
        <Route path="/help" element={<Help/>} />

      </Routes>
    </div>
  );
}

export default App;
