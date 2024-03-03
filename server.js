const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const User = require('./User'); // Update this line

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://bookar360:Bookar360720@bookarmain.kzrocom.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

app.post('/api/signup', async (req, res) => {
    try {
      console.log('Received login request:', req.body); // Log the request body
  
      const existingUser = await User.findOne({ Email: req.body.email.toLowerCase() });
  
      if (existingUser) {
        // User exists, check password
        console.log('User found:', existingUser);
  
        if (req.body.password && existingUser.Password === req.body.password) {
          console.log('Password matched for user:', existingUser.Email);
          res.status(200).json({ message: 'Login successful!' });
        } else {
          console.log('Password not provided or incorrect for user:', existingUser.Email);
          console.log('Provided password:', req.body.password);
          console.log('Stored password:', existingUser.Password);
          res.status(401).json({ message: 'Incorrect password.' });
        }
      } else {
        // User does not exist
        console.log('User not found for email:', req.body.email);
        res.status(401).json({ message: 'Email not found.' });
      }
    } catch (error) {
      console.error('Error during login:', error.message);
      res.status(500).json({ error: error.message });
    }
  });
///////////////////////////////////////////////////////
app.post('/signup', async (req, res) => {
  // Extract the required user data from the request body
  console.log('Fetching data from: signup');
  const { username, email, password, phoneNumber } = req.body;
  console.log("SIGNUP MIEN")
  try {
    // Store user data temporarily
    tempUserData = { username, email, password, phoneNumber };
    
    // Respond with a success message
    res.status(200).json({ message: 'User data received successfully' });
  } catch (error) {
    console.error('Error storing user data:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/complete-profile', async (req, res) => 
{
  // Extract profile data from request body
  const { fullName, age } = req.body;

  try {
    // Create a new user instance with the required fields
    const newUser = new User({
      Username: tempUserData.username,
      Name: fullName,
      Email: tempUserData.email,
      Age: age,
      Password: tempUserData.password,
      Phone_number: tempUserData.phoneNumber
    });

    // Save the user to the database
    await newUser.save();
    console.log('Fetching data from:', 'http://localhost:3000/complete-profile');

    // Clear temporary user data
    tempUserData = {};

    // Respond with a success message
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Other routes for authentication, login, etc.

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});