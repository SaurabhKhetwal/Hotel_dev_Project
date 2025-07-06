import axios from "axios";
import React, { useEffect, useState } from "react";
import { IoMdAddCircleOutline } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { IoIosSearch } from "react-icons/io";

const Staff = () => {
  const navigate = useNavigate();
  const [staffList, setStaffList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";

  // fetch staff data
  const fetchStaff = async () => {
    try {
      const response = await axios.get(`${apiUrl}/user/getstaffdata`);
      setStaffList(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchStaff();
  }, []);

  // Filter staff based on search
  const filteredStaff = staffList.filter((staff) => {
    const search = searchTerm.trim().toLowerCase();
    return (
      staff.Staffid?.toLowerCase().includes(search) ||
      staff.fname?.toLowerCase().includes(search) ||
      staff.lname?.toLowerCase().includes(search) ||
      staff.Email?.toLowerCase().includes(search) ||
      staff.Gender?.toLowerCase().includes(search) ||
      staff.Designation?.toLowerCase().includes(search) ||
      staff.Role?.toLowerCase().includes(search) ||
      staff.Number?.toLowerCase().includes(search)
    );
  });

 
  const handleEdit = (id) => {
    navigate(`/dashboard/staffform/${id}`);
  };

  // delete staff data api

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
          await axios.delete(`${apiUrl}/user/deletestaffdata/${id}`);
          setStaffList((prevData) => prevData.filter((item) => item._id !== id));
          alert("Staff data delete successfully")
        } catch (error) {
          console.error("Error deleting booking:", error);
        }
      };

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-0 mb-5">
        <button
          onClick={() => navigate("/dashboard/staffform")}
          className="px-4 py-2 bg-[#212c3c] text-white rounded hover:bg-[#bedbff] flex items-center"
        >
          <IoMdAddCircleOutline className="mr-2" />
          ADD NEW STAFF
        </button>

        <div className="relative w-full sm:w-auto flex items-center">
          <input
            type="text"
            placeholder="Search here"
            className="border border-black w-full sm:w-[250px] rounded-xl pl-5 pr-10 py-2 bg-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <IoIosSearch className="absolute right-3 text-gray-500" />
        </div>
      </div>

      <div className="relative overflow-x-auto">
        <table className="min-w-full text-sm text-gray-800 bg-white rounded-xl overflow-hidden shadow-md">
          <thead className="text-xs text-white uppercase tracking-wider bg-gradient-to-r from-gray-800 to-gray-700">
            <tr>
              <th className="px-6 py-3">Image</th>
              <th className="px-6 py-3">ID</th>
              <th className="px-6 py-3">First Name</th>
              <th className="px-6 py-3">Last Name</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Gender</th>
              <th className="px-6 py-3">Designation</th>
              <th className="px-6 py-3">Role</th>
              <th className="px-6 py-3">Number</th>
              <th className="px-6 py-3">Edit</th>
              <th className="px-6 py-3">Delete</th>
              
            </tr>
          </thead>
          <tbody>
            {filteredStaff.map((staff) => (
              <tr key={staff._id || staff.Staffid} className="bg-white border-b">

                <td className="px-6 py-3">
                  {staff.imagePath && (
                    <img
                      src={`${apiUrl}${staff.imagePath}`}
                      alt="Staff"
                      className="h-10 w-10 object-cover rounded-full"
                    />
                  )}
                </td>

                <td className="px-6 py-3">{staff.Staffid}</td>
                <td className="px-6 py-3">{staff.fname}</td>
                <td className="px-6 py-3">{staff.lname}</td>
                <td className="px-6 py-3">{staff.Email}</td>
                <td className="px-6 py-3">{staff.Gender}</td>
                <td className="px-6 py-3">{staff.Designation}</td>
                <td className="px-6 py-3">{staff.Role}</td>
                <td className="px-6 py-3">{staff.Number}</td>
                <td className="px-6 py-3">
                  <button
                    onClick={() => handleEdit(staff.Staffid)}
                    className="px-4 py-2 bg-[#2c3849] text-white rounded hover:bg-blue-700 text-xs"
                  >
                    Edit
                  </button>
                </td>

                <td className="px-4 py-2">
                  <button
                    onClick={() => confirmDelete(staff._id)}
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
    </>
  );
};

export default Staff;
