const express = require('express');
const app = express();
const multer = require("multer");
require('dotenv').config();
const port = process.env.PORT || 3000;

const seedAdminUser = require('./utill/seedAdmin');
if (process.env.NODE_ENV !== 'production') {
  seedAdminUser();
}


app.listen(port,(err)=>{
    if(err){
        console.log('server error.......');        
    }else{
        console.log(`server is running successfully ${port}`);        
    }
})

require('./model/config')
app.use('/uploads', express.static('uploads'));

const router = require('./router/userRouter');
const bodyparser = require('body-parser');

const cors = require('cors');
app.use(cors());
app.use(bodyparser.json())
app.use('/user', router);


