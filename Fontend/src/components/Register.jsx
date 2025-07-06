import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';

const SignupForm = () => {

    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        userName: "",
        email: "",
        password: "",
        Cpassword: ""
    });
    
    const [isSubmitting, setIsSubmitting] = useState(false);

    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const submitData = async (e) => {
        e.preventDefault();
        
        if (isSubmitting) return;

        if (formData.password !== formData.Cpassword) {
            alert("Passwords do not match!");
            return;
        }

        if (!formData.userName || !formData.email || !formData.password) {
            alert("All fields are required!");
            return;
        }

        setIsSubmitting(true);

        try {
            console.log("Submitting data...");
            console.log("API URL:", apiUrl);
            console.log("Form data:", { ...formData, password: "[HIDDEN]", Cpassword: "[HIDDEN]" });

            const response = await axios.post(`${apiUrl}/user/create`, {
                userName: formData.userName,
                email: formData.email,
                password: formData.password
            }, {
                headers: {
                    'Content-Type': 'application/json',
                },
                timeout: 10000,
            });

            console.log("Response:", response);

            if (response.status === 200) {
                alert("Account created successfully! Please check your email for verification.");
                setFormData({
                    userName: "",
                    email: "",
                    password: "",
                    Cpassword: ""
                });
                // Uncomment when ready to redirect
                // window.location.href = "/emailv";
                navigate("/emailv")
            }
        } catch (err) {
            console.error('Full error object:', err);
            console.error('Error response:', err.response);
            
            if (err.response) {
                
                const errorMessage = err.response.data?.error || err.response.data?.message || 'Server error occurred';
                alert(`Error: ${errorMessage}`);
            } else if (err.request) {
                
                console.error('No response received:', err.request);
                alert('No response from server. Please check if the server is running.');
            } else {
               
                console.error('Request setup error:', err.message);
                alert('Error setting up request. Please try again.');
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen w-full flex flex-col lg:flex-row">
            {/* Left Section - Form */}
            <div className="w-full lg:w-1/2 flex flex-col">
                {/* Header */}
              <div className="flex justify-between items-center p-6 lg:px-24 lg:py-12">
                   <a href="/"> <div className="flex items-center">
                        <div className="w-8 h-8 bg-[#ff6900] rounded-full flex items-center justify-center">
                            <span className="text-white font-bold text-sm">L</span>
                        </div>
                      <span className="ml-2 font-semibold text-gray-800">Logo</span>
                    </div></a>
                    <a href="/login">
                        <button className="px-6 py-2 border border-[#ff6900] text-[#ff6900] rounded-lg hover:bg-[#ff6900] hover:text-white transition-colors duration-300">
                            Sign In
                        </button>
                    </a>
                </div>

                {/* Form Section */}
                <div className="flex-1 px-6 lg:px-24 pb-8">
                    <div className="max-w-md">
                        <h4 className="text-sm text-gray-600 mb-2">Welcome!</h4>
                        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-8 pacifico-font">Please Sign Up</h1>

                        <form onSubmit={submitData} className="space-y-6">
                            <div>
                                <label htmlFor="userName" className="block text-sm font-medium text-gray-700 mb-2">
                                    UserName
                                </label>
                                <input
                                    type="text"
                                    id="userName"
                                    value={formData.userName}
                                    onChange={handleInputChange}
                                    placeholder="Enter User Name"
                                    className="w-full h-12 px-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#ff6900] focus:border-transparent outline-none transition-all"
                                    disabled={isSubmitting}
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                    Email address
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    placeholder="Enter email address"
                                    className="w-full h-12 px-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#ff6900] focus:border-transparent outline-none transition-all"
                                    disabled={isSubmitting}
                                />
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    placeholder="Enter password"
                                    className="w-full h-12 px-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#ff6900] focus:border-transparent outline-none transition-all"
                                    disabled={isSubmitting}
                                />
                            </div>

                            <div>
                                <label htmlFor="Cpassword" className="block text-sm font-medium text-gray-700 mb-2">
                                    Confirm Password
                                </label>
                                <input
                                    type="password"
                                    id="Cpassword"
                                    value={formData.Cpassword}
                                    onChange={handleInputChange}
                                    placeholder="Confirm password"
                                    className="w-full h-12 px-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#ff6900] focus:border-transparent outline-none transition-all"
                                    disabled={isSubmitting}
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`w-full h-12 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 ${
                                    isSubmitting 
                                        ? 'bg-gray-400 text-gray-600 cursor-not-allowed' 
                                        : 'bg-[#ff6900] text-white hover:bg-[#e55a00]'
                                }`}
                            >
                                {isSubmitting ? 'Creating Account...' : 'Sign Up'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            {/* Right Section - Image */}
            <div className="w-full lg:w-1/2 bg-gradient-to-br from-purple-500 to-indigo-600 relative overflow-hidden min-h-64 lg:min-h-screen">
                <img src="/img/logReg2.jpg" alt="Signup illustration" className='object-cover h-[750px] w-full' />
            </div>
        </div>
    );
};

export default SignupForm;