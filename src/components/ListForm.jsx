// src/components/ListForm.jsx

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addList } from '../redux/actions';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';



const ListForm = () => {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [notes, setNotes] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && quantity) {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('quantity', quantity);
      formData.append('notes', notes);
      formData.append('category', category);
      if (image) {
        formData.append('image', image);
      }

      dispatch(addList(formData),() =>{
      

      });

      // Clear form fields after submission
      setName('');
      setQuantity('');
      setNotes('');
      setCategory('');
      setImage(null);
      alert('Item has been added successfully!');
      navigate('/shopping-list');
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        type="text"
        placeholder="Item Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <Input
        type="number"
        placeholder="Quantity"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        required
      />
      <TextArea
        placeholder="Notes (optional)"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      />
      <Input
        type="text"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <FileInput
        type="file"
        accept="image/*"
        onChange={handleImageChange}
      />
      <ButtonContainer>
      <Button type="submit">Add Item</Button>
      <BackButton type="button" onClick={() => navigate('/shopping-list')}>
          Back to Shopping List
        </BackButton>
        </ButtonContainer>
    </Form>
  );
};

export default ListForm;

// Styled-components
const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const Input = styled.input`
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const TextArea = styled.textarea`
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  height: 80px;
`;

const FileInput = styled.input`
  margin-bottom: 10px;
`;

const Button = styled.button`
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  

  &:hover {
    background-color: #0056b3;
  }
`;

const BackButton = styled.button`
  padding: 10px;
  background-color: #6c757d;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #5a6268;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px; /* Adds space between the buttons */
`;
