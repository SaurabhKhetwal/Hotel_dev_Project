import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const AddNewRoom = ({ refreshRooms }) => {

const navigate = useNavigate()
  const [showForm, setShowForm] = useState(false);
  const [newRoom, setNewRoom] = useState({
    roomNum: "",
    type: "",
    status: "",
    price: "",
    floor: "",
    description: "",
    amenities: "",
  });

  const handleAddRoom = async (e) => {
    e.preventDefault();
    try {
      const formattedRoom = {
        ...newRoom,
        amenities: newRoom.amenities
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),
      };

      const res = await axios.post(`${apiUrl}/user/roominfo`, formattedRoom);

      if (res.status === 200) {
        alert("Room added successfully!");
        
        // Reset form
        setNewRoom({
          roomNum: "",
          type: "",
          status: "",
          price: "",
          floor: "",
          description: "",
          amenities: "",
        });
        setShowForm(false);

        // Optional: refresh room list
        if (refreshRooms) refreshRooms();
        navigate("/dashboard/rooms")
      } else {
        alert("Failed to add room.");
      }
    } catch (err) {
      console.error("Error adding room:", err);
      alert("Error occurred. Try again.");
    }
  };

  return (
    <>
     
        <h1 className="text-center text-[3vw]  mt-5 mb-1">Add new room here</h1>

        <form
          onSubmit={handleAddRoom}
          className="mb-6 grid grid-cols-2 gap-4 bg-gray-100 p-4 rounded-lg shadow"
        >
            
          <input
            type="text"
            placeholder="Room Number"
            value={newRoom.roomNum}
            onChange={(e) =>
              setNewRoom({ ...newRoom, roomNum: e.target.value })
            }
            className="border px-3 py-2 rounded"
            required
          />

          <input
            type="text"
            placeholder="Type"
            value={newRoom.type}
            onChange={(e) =>
              setNewRoom({ ...newRoom, type: e.target.value })
            }
            className="border px-3 py-2 rounded"
            required
          />

          <select
            value={newRoom.status}
            onChange={(e) =>
              setNewRoom({ ...newRoom, status: e.target.value })
            }
            className="border px-3 py-2 rounded"
            required
          >
            <option value="">Select Status</option>
            <option value="Available">Available</option>
            <option value="Booked">Booked</option>
            <option value="Cleaning">Cleaning</option>
          </select>

          <input
            type="text"
            placeholder="Price"
            value={newRoom.price}
            onChange={(e) =>
              setNewRoom({ ...newRoom, price: e.target.value })
            }
            className="border px-3 py-2 rounded"
            required
          />

          {/* <input
            type="text"
            placeholder="Floor"
            value={newRoom.floor}
            onChange={(e) =>
              setNewRoom({ ...newRoom, floor: e.target.value })
            }
            className="border px-3 py-2 rounded"
          /> */}

          {/* <input
            type="text"
            placeholder="Description"
            value={newRoom.description}
            onChange={(e) =>
              setNewRoom({ ...newRoom, description: e.target.value })
            }
            className="border px-3 py-2 rounded"
          /> */}

          {/* <input
            type="text"
            placeholder="Amenities (comma-separated)"
            value={newRoom.amenities}
            onChange={(e) =>
              setNewRoom({ ...newRoom, amenities: e.target.value })
            }
            className="border px-3 py-2 rounded"
          /> */}

          <button
            type="submit"
            className="col-span-2 bg-[#1e2939] text-white px-4 py-2 rounded hover:bg-[#bedbff]"
          >
            Submit Room
          </button>
        </form>
   
    </>
  );
};

export default AddNewRoom;
