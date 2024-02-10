import React from 'react';
import '../../assets/Dashboard.css';
import { useNavigate } from 'react-router-dom';

const EmployeeDashboard = () => {
    const navigate = useNavigate();

    const handleInbokadeJobbClick = () => {
        // Placeholder for your logic to handle "INBOKADE JOBB" click
        console.log('INBOKADE JOBB clicked');
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
