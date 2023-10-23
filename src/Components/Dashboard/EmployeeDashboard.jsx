import React from 'react';
import '../../assets/EmployeeDash.css';

const EmployeeDashboard = () => {
    return (
        <div className="employee-dashboard">
            <div className="welcome-user">VÄLKOMMEN USER</div>
            <button className="dashboard-button">INBOKADE JOBB</button>
            <button className="dashboard-button">HISTORIK</button>
        </div>
    );
}

export default EmployeeDashboard;
