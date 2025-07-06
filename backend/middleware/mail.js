const transpoter = require("./transpoter");
const  {Verification_Email_Template,Welcome_Email_Template} = require('./mailTemplate');

const sendVerificationEmail = async (email ,verification) => {
    try {
    const response = await transpoter.sendMail({
      from: '"onetick" <ssourabh.1712@gmail.com>',
      to: email,  // Use the email passed as parameter
      subject: "Verification Code ✔",
      text: "Please verify the verification code.",
      html: Verification_Email_Template.replace("{verificationCode}", verification),
    });
    console.log('Verification email sent successfully:', response);
  } catch (err) {
    console.error('Error sending verification email:', err);
  }
};

const sendWelcomeEmail = async (email, name) => {
  try {
    const response = await transpoter.sendMail({
      from: '"onetick" <ssourabh.1712@gmail.com>',
      to: email,
      subject: "Welcome Panel Code ✔",
      text: "Welcome code.",
      html: Welcome_Email_Template.replace("{name}", name),
    });
    console.log('Welcome email sent successfully:', response);
  } catch (err) {
    console.error('Error sending welcome email:', err);
  }
};


module.exports = {sendVerificationEmail,sendWelcomeEmail};