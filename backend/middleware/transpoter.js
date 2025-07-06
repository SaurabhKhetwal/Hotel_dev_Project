const nodemailer = require('nodemailer');

const transpoter = nodemailer.createTransport({
    service:"gmail",
    auth:{
        user: "ssourabh.1712@gmail.com",
        pass: "tduxnhvwbsnlmbja"
    }
});

module.exports = transpoter;