import React, { useState, useEffect } from 'react';

function BookingManagement() {
    const [bookings, setBookings] = useState([]);
    const [availableCleaners, setAvailableCleaners] = useState([]);

    useEffect(() => {
        fetchNotAssignedBookings();
    }, []);

    const fetchNotAssignedBookings = async () => {
        try {
            const response = await fetch('http://localhost:7878/api/admin/fetchNotAssignedBookings', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer YOUR_TOKEN`
                }
            });
            if (!response.ok) {
                throw new Error('Failed to fetch bookings');
            }
            const data = await response.json();
            setBookings(data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    // Antag att du har en funktion för att välja en bokning och hämta tillgängliga städare
    const selectBooking = async (bookingTime) => {
        // Här skulle du anropa fetchAvailableCleaners
    };

    const assignCleaning = async (bookingId, cleanerId) => {
        try {
            const response = await fetch('http://localhost:7878/api/admin/assignCleaning', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer YOUR_TOKEN`
                },
                body: JSON.stringify({ bookingId, cleanerId })
            });
            if (!response.ok) {
                throw new Error('Failed to assign cleaning');
            }
            // Hantera framgångsrik tilldelning
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            {/* Implementering för att visa bokningar och tillgängliga städare */}
        </div>
    );
}

export default BookingManagement;
