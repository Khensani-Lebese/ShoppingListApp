// src/pages/AddListPage.jsx

import React from 'react';
import styled from 'styled-components';
import ListForm from './ListForm';
const AddListPage = () => {
  return (
    <PageContainer>
      <Title>Add New List</Title>
      <ListForm />
    </PageContainer>
  );
};

export default AddListPage;

// Styled-components
const PageContainer = styled.div`
  padding: 20px;
  background-color: #f8f9fa;
`;

const Title = styled.h1`
  font-size: 2rem;
  color: #333;
`;
