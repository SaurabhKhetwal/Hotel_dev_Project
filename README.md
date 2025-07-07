# Hotel Booking Website with Admin Dashboard
  This is a full-stack hotel booking system that allows users to book rooms and hotel administrators to manage bookings, guests, staff, rooms, and daily operations through a powerful dashboard.
  # visit = https://hotel-dev-project.vercel.app/

# Project Overview
  The hotel website provides a smooth experience for customers to register, verify their email through OTP, and book rooms. It includes a secure JWT-based authentication system for both users and admins. Admins can view new bookings, manually book rooms, manage staff, generate guest audit PDFs, track room statuses, and maintain daily expense/income records using the Daybook feature.

# Login Credentials for Demo  
  Admin Dashboard Login
  Email: ssourabh.1712@gmail.com
  Password: admin123

# Features
  * User Side
   User Registration with Email OTP Verification:
   Upon registration, an OTP is sent to the user's email. After successful verification, a welcome email is sent.

# JWT-Based Authentication:
Secure login with JWT token generation and automatic token deletion on logout.

# Room Booking Functionality:
Users can view available rooms and book them.

# Room Availability Checker:
Users can see real-time room status (Available, Booked, or Under Cleaning).

# Admin Dashboard
Secure Admin Login with JWT Auth

# View New Bookings:
Admin can see and manage all the bookings made from the website.

# Manual Room Booking:
Admin can book rooms manually from the dashboard for walk-in guests.

# Guest History Management:
After checkout, guest data moves to the Guest Section, showing the complete history of guests.

# PDF Generation:
Generate PDF reports of guest history for auditing and record-keeping.

# Staff Management:
Admin can add, edit, and delete staff members, managing their details effectively.

# Room Management:
Admin can create new rooms and update their statuses to Available, Booked, or Cleaning.

# Daybook for Income/Expenses:
Manage daily income and expenses efficiently with a dedicated Daybook module.

# Tech Stack Used
Frontend: React.js, Tailwind CSS
Backend: Node.js, Express.js
Database: MongoDB

# Authentication: JWT (JSON Web Tokens)

# Email Services: Nodemailer (for OTP & welcome emails)

# PDF Generation: e.g., PDFKit or similar library

# Deployment: Vercel / Render (if deployed)

# To-Do / Missing Functionalities
Here are some improvements and features that can still be added:

# Forgot Password Flow – Allow users to reset their password via email.

# User Booking History Page – Let users see their past and upcoming bookings.

# Room Filter/Search Functionality – Filter rooms by type, price, or status.

# Role-Based Access Control (RBAC) – Different permissions for admin and staff.

# Dashboard Analytics – Add charts or graphs to visualize income, occupancy, etc.

# Responsive UI Improvements – Ensure a better mobile experience.

