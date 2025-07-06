import React, { useEffect, useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { IoIosSearch } from "react-icons/io";
 
const GuestPage = () => {
  const [guests, setGuests] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";

  const fetchGuests = async () => { 
    try {
      const response = await axios.get(`${apiUrl}/user/getguests`);
      setGuests(response.data);  
    } catch (error) {
      console.error("Error fetching guest data:", error);
    }
  };

  useEffect(() => {
    fetchGuests();
  }, []);

  // Delete guest data api

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
        await axios.delete(`${apiUrl}/user/deleteguestdata/${id}`);
        setGuests((prevData) => prevData.filter((item) => item._id !== id));
        alert("Guest data delete successfully")
      } catch (error) {
        console.error("Error deleting booking:", error); 
      }
    };

  const downloadPDF = (guest) => {
    const doc = new jsPDF();
    doc.text("Guest Booking Details", 14, 15);
    doc.autoTable({
      startY: 25,
      head: [["Field", "Value"]],
      body: [
        ["Name", guest.name],
        ["Email", guest.email],
        ["Phone", guest.number],
        ["Check-In", new Date(guest.checkin).toLocaleDateString()],
        ["Check-Out", new Date(guest.checkout).toLocaleDateString()],
        ["Guests", guest.guests],
        ["Room Type", guest.roomType],
        ["Payment Method", guest.payment],
        ["Payment Status", guest.paymentStatus || "N/A"],
      ],
    });
    doc.save(`${guest.name.replace(/\s+/g, "_")}_Booking.pdf`);
  };

  // Filter guests based on search input
  const filteredGuests = guests.filter((guest) => {
    const query = searchQuery.toLowerCase();
    return (
      guest.name.toLowerCase().includes(query) ||
      guest.email.toLowerCase().includes(query) ||
      guest.number.toLowerCase().includes(query) ||
      new Date(guest.checkin).toLocaleDateString().toLowerCase().includes(query) ||
      new Date(guest.checkout).toLocaleDateString().toLowerCase().includes(query) ||
      String(guest.guests).toLowerCase().includes(query) ||
      guest.roomType.toLowerCase().includes(query) ||
      guest.payment.toLowerCase().includes(query) ||
      (guest.paymentStatus?.toLowerCase().includes(query) || false)
    );
  });

   

  return (

   
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-3xl font-bold text-gray-800">Guest Booking History</h1>

        {/* Search Input with Icon */}
        <div className="relative w-full md:w-80">
          <input
            type="text"
            placeholder="Search by name, email or phone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-2 pl-10 border bg-white border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <IoIosSearch className="absolute left-3 top-2.5 text-gray-500 text-xl pointer-events-none" />
        </div>
      </div>

      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="min-w-full text-sm text-gray-800">
          <thead className="text-xs text-white uppercase bg-gray-700">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Phone</th>
              <th className="px-4 py-3">Check-In</th>
              <th className="px-4 py-3">Check-Out</th>
              <th className="px-4 py-3">Guests</th>
              <th className="px-4 py-3">Room Type</th>
              <th className="px-4 py-3">Payment</th>
              <th className="px-4 py-3">Payment Status</th>
              <th className="px-4 py-3">Download</th>
              <th className="px-4 py-3">Delete</th>
            </tr>
          </thead>
          <tbody>
            {filteredGuests.map((guest, index) => (
              <tr key={index} className="border-b">
                <td className="px-4 py-2">{guest.name}</td>
                <td className="px-4 py-2">{guest.email}</td>
                <td className="px-4 py-2">{guest.number}</td>
                <td className="px-4 py-2">{new Date(guest.checkin).toLocaleDateString()}</td>
                <td className="px-4 py-2">{new Date(guest.checkout).toLocaleDateString()}</td>
                <td className="px-4 py-2">{guest.guests}</td>
                <td className="px-4 py-2">{guest.roomType}</td>
                <td className="px-4 py-2">{guest.payment}</td>
                <td className="px-4 py-2">{guest.paymentStatus?.trim() || "N/A"}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => downloadPDF(guest)}
                    className="bg-[#2c3849] text-white px-3 py-1 rounded hover:bg-blue-700"
                  >
                    PDF
                  </button>
                </td>

              <td className="px-4 py-2">
                  <button
                    onClick={() => confirmDelete(guest._id)}
                    className="bg-[#2c3849] text-white px-3 py-1 rounded hover:bg-blue-700"
                  >
                    DELETE
                  </button>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredGuests.length === 0 && (
        <p className="text-center text-gray-500 mt-4">No guests found.</p>
      )}
    </div>
  );
};

export default GuestPage;



// npm install jspdf@2.5.1 jspdf-autotable@3.5.28
// npm install jspdf jspdf-autotable
