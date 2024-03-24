const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const User = require('./User');
const Company = require('./Company');
const Booking = require('./Booking');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://bookar360:Bookar360720@bookarmain.kzrocom.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));


////////// Post requests //////////
app.post('/signin', async (req, res) => {
    try {
      const existingUser = await User.findOne({ Email: req.body.email.toLowerCase() });
  
      if (existingUser) 
      {
  
        if (req.body.password && existingUser.Password === req.body.password) 
        {
          res.status(200).json({ message: 'Login successful!' });
        } 
        else 
        {
          console.log('Password not provided or incorrect for user:', existingUser.Email);
          console.log('Provided password:', req.body.password);
          console.log('Stored password:', existingUser.Password);
          res.status(401).json({ message: 'Incorrect password.' });
        }
      } 
      else 
      {
        console.log('User not found for email:', req.body.email);
        res.status(401).json({ message: 'Email not found.' });
      }
    } 
    catch (error) 
    {
      console.error('Error during login:', error.message);
      res.status(500).json({ error: error.message });
    }
  });



app.post('/signup', async (req, res) => {
  console.log('Fetching data from: signup');
  const { username, email, password, phoneNumber } = req.body;
  console.log("SIGNUP MIEN")
  try {
    tempUserData = { username, email, password, phoneNumber };
    
    res.status(200).json({ message: 'User data received successfully' });
  } catch (error) {
    console.error('Error storing user data:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/create-profile', async (req, res) => 
{
  const { fullName, age } = req.body;

  try {
    const newUser = new User({
      Username: tempUserData.username,
      Name: fullName,
      Email: tempUserData.email,
      Age: age,
      Password: tempUserData.password,
      Phone_number: tempUserData.phoneNumber
    });

    await newUser.save();
    tempUserData = {};

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/create-profile', async (req, res) => 
{
  const { fullName, age } = req.body;

  try {
    const newUser = new User({
      Username: tempUserData.username,
      Name: fullName,
      Email: tempUserData.email,
      Age: age,
      Password: tempUserData.password,
      Phone_number: tempUserData.phoneNumber
    });

    await newUser.save();
    tempUserData = {};

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Server error' });
  }
});


////////// Get requests //////////
app.get("/", async (req,res) => {
  res.send("testing");
});

app.get('/get-companies', async (req, res) => 
{
    try 
    {
      const companies = await Company.find();
      res.json(companies);
    } 
    catch (error) 
    {
      console.error('Error fetching companies:', error.message);
      res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/already-booked', async (req, res) => {
  const { company, field } = req.query;
  try {
    // console.log("company: ", company)
    // console.log("field: ", field)
    // Find bookings based on Company_Name and Field_Name
    const bookings = await Booking.find({ Company_Name: company, Field_Name: field });
    // console.log(bookings)

    // Extract Already_Booked arrays from bookings
    const alreadyBookedArrays = bookings.map(booking => booking.Already_Booked);
    // Combine arrays into one array
    const combinedBookedSlots = alreadyBookedArrays.flat();
    // console.log(combinedBookedSlots)
    res.json(combinedBookedSlots);
  } catch (error) {
    console.error('Error fetching bookings:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});
app.get('/open-hours', async (req, res) => {
  const { company, field } = req.query;
  try {
    // Find bookings based on Company_Name and Field_Name
    const bookings = await Booking.findOne({ Company_Name: company, Field_Name: field });
    // res.json(bookings)
    res.json(bookings.Open_Hours);
    
  } catch (error) {
    console.error('Error fetching bookings:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/my-bookings', async (req, res) => 
{
  const email = req.query.userEmail;
  try 
  {
    const bookings = await Booking.find({ Email: email });
    res.json(bookings);
  } 
  catch (error) 
  {
    console.error('Error fetching bookings:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/search-fields', async (req, res) => {
  const fieldValue = req.query.field;
  try {
    const regex = new RegExp(`${fieldValue}`, 'i'); // Case-insensitive regex with wildcard
    const companies = await Company.find({ Company_Name: regex }).exec();
    res.json(companies);
  } catch (error) {
    console.error('Error searching for companies:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/get-user', async (req, res) => {
  const searchEmail = req.query.userEmail;
  try {
    const regex = new RegExp(`${searchEmail}`, 'i');
    const user = await User.findOne({ Email: regex }).exec();
    res.json(user);
  } catch (error) {
    console.error('Error searching for companies:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// SERVER STARTED
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});