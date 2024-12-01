import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const Nav = styled.nav`
  background-color: white;
  padding: 1rem 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const NavContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(Link)`
  color: var(--primary-color);
  text-decoration: none;
  font-size: 1.5rem;
  font-weight: 500;
`;

const BackButton = styled(Link)`
  color: var(--primary-color);
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 500;

  &:hover {
    text-decoration: underline;
  }
`;

function Navbar() {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <Nav>
      <NavContainer>
        <Logo to="/">Algorithm Visualizer</Logo>
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