import React from 'react';
import '../../assets/Dashboard.css';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../AuthContext";


const CustomerDashboard = () => {
    const navigate = useNavigate();
    const { auth } = useAuth();

    const handleNewBookingClick = () => {
        navigate('/booking');
    };

    const handleMyBookingsClick = () => {
        navigate('/mina-aktuella-bokningar');
    };

    const handleHistoryClick = () => {
        navigate('/history');
    };

    const handleInvoicesClick = () => {
        navigate('/mina-fakturor');
    };



return (
    <div className="dashboard">
        <div className="dashboard-welcome">
            VÄLKOMMEN KÄRA KUND
        </div>
        <div className="dashboard-options">
            <button className="dashboard-button" onClick={handleNewBookingClick}>BOKA</button>
            <button className="dashboard-button" onClick={handleMyBookingsClick}>AKTUELLA BOKNINGAR</button>
            <button className="dashboard-button" onClick={handleHistoryClick}>HISTORIK</button>
            <button className="dashboard-button" onClick={handleInvoicesClick}>MINA FAKTUROR</button>
        </div>
      </div>
);
};


export default CustomerDashboard;
