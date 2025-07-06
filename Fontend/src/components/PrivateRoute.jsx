// components/PrivateRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';


// ----------------------------------------------------------------------------------------
// const PrivateRoute = ({ children }) => {
//   const user = JSON.parse(localStorage.getItem("user"));

//   return user ? children : <Navigate to="/login" replace />;
// };

// export default PrivateRoute;

// -----------------------------------------------------------------------------------------

// Enhanced PrivateRoute.jsx
// const PrivateRoute = ({ children, allowedRoles = [] }) => {
//   const storedUser = JSON.parse(localStorage.getItem("user"));

//   if (!storedUser || !storedUser.token) {
//     return <Navigate to="/login" />;
//   }

//   if (!allowedRoles.includes(storedUser.role)) {
//     return <Navigate to="/" />;
//   }

//   return children;
// };

// export default PrivateRoute;

{/* <Route
  path="/dashboard"
  element={
    <PrivateRoute allowedRoles={["admin"]}>
      <Dashboard />
    </PrivateRoute>
  }
/> */}

// ------------------------------------------------------------------------------------------



const PrivateRoute = ({ children }) => {
  const storedUser = JSON.parse(localStorage.getItem("user"));


  if (!storedUser || !storedUser.token) {
    return <Navigate to="/login" />;
  }

  
  if (storedUser.role !== "admin") {
    return <Navigate to="/" />;
  }

  return children;
};

export default PrivateRoute;