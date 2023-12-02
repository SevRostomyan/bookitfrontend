import React from 'react';
import '../../assets/Dashboard.css';
import {useNavigate} from "react-router-dom";

const CustomerDashboard = () => {
    const navigate = useNavigate();


    const handleNewBookingClick = () => {
        // Navigate to the Booking component where booking-form,BookedClean and CleaningApproval components are also located to handle bookings
        navigate('/booking');
    }

        const handleMyBookingsClick = () => {
            const apiUrl = '/api/bokning/fetchBookingsByUserId';
            fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // Headers
                },
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Något gick fel vid hämtning av data.');
                    }
                    return response.json();
                })
                .then(data => {
                    // Logga
                    console.log(data);
                })
                .catch(error => {
                    console.error('Fetch error:', error);
                });
        };

        const handleHistoryClick = () => {
            const apiUrl = '/api/bokning/fetchAllBookings';

            fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // Headers
                },
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Något gick fel vid hämtning av data.');
                    }
                    return response.json();
                })
                .then(data => {
                    // Logga
                    console.log(data);
                })
                .catch(error => {
                    console.error('Fetch error:', error);
                });
        };

        const handlePaymentMethodsClick = () => {
            const apiUrl = '/api/betalning'; // <<Uppdatera med korrekt specifik endpoint>>

            fetch(apiUrl, {
                method: 'GET', // Anpassa till backend
                headers: {
                    'Content-Type': 'application/json',
                    // Andra headers
                },
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Något gick fel vid hämtning av data.');
                    }
                    return response.json();
                })
                .then(data => {
                    // Logga fetchen
                    console.log(data);
                })
                .catch(error => {
                    console.error('Fetch error:', error);
                });
        };

        return (
            <div className="customer-dashboard">
                <div className="welcome-message">
                    VÄLKOMMEN KÄRA KUND
                </div>
                <div className="options">
                    <button className="option-button" onClick={handleNewBookingClick}>NY BOKNING</button>
                    <button className="option-button" onClick={handleMyBookingsClick}>MINA BOKNINGAR</button>
                    <button className="option-button" onClick={handleHistoryClick}>HISTORIK</button>
                    <button className="option-button" onClick={handlePaymentMethodsClick}>BETALNINGSMETODER</button>
                </div>
            </div>
        );
    };

    export default CustomerDashboard;


