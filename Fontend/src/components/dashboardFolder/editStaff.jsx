import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditStaffForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    Email: "",
    Gender: "",
    Designation: "",
    Role: "",
    Staffid: "",
    Number: "",
  });

  const [selectedFile, setSelectedFile] = useState(null);

  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";

  const getEditStaff = async () => {
    try {
      const res = await axios.get(`${apiUrl}/user/geteditstaff/${id}`);
      setFormData(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getEditStaff();
  }, []);

 
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

 
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };


  const updateStaff = async () => {
    try {
      const data = new FormData();


      Object.entries(formData).forEach(([key, value]) => {
        data.append(key, value);
      });


      if (selectedFile) {
        data.append("image", selectedFile);
      }

      await axios.put(`${apiUrl}/user/updatestaff/${id}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Staff updated successfully");
      navigate("/dashboard/staff");
    } catch (err) {
      console.error("Update error:", err);
      alert("Failed to update staff.");
    }
  };

  return (
    <>
      <div className="h-12 w-full bg-white text-[#1e2939] rounded-xl mb-2 shadow-md">
        <h1 className="text-center pt-3 font-bold">EDIT STAFF</h1>
      </div>
      <div className="w-full bg-white rounded-lg flex flex-col lg:flex-row p-4 gap-4 shadow-md">
        {/* left Section = image Upload & button */}
        <div className="w-full lg:w-1/3 flex flex-col items-center">
          <div className="w-full h-80 bg-blue-50 rounded-md flex items-center justify-center">
            <input
              type="file"
              id="input-file"
              className="w-full h-full opacity-80 cursor-pointer p-4"
              onChange={handleFileChange}
            />
          </div>

          <button
            onClick={updateStaff}
            className="w-full mt-4 bg-[#1e2939] hover:bg-[#bedbff] text-white py-2 rounded-lg"
          >
            EDIT STAFF
          </button>
        </div>

        {/* Middle Section */}
        <div className="w-full lg:w-1/3 flex flex-col gap-3">
          <label htmlFor="fname">First Name</label>
          <input
            type="text"
            id="fname"
            value={formData.fname}
            onChange={handleChange}
            placeholder="Enter first name"
            className="border border-gray-300 p-2 rounded-md"
          />

          <label htmlFor="lname">Last Name</label>
          <input
            type="text"
            id="lname"
            value={formData.lname}
            onChange={handleChange}
            placeholder="Enter last name"
            className="border border-gray-300 p-2 rounded-md"
          />

          <label htmlFor="Email">Email Address</label>
          <input
            type="email"
            id="Email"
            value={formData.Email}
            onChange={handleChange}
            placeholder="Enter email address"
            className="border border-gray-300 p-2 rounded-md"
          />

          <label htmlFor="Gender">Gender</label>
          <select
            id="Gender"
            value={formData.Gender}
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded-md"
          >
            <option value="">Select gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Right Section */}
        <div className="w-full lg:w-1/3 flex flex-col gap-3">
          <label htmlFor="Role">Role</label>
          <select
            id="Role"
            value={formData.Role}
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded-md"
          >
            <option value="">Select a role</option>
            <option value="Ceo">Ceo</option>
            <option value="Founder">Founder</option>
            <option value="GM">GM</option>
            <option value="Malik">Malik</option>
          </select>

          <label htmlFor="Designation">Designation</label>
          <input
            type="text"
            id="Designation"
            value={formData.Designation}
            onChange={handleChange}
            placeholder="Enter designation"
            className="border border-gray-300 p-2 rounded-md"
          />

          <label htmlFor="Staffid">Staff ID</label>
          <input
            type="text"
            id="Staffid"
            value={formData.Staffid}
            onChange={handleChange}
            placeholder="Enter Staff ID"
            className="border border-gray-300 p-2 rounded-md"
          />

          <label htmlFor="Number">Mobile Number</label>
          <input
            type="text"
            id="Number"
            value={formData.Number}
            onChange={handleChange}
            placeholder="Enter mobile number"
            className="border border-gray-300 p-2 rounded-md"
          />
        </div>
      </div>
    </>
  );
};

export default EditStaffForm;
