import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './components/HomePage'
import SignupForm from './components/Register';
import LoginForm from './components/Login'
import MainLayout from './components/MainLayout';
import AboutUS from './components/AboutUS'
import Bookings from './components/dashboardFolder/Bookings'
import BookingForm from './components/dashboardFolder/bookingForm'
import Dashboard from './components/dashboardFolder/dashboard'
import Rooms from './components/dashboardFolder/roomsSection'
import AddNewRoom from './components/dashboardFolder/addNewRoomForm'
import StaffForm from './components/dashboardFolder/staffForm'
import Staff from './components/dashboardFolder/staff'
import GuestPage from './components/dashboardFolder/guest'
import EditStaffForm from './components/dashboardFolder/editStaff'
import ManualBookingForm from './components/dashboardFolder/ManualBookingF'
import DashboardData from './components/dashboardFolder/dashboardData'
import Mailverify from "./components/verifyEmail"
import DaybookForm from './components/dashboardFolder/daybookForm'
import DaybookSection from './components/dashboardFolder/daybookSection'

import PrivateRoute from './components/PrivateRoute';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import Restorent from './components/restorent';
import Service from './components/Service';
import Party from './components/Party';
import ContactUs from './components/ContactUs';
import ManageBookings from './components/ManageBookings';


function App() {
  return (
    <>
      <Router>
        <Routes>
       
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path='/about' element={<AboutUS />}/>
            <Route path='/restorent' element={<Restorent />}/>
            <Route path="/service" element={<Service />} />
            <Route path="/party" element={<Party />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/manage-bookings" element={<ManageBookings />} />
          
          </Route>

         
          <Route path="/register" element={<SignupForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/emailv" element={<Mailverify />}/>
          <Route path='/bookingform' element={<BookingForm />}/>
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />


    
          {/* //// Dashboard */}
          <Route path="/dashboard" element={ <PrivateRoute> <Dashboard /> </PrivateRoute> }>
          {/* <Route path='/dashboard/dashboardData' element={<DashboardData />}/> */}
          <Route index element={<DashboardData />}/>
          <Route path='/dashboard/booking' element={<Bookings/>}/>
          <Route path='/dashboard/rooms' element={<Rooms />}/> 
          <Route path='/dashboard/addroom' element={<AddNewRoom />}/> 
          <Route path='/dashboard/staff' element={<Staff />}/>
          <Route path='/dashboard/staffform' element={<StaffForm />}/>
          <Route path='/dashboard/guest' element={<GuestPage />}/>
          <Route path='/dashboard/staffform/:id' element={<EditStaffForm />}/>
          <Route path='/dashboard/menualbooking' element={<ManualBookingForm />}/>
          <Route path='/dashboard/daybookform' element={<DaybookForm />}/>
          <Route path='/dashboard/daybook' element={<DaybookSection />}/>

          </Route>
        </Routes>
      </Router>
    </>
  )
}

export default App;

