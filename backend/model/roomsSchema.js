const { required } = require('joi');
const mongoose = require('mongoose');

const RoomsSchema = new mongoose.Schema({
    roomNum:{
        type:String,
        required:true
    },
    type:{
        type:String,
        required:true
    },
    status:{
      type:String,
      required:true 
    },
    price:{
      type:String,
      required:true 
    }

});

const roomsModel = mongoose.model('rooms',RoomsSchema);
module.exports = roomsModel;