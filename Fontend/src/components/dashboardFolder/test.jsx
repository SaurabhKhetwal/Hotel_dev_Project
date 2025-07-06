import { useEffect, useState } from "react";
import axios from "axios";

export default function GuestList() {
  const [guests, setGuests] = useState([]);

  useEffect(() => {
    axios.get("/api/guests").then((res) => setGuests(res.data));
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Guest List</h1>
      <table className="w-full table-auto border">
        <thead>
          <tr className="bg-gray-200">
            <th>Name</th>
            <th>Phone</th>
            <th>Room</th>
            <th>Status</th>
            <th>Check-In</th>
            <th>Check-Out</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {guests.map((guest) => (
            <tr key={guest._id}>
              <td>{guest.name}</td>
              <td>{guest.phone}</td>
              <td>{guest.room}</td>
              <td>{guest.status}</td>
              <td>{guest.checkInDate}</td>
              <td>{guest.checkOutDate}</td>
              <td>
                <button onClick={() => {/* view/edit logic */}} className="text-blue-500">View</button>
                <button onClick={() => {/* toggle check-out */}} className="text-green-500 ml-2">Check-Out</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}


// 📄 Guest Dashboard

// [➕ Add New Guest]

// 🔍 Search Guest: [______]    ⌨️ Filter: [ All | Checked-in | Checked-out ]

// | Name        | Phone       | Room | Status      | Check-In | Check-Out | Actions         |
// |-------------|-------------|------|-------------|----------|-----------|-----------------|
// | John Doe    | 9876543210  | 101  | Checked-in  | 2025-05-29 | 2025-06-01 | [View] [Edit] [✔️ Check-Out] |


// //////////////////////////////////////////


// 📄 Staff Management

// [➕ Add New Staff]

// 🔍 Search Staff: [_______]  Filter by: [Department] [Shift]

// | Name        | Role      | Department  | Status   | Shift | Actions           |
// |-------------|-----------|-------------|----------|--------|-------------------|
// | Aisha Khan  | Manager   | Front Desk  | Active   | Morning | [Edit] [Profile] |
// | Ravi Patel  | Cleaner   | Housekeeping| On Leave | Night  | [Edit] [Profile] |



// 🏨 Your current Booking Section:
// You're showing this info:

// pgsql
// Copy
// Edit
// Name | Email | Phone | Check-in | Check-out | Guests | Room Type | Payment | Delete
// This is your live booking data, where current bookings are shown (maybe with an option to delete/cancel or confirm them).

// ✅ Now about the Guest Section:
// The Guest section should ideally act like a historical record or guest log, for tracking past or checked-out guests.

// So yes — what I’m suggesting is:

// ✅ When a booking is marked as "Checked Out", then that data should be:

// ✅ Removed (or hidden) from the active bookings.

// ✅ Saved to the Guest Section.

// 📌 Why have a separate Guest section?
// 📋 You can track past visitors.

// 🧾 Useful for reports, history, analytics.

// 🔄 Booking section stays clean with only active/upcoming bookings.

// 🔐 Keeps records for legal, audit, or CRM purposes.

// Example Guest Section Table:
// pgsql
// Copy
// Edit
// Name | Phone | Room No | Status (Checked Out) | Check-In | Check-Out | Actions (View Details)
// 🔄 Workflow Suggestion:
// User checks out a guest (e.g. via a "Checkout" button).

// The app:

// ✅ Updates that booking status to "Checked Out".

// ✅ Optionally moves it to a separate Guest collection/table in your database.

// ✅ Removes or hides it from the Booking list.

// The Guest section displays all checked-out guests (read-only or with export options).


// ✅ When Admin Marks a Guest as "Checked Out":
// 🔄 Booking Section:

// Admin clicks a "Checkout" button next to a guest's booking.

// That booking’s status is updated to "Checked Out".

// 📤 Backend logic:

// The data is moved (or copied then deleted) from the booking table/collection to the guest table/collection.

// This ensures your Booking Section only shows active/upcoming bookings.

// 📥 Guest Section:

// The checked-out guest’s data is now displayed here.

// This acts as a log/history of all guests who completed their stay.


// npm uninstall jspdf jspdf-autotable