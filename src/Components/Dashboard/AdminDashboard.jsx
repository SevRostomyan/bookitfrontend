import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import '../../assets/Dashboard.css';
import BookingManagement from './BookingManagement';
import PaymentManagement from './PaymentManagement';
import RegisterUserForm from './RegisterUserForm';
import UsersList from './UsersList';
import UserManagement from './UserManagement';

function AdminDashboard() {
    const navigate = useNavigate();

    // Navigeringsfunktion
    const navigateTo = (path) => {
        navigate(path);
    };

    return (
        <div className="dashboard">
            <div className="dashboard-welcome">ADMINISTRATÖR</div>
            <div className="dashboard-options">
                <button className="dashboard-button" onClick={() => navigateTo('users')}>Användare</button>
                <button className="dashboard-button" onClick={() => navigateTo('bookings')}>Bokningar</button>
                <button className="dashboard-button" onClick={() => navigateTo('payments')}>Betalningar</button>
                <button className="dashboard-button" onClick={() => navigateTo('register')}>Registrera Användare</button>
            </div>
            <Routes>
                <Route path="users" element={<UsersList />} />
                <Route path="bookings" element={<BookingManagement />} />
                <Route path="payments" element={<PaymentManagement />} />
                <Route path="register" element={<RegisterUserForm />} />
                <Route path="user-management" element={<UserManagement />} />
            </Routes>
        </div>
    );
}

export default AdminDashboard;
