import React from 'react';
import '../../assets/CustomerDash.css';

const CustomerDashboard = () => {
    return (
        <div className="customer-dashboard">
            <div className="welcome-message">
                VÄLKOMMEN USER
            </div>
            <div className="options">
                <button className="option-button">NY BOKNING</button>
                <button className="option-button">MINA BOKNINGAR</button>
                <button className="option-button">HISTORIK</button>
                <button className="option-button">BETALNINGSMETODER</button>
            </div>
        </div>
    );
}

export default CustomerDashboard;
