import React from 'react';
import './App.css';
import Navbar from "./Components/nav/Navbar";
import { Route, Routes } from "react-router-dom";
import { BookingsProvider } from './BookingsContext';
import Home from "./Components/pages/Home";
import Register from "./Components/pages/Register";
import Booking from "./Components/pages/Booking";
import Login from "./Components/pages/Login";
import BookingHistoryComponent from "./Components/Booking/BookingHistoryComponent";
import AdminDashboard from "./Components/Dashboard/AdminDashboard";
import EmployeeDashboard from "./Components/Dashboard/EmployeeDashboard";
import CustomerDashboard from "./Components/Dashboard/CustomerDashboard";
import PerformedCleaningComponent from "./Components/Booking/PerformedCleaningComponent";
import BookingAdminPanel from "./Components/Admin/BookingAdminPanel";
import BookedJobs from "./Components/Dashboard/BookedJobs";


function App() {
    return (
        <div className="App">
            <Navbar />
            <main>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/booking" element={<BookingsProvider><Booking /></BookingsProvider>} />
                    <Route path="/history" element={<BookingHistoryComponent />} />
                    <Route path="/performed-cleaning" element={<PerformedCleaningComponent />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/admin-dashboard/*" element={<AdminDashboard />} />
                    <Route path="/booking-admin-panel" element={<BookingAdminPanel />} />
                    <Route path="/employee-dashboard" element={<EmployeeDashboard />} />
                    <Route path="/customer-dashboard" element={<CustomerDashboard />} />
                    <Route path="/booked-jobs" element={<BookedJobs />} />
                </Routes>
            </main>
        </div>
    );
}

export default App;
