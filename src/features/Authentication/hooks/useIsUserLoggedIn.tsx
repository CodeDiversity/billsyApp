import { useSelector } from "react-redux";
import { RootState } from "../../../store";


export const useIsUserLoggedIn = () => {
  const user = useSelector((state: RootState) => state.user);
  return user.username !== null;
}