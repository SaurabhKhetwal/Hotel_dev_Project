const express = require('express');
const {CreateUser,LoginUser, CustomerBookingApi, getBookinFormData, deleteBooking, RoomApi, GetRoominfo, EditRoomData, getUser, addStaffApi, getstaffdata, addGuest, getGuests,updatePaymentStatus, updateStaff, getEditStaffById, GuestDeleteData, StaffDeleteData, roomDeleteData, VerifyEmail, daybookapi, getDayookData, daybookDeleteData, AdminDashboard, GetProfile, forgotPassword, resetPassword, checkRoomAvailability } = require('../controller/userController');
const {BookingRoomValidation, validateStaff} = require('../service/BookingRommValidation');
const ensureAuthenticated = require('../utill/auth');
const upload = require('../middleware/upload');
const { verifyToken, checkRole } = require('../utill/authMiddleware');
const router = express.Router();

// signup login router
router.post('/create',CreateUser);
router.post('/login',LoginUser);
router.post('/otpverify', VerifyEmail);

// Protected routes
router.get('/profile', verifyToken, GetProfile);
router.get('/admin/dashboard', verifyToken, checkRole(['admin']), AdminDashboard);

// forget password routes
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);



// booking routes
router.post('/booking',BookingRoomValidation,CustomerBookingApi);
router.get("/getbooking", getBookinFormData);
router.delete('/deletebooking/:id',deleteBooking);

// guest api route
router.post('/addguest', addGuest);   // For adding guest after checkout
router.get('/getguests', getGuests);  // (Optional) If you want to display guest list
router.put('/updatePaymentStatus/:id', updatePaymentStatus);
router.delete('/deleteguestdata/:id',GuestDeleteData);


//  rooms router
router.post('/roominfo',RoomApi);
router.get('/getroominfo',GetRoominfo);
router.put('/editroom/:id',EditRoomData);
router.delete('/deleterooms/:id',roomDeleteData);
router.post("/check-availability", checkRoomAvailability);



// staff api route
router.post('/addStaff', upload.single('image'), addStaffApi);
router.get('/getstaffdata',getstaffdata);
router.get('/geteditstaff/:id', getEditStaffById);
router.put("/updatestaff/:id", upload.single('image'), updateStaff);
router.delete('/deletestaffdata/:id',StaffDeleteData);


// daybook api
router.post('/daybookpost',daybookapi);
router.get('/getdaybook',getDayookData);
router.delete('/deletedaybook/:id',daybookDeleteData);

// jwt token route
router.get('/jwt',ensureAuthenticated, getUser)


module.exports = router;