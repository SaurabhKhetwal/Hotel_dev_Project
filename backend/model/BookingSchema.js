const { v4: uuidv4 } = require('uuid');
const mongoose = require('mongoose');
const { required } = require('joi');

const CustomerBooking = new mongoose.Schema({
  bookingId: {
    type: String,
    default: () => uuidv4(),
    unique: true
  },
  name: { type: String, required: true },
  email: { type: String, required: true },
  number: { type: String, required: true },
  address: { type: String, required: true },
  checkin: { type: Date, required: true },
  checkout: { type: Date, required: true },
  guests: { type: Number, required: true },
  roomType: { type: String, required: true },
  message: { type: String, default: "" },
  payment: { type: String, required: true },
  paymentStatus: {type: String},
  createdAt: { type: Date, default: Date.now }
});

const CustomerBookingModel = mongoose.model('customerBookings', CustomerBooking);
module.exports = CustomerBookingModel;

