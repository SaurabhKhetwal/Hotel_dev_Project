
const mongoose = require('mongoose');

const url = process.env.MONGODB_URI;

mongoose.connect(url);

const con = mongoose.connection;

    con.on('open',(err)=>{
        if(err){
            console.log('Database connection error')
        }else{
            console.log("Database is connected.......");
            
        }
    })