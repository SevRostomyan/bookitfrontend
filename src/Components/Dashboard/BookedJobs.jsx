import React, { useState, useEffect } from 'react';
import { useAuth } from "../../AuthContext";

const BookedJobs = () => {
    const [bookedJobs, setBookedJobs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const { auth } = useAuth();

    useEffect(() => {
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
                    body: JSON.stringify({ userId: auth.user.id }),
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch booked jobs');
                }

                const data = await response.json();
                setBookedJobs(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchBookedJobs();
    }, [auth.token, auth.user.id]);

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

            // Optionally refresh the booked jobs list or handle the UI update
            alert('Cleaning started successfully');
            fetchBookedJobs(); // Refresh the list to reflect the change
        } catch (error) {
            console.error('Error:', error);
            alert('Error starting cleaning: ' + error.message);
        }
    };

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

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
                        <th>Status</th>
                        <th>Action</th> {/* Added column header for actions */}
                    </tr>
                    </thead>
                    <tbody>
                    {bookedJobs.map((job) => (
                        <tr key={job.id}>
                            <td>{job.id}</td>
                            <td>{job.kund.firstname} {job.kund.lastname}</td>
                            <td>{job.städare ? `${job.städare.firstname} ${job.städare.lastname}` : 'Ej tilldelad'}</td>
                            <td>{job.tjänst}</td>
                            <td>{job.bookingTime}</td>
                            <td>{job.status}</td>
                            <td>
                                <button onClick={() => startCleaning(job.id)}>Start</button> {/* Added Start button */}
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
