import React from 'react';
import '../../assets/Dashboard.css';
import { useNavigate } from 'react-router-dom';

const EmployeeDashboard = () => {
    const navigate = useNavigate();

    const handleInbokadeJobbClick = () => {
        navigate('/booked-jobs');
    };

    const handleHistorikClick = () => {
        navigate('/history');
    };

    return (
        <div className="dashboard">
            <div className="dashboard-welcome">PERSONAL</div>
            <div className="dashboard-options">
                <button className="dashboard-button" onClick={handleInbokadeJobbClick}>INBOKADE JOBB</button>
                <button className="dashboard-button" onClick={handleHistorikClick}>HISTORIK</button>
            </div>
        </div>
    );
}

export default EmployeeDashboard;
