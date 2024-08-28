// src/pages/ShoppingListPage.jsx

import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLists } from '../redux/actions';
import ListItem from '../components/ListItem';
import ListForm from '../components/ListForm';

const ShoppingListPage = () => {
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(fetchLists());
  }, [dispatch]);

  const lists = useSelector((state) => state.lists || []);
  
  return (
    <PageContainer>
      <Header>
        <Title>Shopping List</Title>
        <NavBar>
          <NavLink to="/add-list">Add List</NavLink>
          <NavLink to="/update-list">Update List</NavLink>
          <NavLink to="/view-list">View List</NavLink>
        </NavBar>
      </Header>
      <Content>
       
        <ListContainer>
          {lists && lists.length > 0 && lists.map((list) => (
            <ListItem key={list.id} list={list} />
          ))}
        </ListContainer>
      </Content>
    </PageContainer>
  );
};

export default ShoppingListPage;

// Styled-components
const PageContainer = styled.div`
  padding: 20px;
  background-color: #f8f9fa;
`;

const Header = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
`;

const Title = styled.h1`
  font-size: 2rem;
  color: #333;
`;

const NavBar = styled.nav`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

const NavLink = styled(Link)`
  margin: 0 15px;
  text-decoration: none;
  color: #007bff;
  font-weight: bold;

  &:hover {
    text-decoration: underline;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
