import { useNavBar } from "../hooks/useNavBar";
import { LogoText, NavContainer, NavLinkItem, NavLinks } from "../styled";


export const NavBar = () => {
  const { isUserLoggedIn } = useNavBar();

  return (
    <NavContainer>
      <LogoText>Billsy</LogoText>
      <NavLinks>
        <NavLinkItem>{isUserLoggedIn()}</NavLinkItem>
      </NavLinks>
    </NavContainer>
  );
};
