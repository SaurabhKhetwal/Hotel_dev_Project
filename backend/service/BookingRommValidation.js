const joi = require('joi');

const BookingRoomValidation = (req, res, next) => {
  const schema = joi.object({
    name: joi.string().min(3).max(30).required(),
    email: joi.string().email().required(),
    number: joi.string().pattern(/^[0-9]+$/).min(10).max(15).required(),
    address: joi.string().min(3).max(50).required(),
    checkin: joi.date().required(),
    checkout: joi.date().required(),
    guests: joi.number().min(1).max(12).required(),
    roomType: joi.string().valid('Deluxe', 'Suite', 'Single').required(),
    message: joi.string().min(3).max(200).allow('', null), // Optional field
    payment: joi.string().valid('Pay Now', 'Pay at Hotel').required()
  });

  const { error, value } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: 'Bad Request', error });
  }
  next();
};



// //////////////////////


const validateStaff = (req, res, next) => {
  const schema = joi.object({
    fname: joi.string().min(2).max(30).required(),
    lname: joi.string().min(2).max(30).required(),
    Email: joi.string().email().required(),
    Number: joi.string().pattern(/^[0-9]{10,15}$/).required(),
    Gender: joi.string().valid('Male', 'Female', 'Other').required(),
    Designation: joi.string().min(2).max(50).required(),
    Role: joi.string().valid('Ceo', 'Founder', 'GM', 'Malik').required(),
    Staffid: joi.string().alphanum().min(3).max(20).required(),
    
  });

  const { error } = schema.validate(req.body, { abortEarly: false });
  if (error) {
    return res.status(400).json({
      message: 'Validation Failed',
      errors: error.details.map((err) => err.message),
    });
  }
  next();
};


module.exports = {BookingRoomValidation,validateStaff};