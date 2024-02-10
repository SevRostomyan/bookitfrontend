import React, { useState, useEffect } from 'react';
import { useAuth } from "../../AuthContext";

const BookedJobs = () => {
    const [bookedJobs, setBookedJobs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const { auth } = useAuth();

    useEffect(() => {
        fetchBookedJobs();
    }, []);

    const fetchBookedJobs = async () => {
        setIsLoading(true);
        setError('');

        try {
            const response = await fetch('http://localhost:7878/api/bokning/fetchNotStartedBookingsByUserId', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${auth.token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch booked jobs');
            }

            const data = await response.json();
            setBookedJobs(data);
        } catch (error) {
            setError(`Error: ${error.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    const startCleaning = async (cleaningId) => {
        try {
            const response = await fetch(`http://localhost:7878/api/städare/startCleaning`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${auth.token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ cleaningId }),
            });

            if (!response.ok) {
                throw new Error('Failed to start cleaning');
            }

            alert('Cleaning job started successfully');
            fetchBookedJobs();
        } catch (error) {
            alert(`Error: ${error.message}`);
        }
    };

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <h2>Inbokade Jobb</h2>
            {bookedJobs.length > 0 ? (
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
                        <th>Starta</th>
                    </tr>
                    </thead>
                    <tbody>
                    {bookedJobs.map(booking => (
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
                            <td>
                                <button onClick={() => startCleaning(booking.id)}>Starta</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            ) : (
                <p>Inga inbokade jobb hittades.</p>
            )}
        </div>
    );
};

export default BookedJobs;
