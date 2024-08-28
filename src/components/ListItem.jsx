// src/components/ListItem.jsx

import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteList, updateList } from '../redux/actions';
import styled from 'styled-components';

const ListItem = ({ list }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteList(list.id));
  };

  const handleUpdate = () => {
    const updatedName = prompt('Enter new item name:', list.name);
    const updatedQuantity = prompt('Enter new quantity:', list.quantity);
    if (updatedName && updatedQuantity) {
      dispatch(updateList({ id: list.id, name: updatedName, quantity: updatedQuantity }));
    }
  };

  return (
    <ItemContainer>
      <ItemName>{list.name}</ItemName>
      <ItemDetails>Quantity: {list.quantity}</ItemDetails>
      <ItemDetails>Notes: {list.notes}</ItemDetails>
      <ItemDetails>Category: {list.category}</ItemDetails>
      {list.image && <ItemImage src={list.image} alt={list.name} />}
      <ButtonContainer>
        <Button onClick={handleUpdate}>Update</Button>
        <Button onClick={handleDelete}>Delete</Button>
      </ButtonContainer>
    </ItemContainer>
  );
};

export default ListItem;

// Styled-components
const ItemContainer = styled.div`
  padding: 10px;
  margin-bottom: 10px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const ItemName = styled.h3`
  margin: 0;
  font-size: 1.5rem;
`;

const ItemDetails = styled.p`
  margin: 5px 0;
  color: #555;
`;

const ItemImage = styled.img`
  max-width: 100%;
  height: auto;
  margin-top: 10px;
`;

const ButtonContainer = styled.div`
  margin-top: 10px;
`;

const Button = styled.button`
  margin-right: 10px;
  padding: 5px 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;
