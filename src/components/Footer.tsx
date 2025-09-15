import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background: #000000;
  color: white;
  padding: 3rem 0 1rem 0;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
`;

const FooterSection = styled.div``;

const FooterTitle = styled.h3`
  margin-bottom: 1rem;
  color: #fff;
  font-size: 1.2rem;
  font-family: "Turret Road", sans-serif;
  font-optical-sizing: auto;
  font-weight: 500;
  font-variation-settings:
    "ELGR" 1,
    "ELSH" 2;
`;

const FooterText = styled.p`
  color: #ccc;
  line-height: 1.6;
  margin-bottom: 1rem;
  font-family: "Turret Road", sans-serif;
  font-optical-sizing: auto;
  font-weight: 300;
  font-variation-settings:
    "ELGR" 1,
    "ELSH" 2;
`;

const FooterLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const FooterLink = styled(Link)`
  color: #ccc;
  text-decoration: none;
  transition: all 0.3s ease;
  font-family: "Turret Road", sans-serif;
  font-optical-sizing: auto;
  font-weight: 300;
  font-variation-settings:
    "ELGR" 1,
    "ELSH" 2;
  
  &:hover {
    color: white;
    transform: translateY(-1px);
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const SocialLink = styled.a`
  display: inline-block;
  width: 40px;
  height: 40px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  transition: all 0.3s ease;
  font-size: 1.2rem;
  
  &:hover {
    transform: translateY(-2px) scale(1.1);
    color: #fff;
  }
`;

const FooterBottom = styled.div`
  padding-top: 2rem;
  text-align: center;
  color: #ccc;
`;

const Copyright = styled.p`
  margin-bottom: 1rem;
  font-family: "Turret Road", sans-serif;
  font-optical-sizing: auto;
  font-weight: 300;
  font-variation-settings:
    "ELGR" 1,
    "ELSH" 2;
`;

const FooterBottomLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  flex-wrap: wrap;
`;

const FooterBottomLink = styled(Link)`
  color: #ccc;
  text-decoration: none;
  transition: all 0.3s ease;
  font-family: "Turret Road", sans-serif;
  font-optical-sizing: auto;
  font-weight: 300;
  font-variation-settings:
    "ELGR" 1,
    "ELSH" 2;
  
  &:hover {
    color: white;
    transform: translateY(-1px);
  }
`;

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <FooterContainer>
      <FooterContent>
        <FooterGrid>
          <FooterSection>
            <FooterTitle className="footer-text">Lucas Cavallini</FooterTitle>
            <FooterText className="footer-text">
            Professional photographer, journalist and all-around creative in the realm of image making. Born in Belém - PA, Lucas came to São Paulo at a very early age and started meddling with analog photography circa 2018. From then, Lucas has turned into a competent professional, mainly photographing events and fashion tied to the current nightlife scene in São Paulo.
            </FooterText>
            <SocialLinks>
              <SocialLink href="https://www.instagram.com/lvqkinhas/" aria-label="Instagram"><i className="bi bi-instagram"></i></SocialLink>
              <SocialLink href="https://x.com/lvqkinhas" aria-label="Twitter"><i className="bi bi-twitter-x"></i></SocialLink>
              <SocialLink href="#" aria-label="LinkedIn"><i className="bi bi-linkedin"></i></SocialLink>
            </SocialLinks>
          </FooterSection>

          <FooterSection>
            <FooterTitle className="footer-text">Quick Links</FooterTitle>
            <FooterLinks>
              <FooterLink to="/">Home</FooterLink>
              <FooterLink to="/portfolio">Portfolio</FooterLink>
              <FooterLink to="/about">About</FooterLink>
              <FooterLink to="/contact">Contact</FooterLink>
            </FooterLinks>
          </FooterSection>



          <FooterSection>
            <FooterTitle className="footer-text">Contact Info</FooterTitle>
            <FooterText className="footer-text">
              📍 São Paulo, SP<br />
              📧 lvcascavallini@gmail.com<br />
              📱 +55 11 98104-5537
            </FooterText>
          </FooterSection>
        </FooterGrid>

        <FooterBottom>
          <Copyright className="footer-text">
            © {currentYear} Lucas Cavallini. All rights reserved. <br />
            Website by Thiago Carmo.
          </Copyright>
          <FooterBottomLinks>
            <FooterBottomLink to="/privacy">Privacy Policy</FooterBottomLink>
            <FooterBottomLink to="/terms">Terms of Service</FooterBottomLink>
            <FooterBottomLink to="/sitemap">Sitemap</FooterBottomLink>
          </FooterBottomLinks>
        </FooterBottom>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;
