import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        rememberMe: false
    });

    const handleInputChange = (e) => {
        const { id, value, type, checked } = e.target;
        setFormData({ ...formData, [id]: type === 'checkbox' ? checked : value });
    };

    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';

    const submitData = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`${apiUrl}/user/login`, {
                email: formData.email,
                password: formData.password
            });

            if (response.status === 200) {
                alert('User logged in successfully!');

               
                const userData = {
                    email: response.data.email,
                    name: response.data.name, 
                    userName: response.data.name,
                    token: response.data.jwtToken,
                    role: response.data.role,
                    success: response.data.success
                };

                localStorage.setItem("user", JSON.stringify(userData));

              
                localStorage.setItem("token", response.data.jwtToken);

                if (response.data.role === 'admin') {
                    navigate("/dashboard");
                } else {
                    navigate("/");
                }

                console.log("Login response:", response.data);

            }
        } catch (err) {
            console.error('Login error:', err);
            if (err.response?.data?.message) {
                alert(err.response.data.message);
            } else if (err.response?.data?.error) {
                alert(err.response.data.error);
            } else {
                alert('Login failed');
            }
        }
    };

    const handleForgotPassword = () => {
        alert('Password reset functionality would be implemented here!');
    };

    return (
        <div className="min-h-screen w-full flex flex-col lg:flex-row">
            <div className="w-full lg:w-1/2 flex flex-col">
                <div className="flex justify-between items-center p-6 lg:px-24 lg:py-12">
                    <a href="/"> <div className="flex items-center">
                        <div className="w-8 h-8 bg-[#ff6900] rounded-full flex items-center justify-center">
                            <span className="text-white font-bold text-sm">L</span>
                        </div>
                        <span className="ml-2 font-semibold text-gray-800">Logo</span>
                    </div></a>
                    <a href="/register">
                        <button className="px-6 py-2 border border-[#ff6900] text-[#ff6900] rounded-lg hover:bg-[#ff6900] hover:text-white transition-colors duration-300">
                            Sign Up
                        </button>
                    </a>
                </div>

                <div className="flex-1 px-6 lg:px-24 pb-8">
                    <div className="max-w-md">
                        <h4 className="text-sm text-gray-600 mb-2">Welcome back!</h4>
                        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-8 pacifico-font">Please Sign In</h1>

                        <form className="space-y-6" onSubmit={submitData}>
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
                                    required
                                    className="w-full h-12 px-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#ff6900] focus:border-transparent outline-none transition-all"
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
                                    required
                                    className="w-full h-12 px-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#ff6900] focus:border-transparent outline-none transition-all"
                                />
                            </div>

                            <div className="flex justify-between items-center">
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id="rememberMe"
                                        checked={formData.rememberMe}
                                        onChange={handleInputChange}
                                        className="w-4 h-4 text-cyan-500 border-gray-300 rounded focus:ring-cyan-500 focus:ring-2"
                                    />
                                    <label htmlFor="rememberMe" className="ml-2 text-sm text-gray-600">
                                        Remember me
                                    </label>
                                </div>
                               <a href="/forgot-password"> <button
                                    type="button"
                                    onClick={handleForgotPassword}
                                    className="text-sm text-[#ff6900] hover:text-[grey] transition-colors"
                                >
                                    I forgot my password
                                </button></a>
                            </div>

                            <button
                                type="submit"
                                className="w-full h-12 bg-[#ff6900] text-white rounded-xl font-medium hover:from-white hover:to-white hover:text-[white] hover:border hover:border-[#ffaa00] transition-all duration-500 transform hover:scale-105"
                            >
                                Sign In
                            </button>
                        </form>

                        
                    </div>
                </div>
            </div>

            <div className="w-full lg:w-1/2  lg:min-h-screen">
                <img src="/img/logReg1.jpg" alt="" className='object-cover h-[600px] w-full' />
               
            </div>
        </div>
    );
};

export default LoginForm;