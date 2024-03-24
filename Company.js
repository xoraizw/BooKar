const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
    Company_ID: Number,
    Company_Name: String,
    Location: String,
    Contact_Name: String,
    Email: String,
    Website_URL: String
  });

module.exports = mongoose.model('Company', companySchema);