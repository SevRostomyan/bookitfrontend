import React from 'react';
import '../../assets/Dashboard.css';
const CustomerDashboard = () => {
    return (
        <div className="dashboard">
            <div className="dashboard-welcome">
                KUND
            </div>
            <div className="dashboard-options">
                <button className="dashboard-button">NY BOKNING</button>
                <button className="dashboard-button">MINA BOKNINGAR</button>
                <button className="dashboard-button">HISTORIK</button>
                <button className="dashboard-button">BETALNINGSMETODER</button>
            </div>
        </div>
    );
}

export default CustomerDashboard;
