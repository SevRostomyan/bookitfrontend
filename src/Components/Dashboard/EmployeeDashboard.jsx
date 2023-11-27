import React from 'react';
import '../../assets/Dashboard.css';

const EmployeeDashboard = () => {
    return (
        <div className="dashboard">
            <div className="dashboard-welcome">PERSONAL</div>
            <div className="dashboard-options">
                <button className="dashboard-button">INBOKADE JOBB</button>
                <button className="dashboard-button">HISTORIK</button>
            </div>
        </div>
    );
}

export default EmployeeDashboard;
