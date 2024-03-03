import styled from "@emotion/styled";
import { useNavigate } from 'react-router-dom';
import { getStarted, heroText } from "./constants/constants";
import HeroImageSrc from "../../images/heroimage.webp";


export const MarketingPage = () => {
  const navigate = useNavigate();
  const heroClick = () => {
    // navigate to sign up page
    navigate('/register');
  }
  return (
    <Container>
      <HeroSection>
        <LeftSideHero>
          <H1>Billsy</H1>
          <P>{heroText}</P>
          <P>{getStarted}</P>
          <SignUpButton onClick={heroClick}>Sign Up</SignUpButton>
        </LeftSideHero>
        <HeroImage src={HeroImageSrc} alt="reminders" />
      </HeroSection>
    </Container>
  );
};

const Container = styled.div `
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f0f0;
`

const HeroSection = styled.div `
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 65%;
  background-color: #f0f0f0;
  height: 600px;
`

const HeroImage = styled.img `
  width: 50%;
  height: auto;
  max-height: 700px;
  margin: 0 auto;
  height: 100%;
`

const LeftSideHero = styled.div `
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 50%;
  background-color: rgba(35,111,141);
  max-height: 700px;
  height: 100%;
`

const H1 = styled.h1 `
  font-size: 3rem;
  color: white;
  margin-bottom: 3rem;
`

const P = styled.p `
  font-size: 1.5rem;
  color: white;
  margin-bottom: 1rem;
  text-align: center;
  width: 80%;
  line-height: 1.25;
`

const SignUpButton = styled.button`
  padding: 1rem 2rem;
  font-size: 1.5rem;
  color: rgba(35, 111, 141);
  background-color: #f0f0f0;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 1rem;
  &:hover {
    background-color: #f0f0f0d1;
    color: rgba(35, 111, 141);
  }
`;