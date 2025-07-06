// import React from "react";

// const services = [
//   {
//     title: "Room Service",
//     description: "24/7 room service to ensure your stay is comfortable and relaxing.",
//     icon: "🛎️",
//   },
//   {
//     title: "Laundry",
//     description: "Professional laundry and dry-cleaning services at your doorstep.",
//     icon: "🧺",
//   },
//   {
//     title: "Free Wi-Fi",
//     description: "Enjoy unlimited high-speed internet throughout the property.",
//     icon: "📶",
//   },
//   {
//     title: "Parking",
//     description: "Ample free parking space available for all guests and visitors.",
//     icon: "🚗",
//   },
//   {
//     title: "Airport Pickup",
//     description: "On-demand airport shuttle for pickup and drop-off.",
//     icon: "✈️",
//   },
//   {
//     title: "Fitness Center",
//     description: "Modern gym with cardio, strength, and yoga facilities.",
//     icon: "🏋️",
//   },
// ];

// const Service = () => {
//   return (
//     <div className="py-12 px-4 md:px-10 lg:px-20 bg-gray-50">
//       <h2 className="text-center text-3xl md:text-4xl font-bold mb-10">Our Services</h2>
      
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//         {services.map((service, index) => (
//           <div
//             key={index}
//             className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition duration-300"
//           >
//             <div className="text-4xl mb-4">{service.icon}</div>
//             <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
//             <p className="text-gray-600">{service.description}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Service;


import React from "react";
import {
  FaConciergeBell, 
  FaTshirt,         
  FaWifi,        
  FaCarAlt,     
  FaShuttleVan,   
  FaDumbbell         
} from "react-icons/fa";

const services = [
  {
    title: "Room Service",
    description: "24/7 room service to ensure your stay is comfortable and relaxing.",
    icon: <FaConciergeBell />,
  },
  {
    title: "Laundry",
    description: "Professional laundry and dry-cleaning services at your doorstep.",
    icon: <FaTshirt />,
  },
  {
    title: "Free Wi-Fi",
    description: "Enjoy unlimited high-speed internet throughout the property.",
    icon: <FaWifi />,
  },
  {
    title: "Parking",
    description: "Ample free parking space available for all guests and visitors.",
    icon: <FaCarAlt />,
  },
  {
    title: "Airport Pickup",
    description: "On-demand airport shuttle for pickup and drop-off.",
    icon: <FaShuttleVan />,
  },
  {
    title: "Fitness Center",
    description: "Modern gym with cardio, strength, and yoga facilities.",
    icon: <FaDumbbell />,
  },
];

const Service = () => {
  return (
    <div className="py-12 px-4 md:px-10 lg:px-20 bg-gray-50">
      <h2 className="text-center text-3xl md:text-4xl font-bold mb-10 text-black pacifico-font">Our Services</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition duration-300"
          >
            <div className="text-4xl text-orange-500 mb-4">{service.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
            <p className="text-gray-600">{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Service;
