import React, { useState, useEffect } from 'react';
import { useAuth } from "../../AuthContext";
import '../../assets/BookedClean.css';
const MinaAktuellaBokningar = () => {
    const { auth } = useAuth();
    const [bookings, setBookings] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const apiUrl = 'http://localhost:7878/api/bokning/fetchBookingsByUserId';
        fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${auth.token}`,
            },
            body: JSON.stringify({ userId: auth.userId }),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch bookings');
                }
                return response.json();
            })
            .then(data => {
                setBookings(data);
            })
            .catch(error => {
                console.error('Error fetching bookings:', error);
                setError(error.message);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [auth]);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="bookings">
            <h2>Mina Aktuella Bokningar</h2>
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
                {bookings.map(booking => (
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
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default MinaAktuellaBokningar;
