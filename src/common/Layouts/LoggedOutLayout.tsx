import { NavBar } from "../NavBar/NavBar";

export interface LayoutProps {
  children: React.ReactNode;
}

export const LoggedOutLayout : React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <NavBar />
      {children}
    </>
  );
};
