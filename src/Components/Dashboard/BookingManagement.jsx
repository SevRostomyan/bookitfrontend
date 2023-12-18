import React, { useState, useEffect } from 'react';
import {useAuth} from "../../AuthContext";

function BookingManagement() {
    const [bookings, setBookings] = useState([]);
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [availableCleaners, setAvailableCleaners] = useState([]);
    const { auth } = useAuth(); // Use the useAuth hook to access the auth state

    useEffect(() => {
        fetchNotAssignedBookings();
    }, []);

    const fetchNotAssignedBookings = async () => {
        try {
            const token =auth.token; // Use the token from the AuthContext

            const response = await fetch('http://localhost:7878/api/admin/fetchNotAssignedBookings', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
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

    const fetchAvailableCleaners = async (bookingTime) => {
        try {

            const token =auth.token; // Use the token from the AuthContext

            const response = await fetch('http://localhost:7878/api/admin/available-cleaners', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ bookingTime })
            });
            if (!response.ok) {
                throw new Error('Failed to fetch available cleaners');
            }
            const data = await response.json();
            setAvailableCleaners(data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const assignCleaning = async (bookingId, cleanerId) => {
        try {
            const token =auth.token; // Use the token from the AuthContext
            const response = await fetch('http://localhost:7878/api/admin/assignCleaning', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` // Include the token in the Authorization header
                },
                body: JSON.stringify({ bookingId, cleanerId })
            });
            if (!response.ok) {
                throw new Error('Failed to assign cleaning');
            }
            // Hantera framgångsrik tilldelning
            fetchNotAssignedBookings(); // Uppdatera listan med ej tilldelade bokningar
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleSelectBooking = (booking) => {
        setSelectedBooking(booking);
        fetchAvailableCleaners(booking.bookingTime);
    };

    const handleAssignCleaning = (cleanerId) => {
        if (selectedBooking) {
            assignCleaning(selectedBooking.id, cleanerId);
        }
    };

    return (
        <div>
            <h2>Bokningshantering</h2>
            <div>
                <h3>Ej tilldelade bokningar</h3>
                {bookings.map(booking => (
                    <div key={booking.id} onClick={() => handleSelectBooking(booking)}>
                        {booking.description} - {booking.bookingTime}
                    </div>
                ))}
            </div>
            <div>
                {selectedBooking && (
                    <>
                        <h3>Tillgängliga städare för vald bokning</h3>
                        {availableCleaners.map(cleaner => (
                            <div key={cleaner.id} onClick={() => handleAssignCleaning(cleaner.id)}>
                                {cleaner.name}
                            </div>
                        ))}
                    </>
                )}
            </div>
        </div>
    );
}

export default BookingManagement;
