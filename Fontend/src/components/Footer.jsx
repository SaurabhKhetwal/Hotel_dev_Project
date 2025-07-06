import React from "react";


const Footer = () => {


    const handleIconClick = (e) => {
        e.currentTarget.style.transform = "scale(0.95)";
        setTimeout(() => {
            e.currentTarget.style.transform = "scale(1)";
        }, 150);
    };

    const handleMouseEnter = (e) => {
        e.currentTarget.style.transform = "translateX(4px)";
    };

    const handleMouseLeave = (e) => {
        e.currentTarget.style.transform = "translateX(0)";
    };

    return (
        <>

            {/* footer*/}
            {/* <div className="h-0.5 bg-gradient-to-r from-[#FFA100] via-[#E11162] to-[#E11162]"></div> */}
            <footer className="bg-[white]">
                {/* Logo Section */}
                <div className="px-4 sm:px-6 lg:px-8 pt-8 pb-4">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex items-center">
                            <div className="w-32 h-16 bg-gray-300 rounded flex items-center justify-center">
                                <span className="text-sm font-semibold text-gray-600">HOTEL LOGO</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Footer Content */}
                <div className="px-4 sm:px-6 lg:px-8 pb-8">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
                            {/* Social Media & Contact Section */}
                            <div className="lg:col-span-1 space-y-6">
                                <div>
                                    <h2 className="text-lg font-semibold text-gray-800 mb-4 pacifico-font">FOLLOW US ON</h2>
                                    <div className="flex space-x-3">
                                        {/* Social Icons */}
                                        {[
                                            { color: "bg-blue-600", hover: "hover:bg-blue-700" },
                                            { color: "bg-blue-800", hover: "hover:bg-blue-900" },
                                            { color: "bg-pink-600", hover: "hover:bg-pink-700" },
                                            { color: "bg-red-600", hover: "hover:bg-red-700" },
                                        ].map((style, i) => (
                                            <div
                                                key={i}
                                                className={`w-10 h-10 ${style.color} ${style.hover} rounded-full flex items-center justify-center transition-colors cursor-pointer`}
                                                onClick={handleIconClick}
                                            >
                                                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M12 0C5.372 0 0 5.373 0 12s5.372 12 12 12 12-5.373 12-12S18.628 0 12 0z" />
                                                </svg>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Contact Section */}
                                <div>
                                    <h2 className="text-lg font-semibold text-gray-800 mb-4 pacifico-font">CONTACT US</h2>
                                    <div className="space-y-2">
                                        <p className="text-gray-700">
                                            <strong className="font-semibold">CALL:</strong>{" "}
                                            <a
                                                href="tel:8700898990"
                                                className="hover:text-blue-600 transition-colors"
                                                onMouseEnter={handleMouseEnter}
                                                onMouseLeave={handleMouseLeave}
                                            >
                                                8700898990
                                            </a>
                                        </p>
                                        <p className="text-gray-700">
                                            <strong className="font-semibold">EMAIL:</strong>{" "}
                                            <a
                                                href="mailto:ssourabh.1712@gmail.com"
                                                className="hover:text-blue-600 transition-colors break-all"
                                                onMouseEnter={handleMouseEnter}
                                                onMouseLeave={handleMouseLeave}
                                            >
                                                ssourabh.1712@gmail.com
                                            </a>
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Quick Links Repeated Sections */}
                            {[1, 2, 3].map((section, i) => (
                                <div key={i} className="space-y-4">
                                    <h3
                                        className={`text-lg font-semibold text-gray-800 pacifico-font ${i === 0 ? "" : "invisible"
                                            }`}
                                    >
                                        {i === 0 ? "Quick Links" : "Links"}
                                    </h3>
                                    <ul className="space-y-2">
                                        {[
                                            <a href="/"> Home</a>,
                                            <a href="/contact"> ContactUs</a>,
                                            <a href="/restorent"> Restorent</a>,
                                            <a href="/service"> Services</a>,
                                            <a href="/about"> About</a>,
                                            <a href="/party"> Party</a>,
                                            <a href="/manage-bookings">Manage Booking</a>,
                                           
                                        ].map((link, idx) => (
                                            <li key={idx}>
                                                <a
                                                    href="#"
                                                    className="text-black-600 hover:text-black-800 transition-colors"
                                                    onMouseEnter={handleMouseEnter}
                                                    onMouseLeave={handleMouseLeave}
                                                >
                                                    {link}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Gradient Divider */}
                <div className="h-0.5 bg-gradient-to-r from-[#FFA100] via-[#E11162] to-[#E11162]"></div>

                {/* Copyright */}
                <div className="bg-footerPink text-center py-4">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h4 className="text-black font-medium">Copyright © & About Krayons | 2014 - 24</h4>
                    </div>
                </div>
            </footer>

        </>
    )
}

export default Footer;