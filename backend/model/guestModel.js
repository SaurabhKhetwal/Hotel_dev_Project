const mongoose = require('mongoose');

const guestSchema = new mongoose.Schema({
  name: String,
  email: String,
  number: String,
  checkin: Date,
  checkout: Date,
  guests: Number,
  roomType: String,
  payment: String,
  paymentStatus:String
  
}, {
  timestamps: true
});

module.exports = mongoose.model('Guest', guestSchema);
