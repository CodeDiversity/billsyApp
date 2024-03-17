import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import {
  getStartedText,
  heroHeaderText,
  heroText,
} from "./constants/constants";
import HeroImageSrc from "../../images/heroimage.webp";
import { LoggedOutLayout } from "../../common/Layouts/LoggedOutLayout";
import StayOrganized from "../../images/organize.webp";
import LateFee from "../../images/lateFee.webp";
import { sharedCardStyles, sharedFontStyles, sharedHeaderStyles, sharedSectionStyles } from "./styles/sharedStyles";


export const MarketingPage = () => {
  const navigate = useNavigate();
  const heroClick = () => {
    // navigate to sign up page
    navigate("/register");
  };
  return (
    <LoggedOutLayout>
      <Container>
        <HeroSection>
          <LeftSideHero>
            <HeroHeader>{heroHeaderText}</HeroHeader>
            <P>{heroText}</P>
            <P>{getStartedText}</P>
            <SignUpButton onClick={heroClick}>Sign Up</SignUpButton>
          </LeftSideHero>
          <HeroImage src={HeroImageSrc} alt="reminders" />
        </HeroSection>
        <MiddleSection>
          <WhyUseHeader>Why use Billsy?</WhyUseHeader>
          <WhyUseText>
            Its simple. We help you stay on top of your bill, so you can focus
            on everything else
          </WhyUseText>
        </MiddleSection>
        <LowerSection>
          <Card>
            <ThirdsImage src={StayOrganized} />
            <CardHeader>Stay Organized</CardHeader>
            <CardFont>Keep track of all your bills in one place</CardFont>
          </Card>

          <Card>
            <ThirdsImage src={LateFee} />
            <CardHeader>Avoid Late Fees</CardHeader>
            <CardFont>
              Help avoid those expensive late fees by getting on time reminders.
            </CardFont>
          </Card>
          <Card>
            <ThirdsImage src="https://cdn.pixabay.com/photo/2017/08/30/07/52/money-2696219_1280.jpg" />
            <CardHeader>Track Your Finances</CardHeader>
            <CardFont>
              Easily track your outgoing expenses and keep your budget in check.
            </CardFont>
          </Card>
        </LowerSection>
        <CTASection>
          <CTAHeader>Ready to stop stressing about bills?</CTAHeader>
          <CardFont>
            Join the thousands of people who have signed up for Billsy
          </CardFont>
          <CTAButton onClick={heroClick}>Sign Up</CTAButton>
        </CTASection>
      </Container>
    </LoggedOutLayout>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: #f0f0f0;
`;

const CTASection = styled.div`
  ${sharedSectionStyles}
  align-items: center;
  margin-bottom: 5rem;
`;

const CTAHeader = styled.h1`
  ${sharedHeaderStyles}
  font-size: 3rem;
`;

const CTAButton = styled.button`
  background-color: #236f8d;
  padding: 1rem 2rem;
  font-size: 1.5rem;
  color: #f0f0f0;
  border: none;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 1rem;
  width: 20%;
  &:hover {
    background-color: #4397b9;
  }
`;

const Card = styled.div`
  ${sharedCardStyles}
`;

const CardHeader = styled.h2`
  ${sharedHeaderStyles}
  font-size: 1.5rem;
  font-weight: bolder;
`;

const CardFont = styled.p`
  ${sharedFontStyles}
`;

const MiddleSection = styled.div`
  ${sharedSectionStyles}
`;

const WhyUseHeader = styled.h2`
  ${sharedHeaderStyles}
  font-size: 2.5rem;
`;

const WhyUseText = styled.h2`
  ${sharedFontStyles}
  font-size: 1.25rem;
`;

const LowerSection = styled.div`
  ${sharedSectionStyles}
  flex-direction: row;
  justify-content: space-between;
  padding-bottom: 2.5rem;
`;

const ThirdsImage = styled.img`
  width: 100%;
  height: 250px;
  margin-bottom: 20px;
`;

const HeroSection = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 75%;
  background-color: #f0f0f0;
  height: 500px;
  margin-top: 2rem;
`;

const LeftSideHero = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 50%;
  background-color: rgba(35, 111, 141);
  max-height: 700px;
  height: 100%;
`;

const HeroImage = styled.img`
  width: 50%;
  height: auto;
  max-height: 700px;
  margin: 0 auto;
  height: 100%;
`;

const HeroHeader = styled.h1`
  font-size: 3rem;
  color: white;
  margin-bottom: 3rem;
  text-align: center;
  padding: 0 2rem;
`;

const P = styled.p`
  font-size: 1.5rem;
  color: white;
  margin-bottom: 1rem;
  text-align: center;
  width: 80%;
  line-height: 1.25;
`;

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