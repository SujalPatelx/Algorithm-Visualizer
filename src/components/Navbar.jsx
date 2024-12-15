import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const Nav = styled.nav`
  background: linear-gradient(90deg, #1e90ff, #00bfff);
  padding: 1rem 2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
`;

const NavContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(Link)`
  color: #fff;
  text-decoration: none;
  font-size: 1.8rem;
  font-weight: bold;
  transition: color 0.3s ease;

  &:hover {
    color: #ffdf00;
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled(Link)`
  color: #fff;
  text-decoration: none;
  font-size: 1rem;
  font-weight: 500;
  position: relative;
  transition: color 0.3s ease;

  &:hover {
    color: #ffdf00;
  }

  &::after {
    content: '';
    display: block;
    height: 3px;
    width: 0;
    background-color: #ffdf00;
    transition: width 0.3s ease;
  }

  &:hover::after {
    width: 100%;
  }

  &.active {
    color: #ffdf00;
  }
`;

const BackButton = styled(Link)`
  color: #fff;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 500;

  &:hover {
    text-decoration: underline;
  }
`;

const HamburgerMenu = styled.div`
  display: none;
  cursor: pointer;

  @media (max-width: 768px) {
    display: block;
  }

  div {
    width: 25px;
    height: 3px;
    background-color: #fff;
    margin: 5px 0;
    transition: 0.3s;
  }
`;

const MobileMenu = styled.div`
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background: #1e90ff;
  flex-direction: column;
  padding: 1rem 0;

  ${NavLink} {
    padding: 1rem 2rem;
    width: 100%;
    text-align: left;
  }

  @media (max-width: 768px) {
    display: flex;
  }
`;

function Navbar() {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const [menuOpen, setMenuOpen] = React.useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <Nav>
      <NavContainer>
        <Logo to="/">Algorithm Visualizer</Logo>
        <NavLinks>
          <NavLink to="/" className={location.pathname === '/' ? 'active' : ''}>Home</NavLink>
          <NavLink to="/resources" className={location.pathname === '/resources' ? 'active' : ''}>Resources</NavLink>
          <NavLink to="/contact" className={location.pathname === '/contact' ? 'active' : ''}>Contact</NavLink>
        </NavLinks>

        <HamburgerMenu onClick={toggleMenu}>
          <div></div>
          <div></div>
          <div></div>
        </HamburgerMenu>

        {menuOpen && (
          <MobileMenu>
            <NavLink to="/" onClick={toggleMenu} className={location.pathname === '/' ? 'active' : ''}>Home</NavLink>
            <NavLink to="/resources" onClick={toggleMenu} className={location.pathname === '/resources' ? 'active' : ''}>Resources</NavLink>
            <NavLink to="/contact" onClick={toggleMenu} className={location.pathname === '/contact' ? 'active' : ''}>Contact</NavLink>
          </MobileMenu>
        )}

        {!isHome && (
          <BackButton to="/">
            ← Back to Home
          </BackButton>
        )}
      </NavContainer>
    </Nav>
  );
}

export default Navbar;
