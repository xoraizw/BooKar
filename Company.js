const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
    Company_ID: Number,
    Company_Name: String,
    Location: String,
    Contact_Name: String,
    Email: String,
    Website_URL: String,
    Image: Buffer // Store image data as a buffer
});

module.exports = mongoose.model('Company', companySchema);