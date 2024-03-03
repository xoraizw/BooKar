const mongoose = require('mongoose');

const fieldInformationSchema = new mongoose.Schema({
  Field_id: { type: Number, required: true, unique: true },
  Number_of_bookings: { type: Number, required: true },
  sports_type: { type: String },
  surface_type: { type: String },
  dimensions: { type: String },
  player_capacity: { type: Number, required: true },
  hourly_rate: { type: Number, required: true },
  hours_open: { type: String }
});

const FieldInformation = mongoose.model('FieldInformation', fieldInformationSchema);

module.exports = FieldInformation;
