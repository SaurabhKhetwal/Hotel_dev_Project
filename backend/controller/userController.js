const UserModel = require('../model/userSchema')
const bcrypt = require('bcrypt');
const CustomerBookingModel = require('../model/BookingSchema');
const jwtToken = require("jsonwebtoken");
const RoomsModel = require("../model/roomsSchema");
const StaffModel = require("../model/addStaffScheam")
const {sendVerificationEmail,sendWelcomeEmail} = require('../middleware/mail');
// const generateTokenAndSetCookies = require("../middleware/jwtCookees");

const CreateUser = async (req, res) => {
    try {
        const { userName, email, password, role } = req.body;

        if (!userName || !email || !password) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ error: "Email already registered" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();

        const user = new UserModel({
            userName,
            email,
            password: hashedPassword,
            verificationToken,
            verificationTokenExpiredAt: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
            isVerified: false, 
            role: role || 'user'
        });

        await user.save();


        //  generateTokenAndSetCookies(res, user._id);

         await sendVerificationEmail(user.email, verificationToken);
        
         return res.status(200).json({ message: "User created successfully" });
    } catch (err) {
        console.error("Error in CreateUser:", err);
        res.status(500).json({ error: "Server error" });
    }
};

// ////////////////////////////////////////////////////////////////////////////////////////////////////////


const VerifyEmail = async (req, res) => {

  const { verifyEmail } = req.body; // here is the OTP code
  
  console.log('Received OTP:', verifyEmail);
  
  // find user by verification token (otp)
  const user = await UserModel.findOne({
    verificationToken: verifyEmail,
    verificationTokenExpiredAt: { $gt: new Date() } //  check if it is not expired
  });
  
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "Invalid or expired verification code"
    });
  }
  
  if (user.isVerified) {
    return res.status(400).json({
      success: false,
      message: "User already verified"
    });
  }
  

  user.isVerified = true;
  user.verificationToken = null;
  user.verificationTokenExpiredAt = null;
  await user.save();
  
  
  try {
    await sendWelcomeEmail(user.email, user.userName);
    console.log('Welcome email sent to:', user.email);
  } catch (error) {
    console.error('Error sending welcome email:', error);
  
  }
  
  return res.json({
    success: true,
    message: "Email verified successfully"
  });
};


// ////////////////////////////////////////////////////////////////////////////////////////////////////////



const LoginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const errorMsg = 'Auth failed: email or password is wrong';

        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(403).json({ message: errorMsg, success: false });
        }

        const isPassEqual = await bcrypt.compare(password, user.password);
        if (!isPassEqual) {
            return res.status(403).json({ message: errorMsg, success: false });
        }

        const token = jwtToken.sign(
            { email: user.email, _id: user._id, userName: user.userName, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.status(200).json({
            message: "Login Success",
            success: true,
            jwtToken: token,
            email,
            name: user.userName,
            role: user.role
        });
    } catch (err) {
        console.error("Login error:", err);
        res.status(500).json({ message: "Internal server error", success: false });
    }
};

const getUser = async (req,res,next) =>{
    try{
        const user = await UserModel.find({},{password:0});
        return res.status(200).json({data: user});
    }catch(err){
        return res.status(500).json({message: "token error"})
    }
}

// ///////////////////////--------------------------////////////////////////////////////////////////


const GetProfile = async (req, res) => {
  try {
    const userId = req.user._id; // coming from VerifyToken middleware
    const user = await UserModel.findById(userId).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json({ success: true, user });
  } catch (err) {
    console.error('Error in GetProfile:', err.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};


const AdminDashboard = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      message: "Welcome to the Admin Dashboard",
      user: req.user
    });
  } catch (err) {
    console.error('Error in AdminDashboard:', err.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};


// ///////////////////////--------------------------////////////////////////////////////////////////



// ***********************************************************************************************************



const crypto = require('crypto');

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  const user = await UserModel.findOne({ email });

  if (!user) return res.status(404).json({ error: "User not found" });

  const token = Math.floor(100000 + Math.random() * 900000).toString();
  user.resetPasswordToken = token;
  user.resetPasswordTokenExpiredAt = Date.now() + 15 * 60 * 1000; // 15 minutes
  await user.save();

  
  await sendVerificationEmail(email, token); 

  res.json({ message: "Reset token sent to email" });
};


const resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;

  const user = await UserModel.findOne({
    resetPasswordToken: token,
    resetPasswordTokenExpiredAt: { $gt: Date.now() }
  });

  if (!user) return res.status(400).json({ error: "Invalid or expired token" });

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  user.password = hashedPassword;
  user.resetPasswordToken = null;
  user.resetPasswordTokenExpiredAt = null;

  await user.save();

  res.json({ message: "Password reset successful" });
};




// ***********************************************************************************************************




const CustomerBookingApi = async (req, res) => {
  try {
    const {
      name, email, number, address,
      checkin, checkout, guests,
      roomType, message, payment
    } = req.body;

  
    const availableRoom = await RoomsModel.findOne({ type: roomType, status: 'Available' });

    if (!availableRoom) {
      return res.status(400).json({ message: 'No rooms available for the selected type.' });
    }

  
    const booking = new CustomerBookingModel({
      name,
      email,
      number,
      address,
      checkin,
      checkout,
      guests,
      roomType,
      message,
      payment,
      paymentStatus: 'Pending'
    });

    await booking.save();

 
    availableRoom.status = 'Booked';
    await availableRoom.save();

    res.status(200).json({ message: 'Your Room is successfully Booked' });

  } catch (err) {
    console.error('Booking Internal error:', err);
    res.status(500).send('Internal error');
  }
};


const getBookinFormData = async (req, res) => {
    try {
        const user = await CustomerBookingModel.find();
        res.status(200).json(user)
    } catch (err) {
        console.log(err)
        res.status(500).send('Internal error');
    }
}

const deleteBooking = async (req, res) => {
    try {
        const { id } = req.params;
        await CustomerBookingModel.findByIdAndDelete(id);
        res.send({ message: "Booking deleted" });
    } catch (err) {
        console.log(err)
        res.status(500).send('Internal error');
    }

};


// Booking to Guest section api

const Guest = require('../model/guestModel');  

// Add guest
const addGuest = async (req, res) => {
  try {
    const guest = new Guest(req.body);
    await guest.save();
    res.status(201).json({ message: 'Guest added successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error adding guest', error });
  }
};

const getGuests = async (req, res) => {
  try {
    const guests = await Guest.find();
    res.status(200).json(guests);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching guests', error });
  }
};


const updatePaymentStatus = async (req, res) => {
  const { id } = req.params;
  const { paymentStatus } = req.body;

  try {
    await CustomerBookingModel.findByIdAndUpdate(id, { paymentStatus });
    res.status(200).json({ message: 'Payment status updated' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update payment status', error });
  }
};

const GuestDeleteData = async (req, res) => {
    try {
        const { id } = req.params;
        await CustomerBookingModel.findByIdAndDelete(id);
        res.send({ message: "Booking deleted" });
    } catch (err) {
        console.log(err)
        res.status(500).send('Internal error');
    }

};






// Api of dashboard Rooms section.............


const RoomApi = async (req, res) => {
    try {
        const roomdata = new RoomsModel(req.body);
        await roomdata.save();
        res.status(200).json({ message: "Room data is stored Successfully" })
    } catch (err) {
        res.status(500).json({ message: "Room storing error" })
    }
}

const GetRoominfo = async (req, res) => {
    try {
        const roomdata = await RoomsModel.find();
        res.status(200).json(roomdata)
    } catch (err) {
        console.log(err)
        res.status(500).send('Rooms Info getting Internal error');
    }
}

const EditRoomData = async (req, res) => {
    try {
        const user = await RoomsModel.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true });
        if (user) {
            console.log('Edit room data success');
            res.status(200).json(user);
        } else {
            console.log('error');
            res.status(404).send('Room data is not edit');
        }
    } catch (err) {
        console.log(err);
        console.log('Edit Internal error');

    }
};

const roomDeleteData = async (req, res) => {
    try {
        const { id } = req.params;
        await RoomsModel.findByIdAndDelete(id);
        res.send({ message: "Booking deleted" });
    } catch (err) {
        console.log(err)
        res.status(500).send('Internal error');
    }

};



