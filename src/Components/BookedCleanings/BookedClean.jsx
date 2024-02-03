import React, { useEffect, useState } from 'react';
import { useBookings } from '../../BookingsContext';
import '../../assets/BookedClean.css';
import DataRefreshButton from '../BookedCleanings/DataRefreshButton';
import {useAuth} from "../../AuthContext";
const Bookings = () => {
    const { bookings, fetchBookings } = useBookings();
    const { auth } = useAuth(); // Use the useAuth hook
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        fetchBookings(); // Call fetchBookings from the context
    }, [fetchBookings]); // Add fetchBookings as a dependency

    const cancelBooking = async (bookingId) => {
        setIsLoading(true);
        const token = auth.token; // Use the token from the AuthContext
        try {
            const response = await fetch('http://localhost:7878/api/bokning/cancelBooking', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ bookingId })
            });

            if (!response.ok) {
                throw new Error('Failed to cancel booking');
            }

            // If successful, refresh the bookings list
            await fetchBookings();
        } catch (error) {
            console.error('Error canceling the booking:', error);
        }
        setIsLoading(false);
    };

    return (
        <div className="bookings">
            <div>
                <DataRefreshButton onClick={fetchBookings} />
            </div>
            <h1>Mina bokade städningar</h1>
            {bookings.length === 0 ? (
                <p>Du har inga bokade städningar.</p>
            ) : (
                <ul>
                    {bookings.map((booking, index) => (
                        <li key={index}>
                            <h3>Städning {index + 1}</h3>
                            <p>Boknings-ID: {booking.id}</p>
                            <p>Datum och tid: {booking.bookingTime}</p>
                            <p>Adress: {booking.address}</p>
                            <p>Meddelande vid bokning: {booking.messageAtBooking}</p>
                            <p>Status: {booking.status}</p>
                            <p>Rapportstatus: {booking.cleaningReportStatus}</p>
                            {['PENDING', 'CONFIRMED'].includes(booking.status) && (
                                <button
                                    onClick={() => cancelBooking(booking.id)}
                                    disabled={isLoading}
                                >
                                    Avboka
                                </button>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Bookings;
