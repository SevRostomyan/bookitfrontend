import React, { useEffect, useState } from 'react';
import { useBookings } from '../../BookingsContext';
import '../../assets/BookedClean.css';
import DataRefreshButton from '../BookedCleanings/DataRefreshButton';
import { useAuth } from "../../AuthContext";

const Bookings = () => {
    const { bookings, fetchBookings } = useBookings();
    const { auth } = useAuth();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        fetchBookings();
    }, [fetchBookings]);

    const cancelBooking = async (bookingId) => {
        setIsLoading(true);
        try {
            const response = await fetch('http://localhost:7878/api/bokning/cancelBooking', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${auth.token}`
                },
                body: JSON.stringify({ bookingId })
            });

            if (!response.ok) {
                throw new Error('Failed to cancel booking');
            }
            await fetchBookings();
        } catch (error) {
            console.error('Error canceling the booking:', error);
        }
        setIsLoading(false);
    };

    // Statusar där Avboka-knappen inte ska visas
    const noCancelButtonStatuses = [
        'IN_PROGRESS',
        'REPORTED_COMPLETED_AND_READY_FOR_CUSTOMER_REVIEW',
        'REVIEW_APPROVED',
        'REVIEW_FAILED'
    ];

    return (
        <div className="bookings">
            <DataRefreshButton onClick={fetchBookings} />
            <h1>Mina bokade städningar</h1>
            {bookings.length === 0 ? (
                <p>Du har inga bokade städningar.</p>
            ) : (
                <table>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Kund</th>
                        <th>Städare</th>
                        <th>Tjänst</th>
                        <th>Bokningstid</th>
                        <th>Sluttid</th>
                        <th>Adress</th>
                        <th>Meddelande vid bokning</th>
                        <th>Rapporterad tid</th>
                        <th>Kundfeedback</th>
                        <th>Status</th>
                        <th>Rapportstatus</th>
                        <th>Åtgärder</th>
                    </tr>
                    </thead>
                    <tbody>
                    {bookings.map((booking) => (
                        <tr key={booking.id}>
                            <td>{booking.id}</td>
                            <td>{booking.kund?.firstname} {booking.kund?.lastname}</td>
                            <td>{booking.städare ? `${booking.städare.firstname} ${booking.städare.lastname}` : 'Ingen städare tilldelad'}</td>
                            <td>{booking.tjänst}</td>
                            <td>{booking.bookingTime}</td>
                            <td>{booking.endTime || 'Ej angivet'}</td>
                            <td>{booking.adress || 'Ej angivet'}</td>
                            <td>{booking.messageAtBooking}</td>
                            <td>{booking.cleaningReportedTime || 'Ej angivet'}</td>
                            <td>{booking.customerFeedback || 'Ej angivet'}</td>
                            <td>{booking.status}</td>
                            <td>{booking.cleaningReportStatus}</td>
                            <td>
                                {['PENDING', 'CONFIRMED'].includes(booking.status) && !noCancelButtonStatuses.includes(booking.cleaningReportStatus) && (
                                    <button
                                        onClick={() => cancelBooking(booking.id)}
                                        disabled={isLoading}
                                    >
                                        Avboka
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default Bookings;
