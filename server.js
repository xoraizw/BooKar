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
mongoose.connect('mongodb+srv://bookar360:AhsanGanduHai123@bookarmain.kzrocom.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
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
  

// Other routes for authentication, login, etc.

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});