import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const StaffForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    Email: "",
    Gender: "",
    Designation: "",
    Role: "",
    Staffid: "",
    Number: "",
    image: null,
  });

  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";

  
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

 
  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  
  const submitStaffForm = async (e) => {
    e.preventDefault();

    const staffData = new FormData();
    for (const key in formData) {
      if (formData[key] !== null) {
        staffData.append(key, formData[key]);
      }
    }

    try {
      await axios.post(`${apiUrl}/user/addStaff`, staffData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Employee data saved successfully!");
      navigate("/dashboard/staff");
    } catch (err) {
      console.error("Error submitting form:", err);
      alert("Error submitting form. Please try again.");
    }
  };

  return (
    <>
      <div className="h-12 w-full bg-white text-[#1e2939] rounded-xl mb-2 shadow-md">
        <h1 className="text-center pt-3 font-bold">ADD NEW STAFF</h1>
      </div>

      <form
        onSubmit={submitStaffForm}
        className="w-full bg-white rounded-lg flex flex-col lg:flex-row p-4 gap-4 shadow-md"
      >
        {/* Left: Image Upload + Submit Button */}
        <div className="w-full lg:w-1/3 flex flex-col items-center">
          <div className="w-full h-80 bg-blue-50 rounded-md flex items-center justify-center">
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full h-full opacity-80 cursor-pointer p-4"
            />
          </div>
          <button
            type="submit"
            className="w-full mt-4 bg-[#1e2939] hover:bg-[#bedbff] text-white py-2 rounded-lg"
          >
            Add Staff
          </button>
        </div>

        {/* Middle: Basic Info */}
        <div className="w-full lg:w-1/3 flex flex-col gap-3">
          <label htmlFor="fname">First Name</label>
          <input
            type="text"
            id="fname"
            value={formData.fname}
            onChange={handleChange}
            placeholder="Enter first name"
            className="border border-gray-300 p-2 rounded-md"
            required
          />

          <label htmlFor="lname">Last Name</label>
          <input
            type="text"
            id="lname"
            value={formData.lname}
            onChange={handleChange}
            placeholder="Enter last name"
            className="border border-gray-300 p-2 rounded-md"
            required
          />

          <label htmlFor="Email">Email Address</label>
          <input
            type="email"
            id="Email"
            value={formData.Email}
            onChange={handleChange}
            placeholder="Enter email address"
            className="border border-gray-300 p-2 rounded-md"
            required
          />

          <label htmlFor="Gender">Gender</label>
          <select
            id="Gender"
            value={formData.Gender}
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded-md"
            required
          >
            <option value="">Select gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Right: Other Details */}
        <div className="w-full lg:w-1/3 flex flex-col gap-3">
          <label htmlFor="Role">Role</label>
          <select
            id="Role"
            value={formData.Role}
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded-md"
            required
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
            required
          />

          <label htmlFor="Staffid">Staff ID</label>
          <input
            type="text"
            id="Staffid"
            value={formData.Staffid}
            onChange={handleChange}
            placeholder="Enter Staff ID"
            className="border border-gray-300 p-2 rounded-md"
            required
          />

          <label htmlFor="Number">Mobile Number</label>
          <input
            type="text"
            id="Number"
            value={formData.Number}
            onChange={handleChange}
            placeholder="Enter mobile number"
            className="border border-gray-300 p-2 rounded-md"
            required
          />
        </div>
      </form>
    </>
  );
};

export default StaffForm;

