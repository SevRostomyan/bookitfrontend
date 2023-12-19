import React, { useState, useEffect } from 'react';
import { useAuth } from "../../AuthContext";

function BookingManagement() {
    const [bookings, setBookings] = useState([]);
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [availableCleaners, setAvailableCleaners] = useState([]);
    const { auth } = useAuth();

    useEffect(() => {
        fetchNotAssignedBookings();
    }, []);

    const fetchNotAssignedBookings = async () => {
        try {
            const token = auth.token;
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
            const token = auth.token;
            const response = await fetch(`http://localhost:7878/api/admin/available-cleaners?bookingTime=${bookingTime}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
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
            const token = auth.token;
            const response = await fetch('http://localhost:7878/api/admin/assignCleaning', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ bookingId, cleanerId })
            });
            if (!response.ok) {
                throw new Error('Failed to assign cleaning');
            }
            alert('Cleaning successfully assigned!'); // Feedback
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

    // Tabellstruktur för att visa bokningar
    return (
        <div>
            <h2>Bokningshantering</h2>
            <table>
                <thead>
                <tr>
                    <th>Beskrivning</th>
                    <th>Bokningstid</th>
                    <th>Välj</th>
                </tr>
                </thead>
                <tbody>
                {bookings.map(booking => (
                    <tr key={booking.id}>
                        <td>{booking.description}</td>
                        <td>{booking.bookingTime}</td>
                        <td><button onClick={() => handleSelectBooking(booking)}>Välj</button></td>
                    </tr>
                ))}
                </tbody>
            </table>
            {selectedBooking && (
                <>
                    <h3>Tillgängliga städare för vald bokning</h3>
                    <ul>
                        {availableCleaners.map(cleaner => (
                            <li key={cleaner.id} onClick={() => handleAssignCleaning(cleaner.id)}>
                                {cleaner.name}
                            </li>
                        ))}
                    </ul>
                </>
            )}
        </div>
    );
}

export default BookingManagement;
