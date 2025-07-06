import React from "react";

const ManageBookings = () => {
  return (
    <div className="min-h-[60vh] flex items-center justify-center bg-gray-100 px-4">
      <div className="text-center bg-white p-10 rounded-2xl shadow-md w-full max-w-xl">
        <h1 className="text-3xl md:text-4xl font-bold text-orange-500 mb-4 pacifico-font">
          Manage Your Bookings
        </h1>
        <p className="text-gray-600 text-lg">
          View, modify, or cancel your bookings. This section will help you stay in control of your hotel reservations.
        </p>

        <div className="mt-6 text-gray-500 italic">
    
          Booking management coming soon...
        </div>
      </div>
    </div>
  );
};

export default ManageBookings;
