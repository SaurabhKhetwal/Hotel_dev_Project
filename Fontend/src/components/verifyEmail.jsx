import axios from "axios";
import React, { useState } from "react";

const Mailverify = () => {
    const [formData, setformData] = useState({
        verifyEmail: ""
    });

    const [isSubmitting, setIsSubmitting] = useState(false); 

    const handleChange = (e) => {
        setformData({ ...formData, [e.target.name]: e.target.value });
    };

    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';

    const PostData = async () => {
    
        if (isSubmitting) return;

        const cleanOTP = formData.verifyEmail.trim();
        if (!cleanOTP) {
            alert('Please enter the verification code');
            return;
        }

        if (cleanOTP.length !== 6) {
            alert('Verification code must be 6 digits');
            return;
        }

        setIsSubmitting(true);

        try {
            console.log('Sending verification code:', cleanOTP);
            console.log('API URL:', apiUrl);

            const response = await axios.post(`${apiUrl}/user/otpverify`,
                { verifyEmail: cleanOTP },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    timeout: 10000, // 10 second timeout
                }
            );

            console.log('Response:', response);

            if (response.status === 200) {
                alert('Email verified successfully!');
                window.location.href = "/login";
            }

        } catch (err) {
            console.error('Full error object:', err);
            console.error('Error response:', err.response);

            if (err.response) {
                
                const errorMessage = err.response.data?.error ||
                    err.response.data?.message ||
                    'Verification failed';
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

  
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            PostData();
        }
    };

    return (
        <div className="w-full min-h-screen flex justify-center items-center flex-col px-4">
            <h1 className="pacifico-font mb-5 text-[6vw] sm:text-[4vw] md:text-[3vw] lg:text-[2vw] text-center">
                Email Verification
            </h1>

            {/* <div className="text-center mb-4 text-gray-600 max-w-md">
                <p className="text-sm">
                    Please enter the 6-digit verification code sent to your email address.
                </p>
            </div> */}

            <input
                type="text"
                value={formData.verifyEmail}
                name="verifyEmail"
                onChange={handleChange}
                onKeyPress={handleKeyPress}
                placeholder="Enter 6-digit code"
                maxLength={6}
                className="h-10 w-full max-w-[22rem] rounded-[8px] [box-shadow:rgba(0,_0,_0,_0.35)_0px_5px_15px] px-4 py-6 text-[5vw] sm:text-[3vw] md:text-[2vw] text-center tracking-widest focus:outline-none focus:ring-2 focus:ring-cyan-500"
                disabled={isSubmitting}
            />
            <button
                onClick={PostData}
                disabled={isSubmitting}
                className={`w-full max-w-[22rem] mt-10 h-12 text-[5vw] sm:text-[3vw] md:text-[1.2vw] rounded-xl font-medium transition-all duration-300 transform hover:scale-105 ${isSubmitting
                        ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                        : 'bg-[#ff6900] text-white hover:bg-white hover:text-[#ff6900] hover:border hover:border-[#ff6900]'
                    }`}
            >
                {isSubmitting ? 'Verifying...' : 'Submit'}
            </button>


            {/* <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                    Didn't receive the code?{' '}
                    <button 
                        className="text-cyan-500 hover:text-cyan-600 underline"
                        onClick={() => {
                            // Add resend functionality here if needed
                            alert('Resend functionality to be implemented');
                        }}
                        disabled={isSubmitting}
                    >
                        Resend
                    </button>
                </p>
            </div> */}
        </div>
    );
};

export default Mailverify;