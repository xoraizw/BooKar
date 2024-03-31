const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const User = require('./User');
const Company = require('./Company');
const Booking = require('./Booking');
const Review = require('./Reviews');
const Field = require('./Field');
const Notification = require('./Notification')

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

app.post('/change-password', async (req, res) => {
  const { email, phoneNumber, oldPassword, newPassword } = req.body;
  console.log(email)
  try {
      // Find the user by phoneNumber
      const user = await User.findOne({ Email: email });
      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }

      // Compare old password with the hashed password in the database

      if (oldPassword != user.Password) {
          return res.status(400).json({ message: 'Incorrect old password' });
      }

      // Hash the new password

      // Update user's password with the new hashed password
      user.Password = newPassword;
      user.Phone_number = phoneNumber
      await user.save();

      res.json({ message: 'Password changed successfully' });
  } catch (error) {
      console.error('Error changing password:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/addreview', async (req, res) => {
  try {
    // Extract data from the request body
    const { Rating, UserName, CompanyEmailGiven, Comments } = req.body;

    // Create a new review document
    const newReview = new Review({
      Rating,
      UserName,
      CompanyEmailGiven,
      Comments
    });

    // Save the new review to the database
    await newReview.save();

    res.status(201).json({ message: 'Review added successfully!' });
  } catch (error) {
    console.error('Error while adding review:', error.message);
    res.status(500).json({ error: error.message });
  }
});

app.post('/addbooking', async (req, res) => {
  try {
    // Extract data from the request body
    const { Company_Name, Field_Name, Booking_Time, Company_Email, User_Email, Total } = req.body;
    const Canceled = false
    // Create a new booking document
    const newBooking = new Booking({
      Company_Name,
      Field_Name,
      Booking_Time,
      Company_Email,
      User_Email,
      Total,
      Canceled
    });

    // Save the new booking to the database
    await newBooking.save();

    res.status(201).json({ message: 'Booking added successfully!' });
  } catch (error) {
    console.error('Error while adding booking:', error.message);
    res.status(500).json({ error: error.message });
  }
});

app.post('/addnotification', async (req, res) => {
  try {
    // Extract data from the request body
    const { User_Email, Msg } = req.body;

    // Create a new notification document
    const newNotification = new Notification({
      User_Email,
      Msg,
    });

    // Save the new notification to the database
    await newNotification.save();

    res.status(201).json({ message: 'Notification added successfully!' });
  } catch (error) {
    console.error('Error while adding notification:', error.message);
    res.status(500).json({ error: error.message });
  }
});

////////// Get requests //////////
app.get('/getnotifications', async (req, res) => {
  try {
    const { userEmail } = req.query;

    // Fetch notifications for the specified user email from the database
    const notifications = await Notification.find({ User_Email: userEmail });

    res.status(200).json(notifications);
  } catch (error) {
    console.error('Error while fetching notifications:', error.message);
    res.status(500).json({ error: 'Failed to fetch notifications' });
  }
});

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
    const bookings = await Booking.find({ User_Email: email });
    res.json(bookings);
  } 
  catch (error) 
  {
    console.error('Error fetching bookings:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/get-company', async (req, res) => {
  const email = req.query.email;
  try {
    const company = await Company.findOne({ Email: email });
    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }
    res.json(company);
  } catch (error) {
    console.error('Error fetching company:', error.message);
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

app.get('/company-fields', async (req, res) => {
  const companyEmail = req.query.companyEmail;
  try {
    const fields = await Field.find({ Company_Email: companyEmail });
    res.json(fields);
  } catch (error) {
    console.error('Error fetching fields by company email:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// PUT requests

app.put('/updatefield', async (req, res) => {
  try {
      const { Company_Email, Field_Name, slot } = req.body;
      await Field.updateOne(
          { Company_Email, Field_Name },
          { $push: { Already_Booked: slot } }
      );
      res.status(200).json({ message: 'Field document updated successfully' });
  } catch (error) {
      console.error('Error while updating field document:', error.message);
      res.status(500).json({ error: error.message });
  }
});

app.put('/cancelbooking', async (req, res) => {
  try {
      const { venueName, bookingTime, userEmail, companyEmail, fieldName } = req.body;

      
      const updatedBooking = await Booking.findOneAndUpdate(
          { Company_Email: companyEmail, Field_Name: fieldName, Booking_Time: bookingTime, User_Email: userEmail, Canceled: false },
          { Canceled: true },
          { new: true }
      );
      if (!updatedBooking) {
          throw new Error('Booking not found');
      }

      res.status(200).json({ message: 'Booking canceled successfully' });
  } catch (error) {
      console.error('Error while canceling booking:', error.message);
      res.status(500).json({ error: error.message });
  }
});

app.put('/updatebookings', async (req, res) => {
  try {
      const { companyEmail, fieldName, deleteBookings } = req.body;

      // console.log("deleteBookings: ", deleteBookings)
      // Find the field using Field_Name and Company_Email
      const field = await Field.findOne({ Company_Email: companyEmail, Field_Name: fieldName });

      if (!field) {
          throw new Error('Field not found');
      }

      field.Already_Booked = field.Already_Booked.filter(item => !deleteBookings.includes(item));
      // console.log("new booked array: ", field.Already_Booked)
      
      // Save the updated field document
      await field.save();

      res.status(200).json({ message: 'Booking array successfully updated' });
  } catch (error) {
      console.error('Error while updating booking array:', error.message);
      res.status(500).json({ error: error.message });
  }
});

// SERVER STARTED
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});