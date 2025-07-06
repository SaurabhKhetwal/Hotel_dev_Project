const { required } = require('joi');
const mongoose = require('mongoose');

const SatffSchema = new mongoose.Schema({
    fname:{
        type:String,
        required:true
    },
    lname:{
        type:String,
        required:true
    },
    Email:{
        type:String,
        required:true
    },
    Number:{
      type:String,
      required:true 
    },
    Gender:{
      type:String,
      required:true 
    },
    Designation:{
      type:String,
      required:true 
    },
    Role:{
     type:String,
      required:true    
    },
    Staffid:{
      type:String,
      required:true 
    },
    imagePath:{
      type:String,
      required:true 
    }

});

const StaffModel = mongoose.model('staff',SatffSchema);
module.exports = StaffModel;

