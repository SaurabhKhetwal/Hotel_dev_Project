import axios from "axios";
import React, { useEffect, useState } from "react";
import { IoMdAddCircleOutline } from "react-icons/io";
import { IoIosSearch } from "react-icons/io";

const Rooms = () => {
    const [rooms, setRooms] = useState([]);
    const [editIndex, setEditIndex] = useState(null);

    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';

    const handleEdit = (index) => {
        setEditIndex(index);
    };

    const handleInputChange = (index, field, value) => {
        const updated = [...rooms];
        updated[index][field] = value;
        setRooms(updated);
    };

    const handleStatusChange = (index, newStatus) => {
        const updated = [...rooms];
        updated[index].status = newStatus;
        setRooms(updated);
    };

    // Api
    const handleSave = async () => {
        const updatedRoom = rooms[editIndex];

        if (!updatedRoom._id) {
            alert("Room ID not found. Cannot update.");
            return;
        }

        try {
            const response = await axios.put(
                `${apiUrl}/user/editroom/${updatedRoom._id}`,
                updatedRoom
            );

            if (response.status === 200) {
                alert("Room info updated successfully.");
            } else {
                alert("Failed to update room info.");
            }
        } catch (err) {
            console.error("Error updating room:", err);
            alert("Error updating room. Please try again.");
        }

        setEditIndex(null);
    };

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await axios.get(`${apiUrl}/user/getroominfo`);
                if (response.status === 200) {
                    setRooms(response.data);
                }
            } catch (err) {
                console.error("Error fetching rooms:", err);
                alert("Failed to fetch room data.");
            }
        };

        getData();
    }, []);

    // search code
    const [searchTerm, setSearchTerm] = useState("");

    const filteredRooms = rooms.filter((room) => {
        const search = searchTerm.toLowerCase();
        return (
            room.roomNum?.toString().toLowerCase().includes(search) ||
            room.type?.toLowerCase().includes(search) ||
            room.status?.toLowerCase().includes(search) ||
            room.price?.toString().includes(search)
        );
    });

    // delete rooms api

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
            await axios.delete(`${apiUrl}/user/deleterooms/${id}`);
            setRooms((prevData) => prevData.filter((item) => item._id !== id));
            alert("Room data delete successfully")
        } catch (error) {
            console.error("Error deleting booking:", error);
        }
    };


    return (
        <>


            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-0 mb-5">
                {/* Add Room Button */}
                <a href="/dashboard/addroom">
                    <button className="px-4 py-2 bg-[#212c3c] text-white rounded hover:bg-[#bedbff] flex items-center">
                        <IoMdAddCircleOutline className="mr-2" />
                        ADD NEW ROOM
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

            <table className="min-w-full text-sm text-gray-800 bg-white rounded-xl overflow-hidden shadow-md">
                <thead className="text-xs text-white uppercase tracking-wider bg-gradient-to-r from-gray-800 to-gray-700">
                    <tr>
                        <th className="px-6 py-4 text-left">Room</th>
                        <th className="px-6 py-4 text-left">Type</th>
                        <th className="px-6 py-4 text-left">Status</th>
                        <th className="px-6 py-4 text-left">Price</th>
                        <th className="px-6 py-4 text-left">Action</th>
                        <th className="px-6 py-4 text-left">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredRooms.map((data, index) => (
                        <tr key={data._id || index} id="dataTd" className="border-t hover:bg-gray-50">
                            <td className="px-6 py-4">{data.roomNum}</td>

                            <td className="px-6 py-4">
                                {editIndex === index ? (
                                    <input
                                        value={data.type}
                                        onChange={(e) =>
                                            handleInputChange(index, "type", e.target.value)
                                        }
                                        className="border px-2 py-1 rounded"
                                    />
                                ) : (
                                    data.type
                                )}
                            </td>

                            <td className="px-6 py-4">
                                <select
                                    value={data.status}
                                    onChange={(e) => handleStatusChange(index, e.target.value)}
                                    className="w-full px-2 py-1 border rounded"
                                >
                                    <option value="" disabled>
                                        Select Status
                                    </option>
                                    <option value="Booked">Booked</option>
                                    <option value="Available">Available</option>
                                    <option value="Cleaning">Cleaning</option>
                                </select>
                            </td>

                            <td className="px-6 py-4">
                                {editIndex === index ? (
                                    <input
                                        type="text"
                                        value={data.price}
                                        onChange={(e) =>
                                            handleInputChange(index, "price", e.target.value)
                                        }
                                        className="border px-2 py-1 rounded"
                                    />
                                ) : (
                                    `${data.price} Rs`
                                )}
                            </td>

                            <td className="px-6 py-4">
                                {editIndex === index ? (
                                    <button
                                        onClick={handleSave}
                                        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                                    >
                                        Save
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => handleEdit(index)}
                                        className="px-4 py-2 bg-[#212c3c] text-white rounded hover:bg-[#bedbff]"
                                    >
                                        Edit
                                    </button>
                                )}
                            </td>

                            <td className="px-4 py-2">
                                <button
                                    onClick={() => confirmDelete(data._id)}
                                    className="bg-[#2c3849] text-white px-3 py-1 rounded hover:bg-blue-700"
                                >
                                    DELETE
                                </button>
                            </td>


                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
};

export default Rooms;



// example for understanding searhing
// "hello".includes("")   // true
// "room1".includes("")   // true
// "Booked".includes("")  // true

// //  var a = [10,20,30];

//         const filter = a.filter((b)=>{
//           return(b.toString().includes(""));
//         })

//         console.log(filter)