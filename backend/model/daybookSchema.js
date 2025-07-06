// const { date } = require('joi');
const mongoose = require('mongoose');

const DaybookSchema = new mongoose.Schema({
    date:{
        type:Date,
        required:true
    },
    transactionType:{
        type:String,
        required:true
    },
     category:{
        type:String,
        required:true
    },
     description:{
        type:String,
        required:true
    },
     amount:{
        type:String,
        required:true
    },
     paymentMode:{
        type:String,
        required:true
    },
     referenceNo:{
        type:String,
        required:true
    },
     handledBy:{
        type:String,
        required:true
    },
     remarks:{
        type:String,
        required:true
    },
});

const DaybookModel = mongoose.model('daybook',DaybookSchema);
module.exports = DaybookModel;