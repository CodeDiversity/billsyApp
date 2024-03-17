import { NavBar } from "../NavBar/components/NavBar";

export interface LayoutProps {
  children: React.ReactNode;
}

export const LoggedOutLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <NavBar />
      {children}
    </>
  );
};
