import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const HeaderContainer = styled.header<{ scrolled: boolean; isAboutPage: boolean; isContactPage: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: ${props => (props.isAboutPage || props.isContactPage) ? 'transparent' : (props.scrolled ? 'rgba(255, 255, 255, 0.95)' : 'transparent')};
  backdrop-filter: ${props => (props.isAboutPage || props.isContactPage) ? 'none' : (props.scrolled ? 'blur(10px)' : 'none')};
  transition: all 0.3s ease;
  padding: 1rem 0;
  
  @media (max-width: 768px) {
    padding: 0.8rem 0;
  }
  
  @media (max-width: 480px) {
    padding: 0.6rem 0;
  }
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const Logo = styled(Link)<{ isAboutPage: boolean; isContactPage: boolean }>`
  font-size: 1.8rem;
  font-weight: 700;
  color: ${props => (props.isAboutPage || props.isContactPage) ? 'white' : '#333'} !important;
  text-decoration: none;
  transition: all 0.4s ease;
  
  &:hover {
    color: ${props => (props.isAboutPage || props.isContactPage) ? 'white' : '#333'} !important;
    transform: scale(1.03);
  }
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1.3rem;
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled(Link)<{ active: boolean; isAboutPage: boolean; isContactPage: boolean }>`
  color: ${props => (props.isAboutPage || props.isContactPage) ? 'white' : (props.active ? '#333' : '#333')};
  font-weight: ${props => props.active ? '600' : '400'};
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: ${props => props.active ? '100%' : '0'};
    height: 2px;
    background: ${props => (props.isAboutPage || props.isContactPage) ? 'white' : '#333'};
    transition: all 0.3s ease;
  }
  
  &:hover {
    color: ${props => (props.isAboutPage || props.isContactPage) ? 'white' : '#333'};
    text-shadow: ${props => (props.isAboutPage || props.isContactPage) ? '0 0 10px rgba(255, 255, 255, 0.8), 0 0 20px rgba(255, 255, 255, 0.6)' : 'none'};
  }
  
  &:hover::after {
    width: 100%;
    background: ${props => (props.isAboutPage || props.isContactPage) ? 'white' : '#333'};
    box-shadow: ${props => (props.isAboutPage || props.isContactPage) ? '0 0 10px rgba(255, 255, 255, 0.8), 0 0 20px rgba(255, 255, 255, 0.6)' : 'none'};
  }
`;

const MobileMenuButton = styled.button<{ isAboutPage: boolean; isContactPage: boolean }>`
  display: none;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: ${props => (props.isAboutPage || props.isContactPage) ? 'white' : '#333'};
  transition: all 0.3s ease;
  
  @media (max-width: 768px) {
    display: block;
  }
  
  &:hover {
    color: ${props => (props.isAboutPage || props.isContactPage) ? 'white' : '#333'};
    transform: scale(1.1);
  }
`;

const MobileMenu = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(10px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  z-index: 999;
  
  @media (max-width: 480px) {
    gap: 1.5rem;
    padding: 2rem;
  }
`;

const MobileNavLink = styled(Link)`
  font-size: 2rem;
  color: #333;
  font-weight: 500;
  transition: all 0.3s ease;
  
  &:hover {
    color: white;
    text-shadow: 0 0 10px rgba(255, 255, 255, 0.8), 0 0 20px rgba(255, 255, 255, 0.6);
    transform: scale(1.05);
  }
  
  @media (max-width: 480px) {
    font-size: 1.8rem;
  }
`;

const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/portfolio', label: 'Portfolio' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' }
  ];

  const isAboutPage = location.pathname === '/about';
  const isContactPage = location.pathname === '/contact';

  return (
    <HeaderContainer scrolled={scrolled} isAboutPage={isAboutPage} isContactPage={isContactPage}>
      <Nav>
        <Logo to="/" isAboutPage={isAboutPage} isContactPage={isContactPage}>LVQKINHAS</Logo>
        
        <NavLinks>
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              active={location.pathname === item.path}
              isAboutPage={isAboutPage}
              isContactPage={isContactPage}
            >
              {item.label}
            </NavLink>
          ))}
        </NavLinks>
        
        <MobileMenuButton onClick={() => setMobileMenuOpen(!mobileMenuOpen)} isAboutPage={isAboutPage} isContactPage={isContactPage}>
          {mobileMenuOpen ? '✕' : '☰'}
        </MobileMenuButton>
      </Nav>

      {mobileMenuOpen && (
        <MobileMenu
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {navItems.map((item) => (
            <MobileNavLink
              key={item.path}
              to={item.path}
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.label}
            </MobileNavLink>
          ))}
        </MobileMenu>
      )}
    </HeaderContainer>
  );
};

export default Header;
