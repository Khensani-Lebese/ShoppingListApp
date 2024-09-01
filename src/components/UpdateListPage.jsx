import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateList, fetchLists } from '../redux/actions';
import styled from 'styled-components';

const UpdateListPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const lists = useSelector((state) => state.lists || []);
  
  // Fetch the lists on component mount
  useEffect(() => {
    console.log('Fetching lists...');
    dispatch(fetchLists());
  }, [dispatch]);
  
  const listToUpdate = lists && lists.length > 0 && lists.find((list) => list.id === parseInt(id));
  
  useEffect(() => {
    if (listToUpdate) {
      setName(listToUpdate.name);
      setQuantity(listToUpdate.quantity);
      setNotes(listToUpdate.notes);
      setCategory(listToUpdate.category);
    }
  }, [listToUpdate]);

  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [notes, setNotes] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && quantity) {
      const updatedList = {
        id: listToUpdate.id,
        name,
        quantity,
        notes,
        category,
        image: image ? URL.createObjectURL(image) : listToUpdate.image,
      };

      dispatch(updateList(updatedList));
      navigate('/view-lists'); // Redirect to view lists page after update
    }
  };

  return (
    <PageContainer>
      <Title>Update List</Title>
      {listToUpdate ? (
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
          <Button type="submit">Update Item</Button>
        </Form>
      ) : (
        <p>List not found</p>
      )}
    </PageContainer>
  );
};

export default UpdateListPage;

// Styled-components
const PageContainer = styled.div`
  padding: 20px;
  background-color: #f8f9fa;
`;

const Title = styled.h1`
  font-size: 2rem;
  color: #333;
`;

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
