import React, { useState, useEffect } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { FaChevronDown, FaBars, FaTimes } from "react-icons/fa";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    window.location.href = "/";
  };

  return (
    <>
      {/* Navbar */}
      <div className="h-[80px] w-full flex items-center justify-between px-4 shadow-md bg-white pl-10">
        {/* Logo */}
        <div className="w-[15%] flex items-center">
          <a href="/">
            <img src="/img/Logo.svg" alt="Logo" className="w-[8.54vw] h-[2.86vw]" />
          </a>
        </div>

        {/* Desktop Nav Menu */}
        <ul className="hidden lg:flex items-center justify-center gap-[30px] text-[13px] font-medium">
          <a href="/"><li className="list-none cursor-pointer">Home</li></a>
          <a href="/about"><li className="list-none cursor-pointer">About us</li></a>
          <a href="/restorent"><li className="list-none cursor-pointer">Restaurant</li></a>
          <a href="/service"><li className="list-none cursor-pointer">Service</li></a>
          {/* <li className="list-none cursor-pointer">Offer</li> */}
          {/* <li className="list-none cursor-pointer">Eat</li> */}
          <a href="/party"><li className="list-none cursor-pointer">Party</li></a>
          <li
            className="list-none flex items-center cursor-pointer relative"
            onClick={() => setMoreOpen(!moreOpen)}
          >
            More <FaChevronDown className="ml-1" />
            {moreOpen && (
              <ul className="absolute top-[40px] left-0 w-[200px] bg-white shadow-lg rounded-md text-black z-50">
                <a href="/manage-bookings"><li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Manage Your Bookings</li></a>
               <a href="/contact"><li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Contact Us</li></a>
              </ul>
            )}
          </li>
        </ul>

        {/* Right Section */}
        <div className="hidden lg:flex items-center gap-4 pr-4 text-[13px] font-medium">
          <FaMagnifyingGlass className="text-[17px]" />

          {user ? (
            <div className="flex items-center gap-2">
              <span className="text-gray-700">Hi, {user.name}</span>
              <button
                onClick={handleLogout}
                className="text-red-500 hover:underline"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <a href="/login" className="hover:underline">Login</a>
              <span>/</span>
              <a href="/login" className="hover:underline">Admin</a>
            </div>
          )}

          <a href="/bookingform">
            <button className="rounded-full px-5 py-2 bg-orange-500 text-white hover:bg-orange-600 transition">
              Book your stay
            </button>
          </a>
        </div>

        {/* Mobile menu toggle */}
        <div className="lg:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden px-4 py-3 bg-white shadow-md text-sm font-medium space-y-2">
          <ul className="space-y-2">
            <li><a href="/" className="block">Home</a></li>
            <li className="block"><a href="/about" className="block">About us</a></li>
            <li className="block"><a href="/restorent">Restaurant</a></li>
            <li className="block"><a href="service">Service</a></li>
            {/* <li className="block">Offer</li>
            <li className="block">Eat</li> */}
            <li className="block"><a href="/party">Party</a></li>
            <li>
              <button onClick={() => setMoreOpen(!moreOpen)} className="flex items-center gap-1">
                More <FaChevronDown />
              </button>
              {moreOpen && (
                <ul className="ml-4 mt-1 space-y-1 text-gray-700">
                  <a href="/manage-bookings"><li className="cursor-pointer">Manage Your Bookings</li></a>
                  <a href="/contact"><li className="cursor-pointer">Contact Us</li></a>
                </ul>
              )}
            </li>
          </ul>

          <div className="flex flex-col gap-2 pt-2 border-t mt-4">
            <FaMagnifyingGlass className="text-[17px]" />
            {user ? (
              <>
                <span className="text-gray-700">Hi, {user.name}</span>
                <button
                  onClick={handleLogout}
                  className="text-red-500 hover:underline"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <a href="/login">Login</a>
                <a href="/login">Admin</a>
              </>
            )}
            <a href="/bookingform">
              <button className="w-full mt-2 rounded-full px-4 py-2 bg-orange-500 text-white">
                Book your stay
              </button>
            </a>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
