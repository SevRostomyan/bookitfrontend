import React from 'react';
import '../../assets/Dashboard.css';
import { useNavigate } from "react-router-dom";
import DownloadPdf from './DownloadPdf';
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

   /* const handlePaymentMethodsClick = () => {
        const apiUrl = '/api/betalning';

        fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Något gick fel vid hämtning av data.');
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
            })
            .catch(error => {
                console.error('Fetch error:', error);
            });
    };*/


return (
    <div className="dashboard">
        <div className="dashboard-welcome">
            VÄLKOMMEN KÄRA KUND
        </div>
        <div className="dashboard-options">
            <button className="dashboard-button" onClick={handleNewBookingClick}>BOKA</button>
            <button className="dashboard-button" onClick={handleMyBookingsClick}>MINA BOKNINGAR</button>
            <button className="dashboard-button" onClick={handleHistoryClick}>HISTORIK</button>
            {/*<button className="dashboard-button" onClick={handlePaymentMethodsClick}>BETALNINGSMETODER</button>*/}
        </div>
        <DownloadPdf />
    </div>
);
};


export default CustomerDashboard;
