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
const Inventory = require('./Inventory'); 

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
  
        if (req.body.password && existingUser.Password === req.body.password && existingUser.userType == 'Owner') 
        {
          res.status(205).json({ message: 'Login successful!' });
        } 
        else if (req.body.password && existingUser.Password === req.body.password) 
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
  const {fullName, userType, username, email, phoneNumber, password, age, gender, city} = req.body;
  
  const verificationCode = Math.floor(1000 + Math.random() * 9000);

  try {
    const newUser = new User({
      Username: username,
      Name: fullName,
      Email: email,
      Age: age,
      Password: password,
      Phone_number: phoneNumber,
      verificationCode: verificationCode,
      verified: false,
      userType: userType,
      city : city,
      gender: gender
    });

    await newUser.save();

    sendVerificationEmail(email, verificationCode);

    res.status(201).json({ message: 'User created successfully, verification code sent.' });
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
app.get('/owner-bookings', async (req, res) => 
{
  const email = req.query.ownerEmail;
  try 
  {
    const bookings = await Booking.find({ Company_Email: email });
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
app.get('/get-reviews', async (req, res) => {
  // Extract the company email from the query parameters
  const companyEmail = req.query.companyEmail;

  try {
    // Create a regular expression to perform case-insensitive search
    const regex = new RegExp(`${companyEmail}`, 'i');

    // Find reviews based on the company email
    const reviews = await Review.find({ CompanyEmailGiven: regex }).exec();

    // Send the reviews as JSON response
    res.json(reviews);
  } catch (error) {
    // Handle errors
    console.error('Error searching for reviews:', error);
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

// Verification Work 

const SibApiV3Sdk = require('sib-api-v3-sdk');
const defaultClient = SibApiV3Sdk.ApiClient.instance;

// Configure API key authorization
const apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = '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'; // Replace with your actual API key

const sendVerificationEmail = async (email, verificationCode) => {
  const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

  const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail(); 
  sendSmtpEmail.subject = "Welcome To Bookar!";
  sendSmtpEmail.htmlContent = `<html><body><p>Your verification code is: <strong>${verificationCode}</strong></p></body></html>`;
  sendSmtpEmail.sender = {"name": "BookarApp", "email": "bookar360@gmail.com"};
  sendSmtpEmail.to = [{"email": email}];

  try {
    const data = await apiInstance.sendTransacEmail(sendSmtpEmail);
    console.log('API called successfully. Returned data: ', data);
  } catch (error) {
    console.error(error);
  }
};

app.post('/verify-code', async (req, res) => {
  const { email, code } = req.body;

  try {
    const user = await User.findOne({ Email: email });
    if (!user || user.verificationCode != code) {
      return res.status(400).json({ message: 'Invalid code.' });
    }

    user.verified = true;
    await user.save();

    res.status(200).json({ message: 'User successfully verified.' });
  } catch (error) {
    console.error('Error during code verification:', error);
    res.status(500).json({ error: 'Server error during code verification.' });
  }
});

app.post('/resend-code', async (req, res) => {
  const { email } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ Email: email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Generate a new 4-digit verification code
    const newVerificationCode = Math.floor(1000 + Math.random() * 9000);

    // Update the user's verification code
    user.verificationCode = newVerificationCode;
    await user.save();

    // Send the new verification code via email
    sendVerificationEmail(email, newVerificationCode);

    res.status(200).json({ message: 'New verification code sent successfully.' });
  } catch (error) {
    console.error('Error resending verification code:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Inventory Management 

app.get('/fetchinventory', async (req, res) => {
  const { email } = req.query;
  try {
    const inventory = await Inventory.findOne({ email: email });
    if (!inventory) {
      return res.status(404).json({ message: 'Inventory not found for this user' });
    }
    res.json(inventory);
  } catch (error) {
    console.error('Error fetching inventory:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/updateinventory', async (req, res) => {
  const { email, items } = req.body; // items should be an array of item objects
  try {
    const inventory = await Inventory.findOneAndUpdate(
      { email: email },
      { $set: { items: items } },
      { new: true, upsert: true } // This option creates a new document if one doesn't exist
    );
    res.json({ message: 'Inventory updated successfully', inventory });
  } catch (error) {
    console.error('Error updating inventory:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// SERVER STARTED
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});