const checkRoomAvailability = async (req, res) => {
  const { roomType, checkin, checkout } = req.body;

  try {
    const availableRoom = await RoomsModel.findOne({ status: "Available" });

    if (availableRoom) {
      return res.json({ available: true });
    } else {
      return res.json({ available: false });
    }

  } catch (err) {
    console.error("Error checking room availability:", err);
    res.status(500).json({ error: "Server error" });
  }
};


// // staff section api start here

const addStaffApi = async (req, res) => {
  try {
    const {
      fname,
      lname,
      Email,
      Number,
      Gender,
      Designation,
      Role,
      Staffid,
    } = req.body;

    // checking if image was uploaded
    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }

    // normalize image path for cross-platform compatibility here
    const imagePath = `/uploads/staff/${req.file.filename}`.replace(/\\/g, '/');

    const newStaff = new StaffModel({
      fname,
      lname,
      Email,
      Number,
      Gender,
      Designation,
      Role,
      Staffid,
      imagePath,
    });

    await newStaff.save();
    res.status(200).json({ message: "Staff data saved successfully" });
  } catch (err) {
    console.error("Error saving staff:", err);
    res.status(500).send("Staff API Internal Error");
  }
};


const getstaffdata = async(req,res)=>{
    try{
        const staff = await StaffModel.find();
        if(staff){
            res.status(200).json(staff)
        }else{
            res.status(500).json({message:"staff data getting api error"})
        }
    }catch(err){
        console.log(err);        
         res.status(500).json({message:"staff data getting api error"})
    }
}

// ///

const updateStaff = async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;

  // if a new image is uploaded, update the imagepath field
  if (req.file) {
    updatedData.imagePath = `/uploads/staff/${req.file.filename}`;
  }

  try {
    const updated = await StaffModel.findOneAndUpdate(
      { Staffid: id },
      updatedData,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Staff not found" });
    }

    res.status(200).json(updated);
  } catch (error) {
    console.error("Error updating staff:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


const getEditStaffById = async (req, res) => {
  try {
    const staff = await StaffModel.findOne({ Staffid: req.params.id });
    res.status(200).json(staff);
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

const StaffDeleteData = async (req, res) => {
    try {
        const { id } = req.params;
        await StaffModel.findByIdAndDelete(id);
        res.send({ message: "Booking deleted" });
    } catch (err) {
        console.log(err)
        res.status(500).send('Internal error');
    }

};

// // staff section api finish here


// daybook api starts

const daybookSchema = require('../model/daybookSchema');

const daybookapi = async (req, res) => {
    try {
        const daybook = new daybookSchema(req.body);
        await daybook.save();
        res.status(200).json({ message: "Your daybook added successfully" });


    } catch (err) {
        console.log(err);
        res.status(500).json('daybook Internel error');
    }
}


const getDayookData = async(req,res)=>{
    try{
        const daybookget = await daybookSchema.find();
        if(daybookget){
            res.status(200).json(daybookget)
        }else{
            res.status(500).json({message:"daybook data getting api error"})
        }
    }catch(err){
        console.log(err);        
         res.status(500).json({message:"daybook data getting api error"})
    }
}


const daybookDeleteData = async (req, res) => {
    try {
        const { id } = req.params;
        await daybookSchema.findByIdAndDelete(id);
        res.send({ message: "Booking deleted" });
    } catch (err) {
        console.log(err)
        res.status(500).send('Internal error');
    }

};



// daybook api ends here



module.exports = { CreateUser, LoginUser, CustomerBookingApi, getBookinFormData, deleteBooking, 
    RoomApi, GetRoominfo,
     EditRoomData,getUser,addStaffApi,getstaffdata,addGuest, getGuests , updatePaymentStatus,updateStaff,
    getEditStaffById, GuestDeleteData ,StaffDeleteData, roomDeleteData, VerifyEmail,daybookapi,getDayookData,daybookDeleteData,
    GetProfile, AdminDashboard, forgotPassword, resetPassword, checkRoomAvailability
  }