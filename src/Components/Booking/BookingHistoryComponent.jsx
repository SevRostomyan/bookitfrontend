import React, { useState, useEffect } from 'react';
import { useAuth } from "../../AuthContext";

function BookingHistoryComponent() {
    const [bookingHistory, setBookingHistory] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const { auth } = useAuth();

    useEffect(() => {
        setIsLoading(true);
        fetch(`http://localhost:7878/api/bokning/getAllBookingsByUserId`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${auth.token}`

            },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                if (!Array.isArray(data)) {
                    throw new Error('Data is not an array');
                }
                console.log(data);
                setBookingHistory(data);
            })
            .catch(error => {
                console.error('Fetch error:', error);
                setError(error.message);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [auth.token]);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (bookingHistory.length === 0) return <div>Inga bokningar hittades.</div>;

    return (
        <div>
            <h2>Bokningshistorik</h2>
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
                </tr>
                </thead>
                <tbody>
                {bookingHistory.map(booking => (
                    booking && (
                    <tr key={booking.id}>
                        <td>{booking.id}</td>
                        <td>{booking.kund?.firstname} {booking.kund?.lastname}</td>
                        <td>{booking.städare?.firstname} {booking.städare?.lastname}</td>
                        <td>{booking.tjänst}</td>
                        <td>{booking.bookingTime}</td>
                        <td>{booking.endTime}</td>
                        <td>{booking.adress}</td>
                        <td>{booking.messageAtBooking}</td>
                        <td>{booking.cleaningReportedTime}</td>
                        <td>{booking.customerFeedback}</td>
                        <td>{booking.status}</td>
                        <td>{booking.cleaningReportStatus}</td>
                    </tr>
                    )
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default BookingHistoryComponent;
