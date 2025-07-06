import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router";

const ManualBookingForm = () => {

  const navigate = useNavigate()

const [formData , setformdata] = useState({
  name: "",
  email: "",
  number: "",
  address: "",
  checkin:  "", 
  checkout:"",
  guests: "",
  roomType: "",
  message:  "",
  payment: "",
})

 function handle(e) {
        setformdata({ ...formData, [e.target.id]: e.target.value });
    }

    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000'

    const ManualBookingData = async (e) => {
        e.preventDefault();
        try{            
            const response = await axios.post(`${apiUrl}/user/booking`,formData);
            alert("Your room Booked Successfully");
            navigate("/dashboard/booking")
            
        }catch(err){
            console.log('Error submitting form:', err);
            alert('Error submitting form. Please try again.');
        }
        
    }

    return (
        <>

        <h1 className="text-center text-[3vw] pacifico-font mt-5 mb-1">Book Your room here</h1>

            <form action="" className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-2xl space-y-4">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <input
      type="text"
      placeholder="Full Name"
      id="name"
      value={formData.name}
      onChange={handle}
      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    />

    <input
      type="email"
      placeholder="Email Address"
      id="email"
      value={formData.email}
      onChange={handle}
      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    />

    <input
      type="number"
      placeholder="Phone Number"
      id="number"
      value={formData.number}
      onChange={handle}
      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    />

    <input
      type="text"
      placeholder="Your Address"
      id="address"
      value={formData.address}
      onChange={handle}
      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    <label htmlFor="checkin" className="">Chek In
    <input
      type="date"
      placeholder="Check-in Date"
      id="checkin"
      value={formData.checkin}
      onChange={handle}
      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    </label>
    <label htmlFor="checkout">Chek Out
    <input
      type="date"
      placeholder="Check-out Date"
      id="checkout"
      value={formData.checkout}
      onChange={handle}
      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    </label>
    <input
      type="number"
      placeholder="Number of Guests"
      id="guests"
      value={formData.guests}
      onChange={handle}
      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    />

    <select
      id="roomType"
      className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      value={formData.roomType}
      onChange={handle}
    >
      <option value="">Select Room Type</option>
      <option value="Deluxe">Deluxe</option>
      <option value="Suite">Suite</option>
      <option value="Single">Single</option>
    </select>

    <input
      type="text"
      placeholder="Special Requests (e.g., late check-in, allergies)"
      id="message"
      value={formData.message}
      onChange={handle}
      className="md:col-span-2 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    />

    <select
      id="payment"
      value={formData.payment}
      onChange={handle}
      className="md:col-span-2 w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <option value="">Select Payment Method</option>
      <option value="Pay Now">Pay Now</option>
      <option value="Pay at Hotel">Pay at Hotel</option>
    </select>
  </div>

  <div className="text-center">
    <button
      type="submit"
      className="w-full md:w-auto bg-[#FF6900] text-white px-6 py-3 rounded-xl hover:bg-[#E11162] transition"
      onClick={ManualBookingData}
    >
      Book Now
    </button>
  </div>
</form>


        </>
    )
}

export default ManualBookingForm;