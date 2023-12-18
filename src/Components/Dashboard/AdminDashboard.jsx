import React from 'react';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import '../../assets/Dashboard.css';
import BookingManagement from './BookingManagement';
import PaymentManagement from './PaymentManagement';
import RegisterUserForm from './RegisterUserForm';
import UsersList from './UsersList';
import UserManagement from './UserManagement';

function AdminDashboard() {
    const navigate = useNavigate();
    const location = useLocation();

    // Hjälpare för att navigera
    const navigateTo = (path) => {
        navigate(path);
    };

    return (
        <div className="dashboard">
            <div className="dashboard-welcome">ADMINISTRATÖR</div>
            <div className="dashboard-options">
                <button className="dashboard-button" onClick={() => navigateTo('/admin/user-management')}>Användare</button>
                <button className="dashboard-button" onClick={() => navigateTo('/admin/bookings')}>Bokningar</button>
                <button className="dashboard-button" onClick={() => navigateTo('/admin/payments')}>Betalningar</button>
                <button className="dashboard-button" onClick={() => navigateTo('/admin/register')}>Registrera Användare</button>
            </div>
            <Routes>
                <Route path="/admin/users" element={<UsersList />} />
                <Route path="/admin/bookings" element={<BookingManagement />} />
                <Route path="/admin/payments" element={<PaymentManagement />} />
                <Route path="/admin/register" element={<RegisterUserForm />} />
                <Route path="/admin/user-management" element={<UserManagement />} />
            </Routes>
        </div>
    );
}

export default AdminDashboard;
