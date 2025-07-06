import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { IoBookOutline } from "react-icons/io5";
import { IoBedOutline } from "react-icons/io5";
import { HiDatabase } from "react-icons/hi";
import { MdOutlinePeopleAlt } from "react-icons/md";
import { GrUserManager } from "react-icons/gr";
import { TbReportAnalytics } from "react-icons/tb";
import { CiMoneyCheck1 } from "react-icons/ci";
import { PiToolbox } from "react-icons/pi";
import { VscTools } from "react-icons/vsc";
import { GrTooltip } from "react-icons/gr";
import { MdOutlineMessage } from "react-icons/md";
import { IoHomeOutline } from "react-icons/io5";
import { AiOutlineDashboard } from "react-icons/ai";
import { FiUser, FiLogOut } from "react-icons/fi";

const Dashboard = () => {
  const navigate = useNavigate();
  
  // Get user data from localStorage
  const userData = JSON.parse(localStorage.getItem("user") || "{}");
  const userName = userData.name || userData.userName || "User";

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <>
      <div className="flex flex-col min-h-screen">
        {/* Header */}
        <header className="flex justify-between items-center bg-white shadow px-4 h-16 sticky top-0 z-50">
          <div className="flex items-center gap-3">
            <AiOutlineDashboard size={32} className="text-blue-600" />
            <h1 className="text-xl font-semibold text-gray-800">Dashboard</h1>
          </div>
          
          {/* User Profile Section */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-lg">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <FiUser className="text-white" size={16} />
              </div>
              <span className="text-sm font-medium text-gray-700">
                Welcome, {userName}
              </span>
            </div>
            
            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <FiLogOut size={16} />
              <span className="text-sm">Logout</span>
            </button>
          </div>
        </header>

        {/* Main body */}
        <div className="flex flex-1 flex-col md:flex-row">
          {/* Sidebar */}
          <aside className="md:w-1/5 bg-gray-800 text-white flex flex-col h-screen md:h-auto">
            {/* User Info in Sidebar */}
            <div className="px-4 py-6 border-b border-gray-700">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                  <FiUser className="text-white" size={20} />
                </div>
                <div>
                  <p className="font-medium">{userName}</p>
                  <p className="text-sm text-gray-400">{userData.email || "user@example.com"}</p>
                </div>
              </div>
            </div>

            <nav className="flex-1 overflow-auto px-2 py-4">
              <ul className="space-y-4">
                <li>
                  <Link
                    to="/dashboard"
                    className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-blue-200 hover:text-blue-600 transition"
                  >
                    <IoHomeOutline size={20} />
                    <span>Dashboard</span>
                  </Link>
                </li>
                {[
                  { to: "/dashboard/booking", label: "Bookings", icon: <IoBookOutline size={20} /> },
                  { to: "/dashboard/rooms", label: "Rooms", icon: <IoBedOutline size={20} /> },
                  { to: "/dashboard/guest", label: "Guests", icon: <MdOutlinePeopleAlt size={20} /> },
                  { to: "/dashboard/staff", label: "Staff", icon: <GrUserManager size={20} /> },
                  { to: "/dashboard/daybook", label: "Daybook Reports", icon: <TbReportAnalytics size={20} /> },
                  // { to: "#", label: "Finance", icon: <CiMoneyCheck1 size={20} /> },
                  // { to: "#", label: "Maintenance", icon: <PiToolbox size={20} /> },
                  // { to: "#", label: "Messages", icon: <MdOutlineMessage size={20} /> },
                  // { to: "#", label: "Settings", icon: <VscTools size={20} /> },
                  // { to: "#", label: "Notifications", icon: <GrTooltip size={20} /> },
                  // { to: "#", label: "Capacity Building", icon: <HiDatabase size={20} /> },
                  // { to: "#", label: "Procurements", icon: <HiDatabase size={20} /> },
                ].map(({ to, label, icon }, i) => (
                  <li key={i}>
                    <Link
                      to={to}
                      className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-blue-200 hover:text-blue-600 transition"
                    >
                      {icon}
                      <span>{label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1 bg-gray-50 min-h-screen p-4 overflow-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
};

export default Dashboard;