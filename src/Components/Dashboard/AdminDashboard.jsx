import React from 'react';
import '../../assets/Dashboard.css'; // Assuming this is the unified CSS file

function AdminDashboard() {
    return (
        <div className="dashboard">
            <div className="dashboard-welcome">ADMINISTRATÖR</div>
            <div className="dashboard-options">
                <button className="dashboard-button">KUNDER</button>
                <button className="dashboard-button">PERSONAL</button>
                <button className="dashboard-button">BOKNINGAR</button>
                <button className="dashboard-button">BETALNINGAR/FAKTUROR</button>
            </div>
        </div>
    );
}

export default AdminDashboard;
