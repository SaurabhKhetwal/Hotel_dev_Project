
const mongoose = require('mongoose');

const User = new mongoose.Schema({
  userName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  createAt: {
    type: Date,
    default: Date.now
  },

  isVerified: {
    type: Boolean,
    default: false

  },
  role: {
    type: String,
    enum: ['user', 'staff', 'admin'],
    default: 'user', 
    immutable: true  
  },
  isActive: {
    type: Boolean,
    default: true
  },
  resetPasswordToken: String,
  resetPasswordTokenExpiredAt: Date,
  verificationToken: String,
  verificationTokenExpiredAt: Date

}, { timestamps: true })

const UserModel = mongoose.model('User', User);
module.exports = UserModel;

