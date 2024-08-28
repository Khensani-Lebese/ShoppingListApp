// src/pages/ViewListPage.jsx

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { fetchLists } from '../redux/actions';
import ListItem from '../components/ListItem';

const ViewListPage = () => {
  const dispatch = useDispatch();
  const lists = useSelector((state) => state.lists || []);

  useEffect(() => {
    dispatch(fetchLists());
  }, [dispatch]);

  return (
    <PageContainer>
      <Title>View Shopping Lists</Title>
      <ListContainer>
        {lists && lists.length > 0 ? (
          lists.map((list) => (
            <ListItem key={list.id} list={list} />
          ))
        ) : (
          <p>No shopping lists available.</p>
        )}
      </ListContainer>
    </PageContainer>
  );
};

export default ViewListPage;

// Styled-components
const PageContainer = styled.div`
  padding: 20px;
  background-color: #f8f9fa;
`;

const Title = styled.h1`
  font-size: 2rem;
  color: #333;
`;

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
