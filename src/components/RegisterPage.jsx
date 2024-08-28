// src/pages/RegisterPage.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import bcrypt from 'bcryptjs';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    surname: '',
    cellNumber: '',
    profilePicture: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      profilePicture: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(formData.password, salt);

    const userData = {
      email: formData.email,
      password: hashedPassword,
      name: formData.name,
      surname: formData.surname,
      cellNumber: formData.cellNumber,
      profilePicture: formData.profilePicture ? URL.createObjectURL(formData.profilePicture) : '',
    };

    // Send the user data to the JSON server
    axios.post('http://localhost:5000/users', userData)
      .then((response) => {
        console.log('User registered successfully', response.data);
        navigate('/login'); // Redirect to login page after successful registration
      })
      .catch((error) => {
        console.error('Error registering user', error);
      });
  };

  return (
    <RegisterContainer>
      <Form onSubmit={handleSubmit}>
        <Title>Register</Title>
        <Input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <Input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <Input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <Input
          type="text"
          name="surname"
          placeholder="Surname"
          value={formData.surname}
          onChange={handleChange}
          required
        />
        <Input
          type="tel"
          name="cellNumber"
          placeholder="Cell Number"
          value={formData.cellNumber}
          onChange={handleChange}
          required
        />
        <FileInput
          type="file"
          name="profilePicture"
          onChange={handleFileChange}
        />
        <Button type="submit">Register</Button>
      </Form>
    </RegisterContainer>
  );
};

export default RegisterPage;

// Styled-components
const RegisterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f0f0;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  padding: 20px;
  border-radius: 8px;
  background-color: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  margin-bottom: 20px;
  text-align: center;
  color: #333;
`;

const Input = styled.input`
  margin-bottom: 15px;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #ccc;
  font-size: 1rem;
`;

const FileInput = styled.input`
  margin-bottom: 15px;
`;

const Button = styled.button`
  padding: 10px;
  border-radius: 4px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 1rem;

  &:hover {
    background-color: #0056b3;
  }
`;
