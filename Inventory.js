const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
  Entry_ID: { type: Number, required: true, unique: true },
  Company_ID: { type: Number, required: true, unique: true },
  item_Name_id: { type: String, required: true },
  Quantity: { type: Number, required: true },
  Minimum_Quantity: { type: Number, required: true }
});

const Inventory = mongoose.model('Inventory', inventorySchema);

module.exports = Inventory;
