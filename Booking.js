const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    Booking_ID: Number,
    Field_ID: Number,
    Company_ID: Number,
    Email: String,
    Booking_time: Date,
    Amount: Number,
    Booking_type: String,
    Company_Name: String,
    Field_Name: String,
    Already_Booked: Array,
    Open_Hours: String
  });

module.exports = mongoose.model('Booking', bookingSchema);