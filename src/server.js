const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcryptjs');

const app = express();
const port = 5000;

// Set up multer for file upload
const upload = multer({ dest: 'uploads/' });

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Simulated database
let users = [];

// Handle registration requests
app.post('/api/register', upload.single('image'), async (req, res) => {
  const { email, password, name, surname, cell } = req.body;
  const image = req.file;

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save user data
    const newUser = {
      email,
      password: hashedPassword,
      name,
      surname,
      cell,
      imagePath: image ? image.path : null,
    };

    users.push(newUser);

    // Respond with success
    res.status(201).json({ message: 'Registration successful!', user: newUser });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ error: 'Registration failed. Please try again.' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
