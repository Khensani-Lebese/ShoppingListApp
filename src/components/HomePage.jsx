// src/pages/HomePage.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import Logout from '../components/Logout'; // Importing the Logout component
import styled from 'styled-components';

const HomePage = () => {
  const user = JSON.parse(localStorage.getItem('user')); // Checking if the user is logged in

  return (
    <HomeContainer>
      <NavBar>
        {!user ? (
          <>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/register">Register</NavLink>
          </>
        ) : (
          <>
            <NavLink to="/shopping-list">Shopping List</NavLink>
            <LogoutContainer>
              <Logout />
            </LogoutContainer>
          </>
        )}
      </NavBar>
      <WelcomeMessage>
        {user ? `Welcome, ${user.name} ${user.surname}!` : 'Welcome to your Shopping List App!'}
      </WelcomeMessage>
    </HomeContainer>
  );
};

export default HomePage;

// Styled-components
const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f0f0f0;
`;

const NavBar = styled.nav`
  margin-bottom: 20px;
`;

const NavLink = styled(Link)`
  margin: 0 10px;
  text-decoration: none;
  color: #333;
  font-weight: bold;

  &:hover {
    color: #007bff;
  }
`;

const WelcomeMessage = styled.h1`
  font-size: 2rem;
  color: #333;
`;

const LogoutContainer = styled.div`
  display: inline-block;
  margin-left: 10px;
`;
