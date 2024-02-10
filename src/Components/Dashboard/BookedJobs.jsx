import React, { useState, useEffect } from 'react';
import { useAuth } from "../../AuthContext";

const BookedJobs = () => {
    const [notStartedJobs, setNotStartedJobs] = useState([]);
    const [inProgressJobs, setInProgressJobs] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const { auth } = useAuth();

    useEffect(() => {
        fetchAllJobs();
    }, []);

    const fetchAllJobs = async () => {
        setIsLoading(true);
        setError('');

        await fetchJobs('fetchNotStartedBookingsByUserId', setNotStartedJobs);
        await fetchJobs('fetchInProgressBookingsByUserId', setInProgressJobs);
    };

    const fetchJobs = async (endpoint, setState) => {
        try {
            const response = await fetch(`http://localhost:7878/api/bokning/${endpoint}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${auth.token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`Failed to fetch jobs from ${endpoint}`);
            }

            const data = await response.json();
            setState(data);
        } catch (error) {
            setError(error.message);
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

            alert('Cleaning started successfully');
            fetchAllJobs();
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to start cleaning');
        }
    };

    const finishCleaning = async (cleaningId) => {
        try {
            const response = await fetch(`http://localhost:7878/api/städare/reportCleaningCompleted`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${auth.token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ cleaningId }),
            });

            if (!response.ok) {
                throw new Error('Failed to report cleaning as completed');
            }

            alert('Cleaning reported as completed successfully');
            fetchAllJobs();
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to report cleaning as completed');
        }
    };

    return (
        <div>
            <h2>Inbokade Jobb</h2>
            {isLoading && <div>Loading...</div>}
            {error && <div>Error: {error}</div>}
            {!isLoading && !error && (
                <>
                    {renderJobsTable("Not Started Jobs", notStartedJobs, startCleaning, 'Starta')}
                    {renderJobsTable("In Progress Jobs", inProgressJobs, finishCleaning, 'Avsluta')}
                </>
            )}
        </div>
    );
};

const renderJobsTable = (title, jobs, actionHandler, actionButtonText) => (
    <>
        <h3>{title}</h3>
        {jobs.length > 0 ? (
            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Kund</th>
                    <th>Städare</th>
                    <th>Tjänst</th>
                    <th>Bokningstid</th>
                    <th>Status</th>
                    <th>Åtgärd</th>
                </tr>
                </thead>
                <tbody>
                {jobs.map((job) => (
                    <tr key={job.id}>
                        <td>{job.id}</td>
                        <td>{job.kund.firstname} {job.kund.lastname}</td>
                        <td>{job.städare ? `${job.städare.firstname} ${job.städare.lastname}` : 'Ej tilldelad'}</td>
                        <td>{job.tjänst}</td>
                        <td>{job.bookingTime}</td>
                        <td>{job.status}</td>
                        <td>
                            <button onClick={() => actionHandler(job.id)}>{actionButtonText}</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        ) : (
            <p>Inga jobb hittades.</p>
        )}
    </>
);
export default BookedJobs;
