import axios from "axios";
import React, { useState, useEffect } from "react";
import { IoMdAddCircleOutline } from "react-icons/io";
import { IoIosSearch } from "react-icons/io";

const Bookings = () => {
  const [formdata, setformdata] = useState([]);

  const confirmPayment = (index, newStatus) => {
    const pay = prompt("If you want to really update the data so write = yes");
    if (pay === "yes") {
      handleStatusChange(index, newStatus)
    } else {
      return;
    }
  }

  const handleStatusChange = async (index, newStatus) => {
    const updated = [...formdata];
    const bookingId = updated[index]._id;

    try {
      await axios.put(`${apiUrl}/user/updatePaymentStatus/${bookingId}`, {
        paymentStatus: newStatus,
      });

      updated[index].paymentStatus = newStatus;
      setformdata(updated);
    } catch (error) {
      console.error("Error updating payment status:", error);
      alert("Failed to update payment status.");
    }
  };


  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';

  const GetData = async () => {
    try {
      const getResponse = await axios.get(`${apiUrl}/user/getbooking`);
      setformdata(getResponse.data);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

   useEffect(() => {
    GetData();
  }, []);


  const confirmDelete = (id) => {
    const cdelete = prompt("Do you really want to delete data so write yes = yes")

    if (cdelete === "yes") {
      handleDelete(id)
    } else {
      return;
    }
  }

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${apiUrl}/user/deletebooking/${id}`);
      setformdata((prevData) => prevData.filter((item) => item._id !== id));
    } catch (error) {
      console.error("Error deleting booking:", error);
    }
  };


 

  // Post api for guest section

  const confirmChekout = (fdata) => {
    const Cchekout = prompt("Do you really send data to the guest section the write yes = yes")
    if (Cchekout === "yes") {
      bokingtoguest(fdata)
    } else {
      return;
    }
  }

  const bokingtoguest = async (guestData) => {
    try {
      //  POST to guest section
      await axios.post(`${apiUrl}/user/addguest`, guestData);
      console.log(guestData);


      //  DELETE from bookings
      await axios.delete(`${apiUrl}/user/deletebooking/${guestData._id}`);

      //  Update UI
      setformdata((prevData) =>
        prevData.filter((item) => item._id !== guestData._id)
      );

      alert("Guest successfully checked out and moved to guest section.");
    } catch (error) {
      console.error("Error checking out guest:", error);
      alert("Checkout failed.");
    }
  };

  // search code
  const [searchTerm, setSearchTerm] = useState("");

  const filteredRooms = formdata.filter((booking) => {
    const search = searchTerm.trim().toLowerCase();
    return (
      booking.name?.toLowerCase().includes(search) ||
      booking.email?.toLowerCase().includes(search) ||
      booking.number?.toString().toLowerCase().includes(search) ||
      new Date(booking.checkin).toLocaleDateString().toLowerCase().includes(search) ||
      new Date(booking.checkout).toLocaleDateString().toLowerCase().includes(search) ||
      booking.guests?.toString().toLowerCase().includes(search) ||
      booking.roomType?.toLowerCase().includes(search) ||
      booking.payment?.toLowerCase().includes(search) ||
      booking.paymentStatus?.toLowerCase().includes(search)
    );
  });


  return (
    <>


      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-0 mb-5">
        {/* Add Room Button */}
        <a href="/dashboard/menualbooking">
        <button className="px-4 py-2 bg-[#212c3c] text-white rounded hover:bg-[#bedbff] flex items-center">
          <IoMdAddCircleOutline className="mr-2" />
          ADD NEW BOOKING
        </button>
        </a>

        {/* Search Input with Icon */}
        <div className="relative w-full sm:w-auto flex items-center">
          <input
            type="text"
            className="border border-black w-full sm:w-[250px] rounded-xl pl-5 pr-10 py-2 bg-white"
            placeholder="Search here"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <IoIosSearch className="absolute right-3 text-gray-500" />
        </div>
      </div>



      {/* /// */}

      <div className="relative overflow-x-auto">
        <table className="min-w-full text-sm text-gray-800 bg-white rounded-xl overflow-hidden shadow-md">
          <thead className="text-xs text-white uppercase tracking-wider bg-gradient-to-r from-gray-800 to-gray-700">
            <tr>
              <th className="px-6 py-3">Guest Name</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Phone</th>
              <th className="px-6 py-3">Check-in</th>
              <th className="px-6 py-3">Check-out</th>
              <th className="px-6 py-3">Guests</th>
              <th className="px-6 py-3">Room Type</th>
              <th className="px-6 py-3">Payment Mode</th>
              <th className="px-6 py-3">Payment Status</th>
              <th className="px-6 py-3">Action</th>
              <th className="px-6 py-3">Delete</th>
            </tr>
          </thead>
          <tbody>
            {filteredRooms.map((fdata, index) => (
              <tr key={index} className="bg-white border-b">
                <td className="px-6 py-3">{fdata.name}</td>
                <td className="px-6 py-3">{fdata.email}</td>
                <td className="px-6 py-3">{fdata.number}</td>
                <td className="px-6 py-3">{new Date(fdata.checkin).toLocaleDateString()}</td>
                <td className="px-6 py-3">{new Date(fdata.checkout).toLocaleDateString()}</td>
                <td className="px-6 py-3">{fdata.guests}</td>
                <td className="px-6 py-3">{fdata.roomType}</td>
                <td className="px-6 py-3">{fdata.payment}</td>
                <td className="px-6 py-3">

                  <select
                    value={fdata.paymentStatus}
                    onChange={(e) => confirmPayment(index, e.target.value)}
                    className="w-50 px-2 py-1 border rounded"
                  >
                    <option value="" disabled>
                      Select Status
                    </option>
                    <option value="Pending">Pending</option>
                    <option value="Payment Complete">Payment Complete</option>
                  </select>

                </td>
                <td>
                  <button
                    className="px-4 py-2 bg-[#2c3849] text-white rounded hover:bg-blue-700 text-xs"
                    onClick={() => confirmChekout(fdata)}
                  >
                    Check Out
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => confirmDelete(fdata._id)}
                    className="px-4 py-2 bg-[#2c3849] text-white rounded hover:bg-blue-700 text-xs ml-3"
                  >
                    Delete
                  </button>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Bookings;



// Name | Email | Phone | Check-in Date | Check-out Date | Guests | Room Type | Payment | Status | Actions


// 📌 About the "Status" Column:
// It helps admins easily see:

// Pending – Guest has booked but not checked in.

// Checked In – Guest is currently staying.

// Checked Out – Guest has left (then you'll move their data to Guest Section).

// ✅ Actions Column (Buttons):
// Check In → Marks the guest as checked in.

// Check Out → Marks them as checked out and moves them to Guest Section.

// Delete → Removes booking if needed.

// | Name  | Email | Phone | Check-In | Check-Out | Guests | Room Type | **Payment** | **Status** | **Actions**       |
// | ----- | ----- | ----- | -------- | --------- | ------ | --------- | ----------- | ---------- | ----------------- |
// | John  | ...   | ...   | ...      | ...       | ...    | Deluxe    | ✅ Completed | Checked In | Check Out, Delete |
// | Sarah | ...   | ...   | ...      | ...       | ...    | Standard  | ❌ Pending   | Pending    | Check In, Delete  |


// | Name | Phone | Room Type | Payment Mode | **Payment Status** | Actions              |
// | ---- | ----- | --------- | ------------ | ------------------ | -------------------- |
// | A    | ...   | Deluxe    | Pay Now      | ✅ Completed        | Check-In, Check-Out  |
// | B    | ...   | Standard  | Pay at Hotel | ❌ Pending          | Mark as Paid, Delete |


// ✅ What to Do in Your Code
// In your backend or frontend:

// Show "Mark as Paid" button only if:

// paymentMode === "Pay at Hotel"

// paymentStatus === "Pending"

// jsx
// Copy
// Edit
// {data.paymentMode === "Pay at Hotel" && data.paymentStatus === "Pending" && (
//   <button onClick={() => markAsPaid(data._id)}>Mark as Paid</button>
// )}


