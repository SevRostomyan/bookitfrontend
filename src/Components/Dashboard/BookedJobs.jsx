import React, { useState, useEffect } from 'react';
import { useAuth } from "../../AuthContext";

const BookedJobs = () => {
    const [notStartedJobs, setNotStartedJobs] = useState([]);
    const [inProgressJobs, setInProgressJobs] = useState([]);
    const [reportedCompletedJobs, setReportedCompletedJobs] = useState([]);
    const [isLoadingReportedCompleted, setIsLoadingReportedCompleted] = useState(false);
    const [errorReportedCompleted, setErrorReportedCompleted] = useState('');

    const [isLoadingNotStarted, setIsLoadingNotStarted] = useState(false);
    const [isLoadingInProgress, setIsLoadingInProgress] = useState(false);
    const [errorNotStarted, setErrorNotStarted] = useState('');
    const [errorInProgress, setErrorInProgress] = useState('');
    const { auth } = useAuth();

    useEffect(() => {
        fetchJobs('fetchNotStartedBookingsByUserId', setNotStartedJobs, setIsLoadingNotStarted, setErrorNotStarted);
        fetchJobs('fetchInProgressBookingsByUserId', setInProgressJobs, setIsLoadingInProgress, setErrorInProgress);
        fetchJobs('fetchReportedCompletedBookingsByUserId', setReportedCompletedJobs, setIsLoadingReportedCompleted, setErrorReportedCompleted);
    }, []);

    const fetchJobs = async (endpoint, setState, setIsLoading, setError) => {
        setIsLoading(true);
        setError('');

        try {
            const response = await fetch(`http://localhost:7878/api/bokning/${endpoint}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${auth.token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 204) {
                // Handle 204 No Content response
                setState([]);
                return;
            }

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
            fetchJobs('fetchNotStartedBookingsByUserId', setNotStartedJobs, setIsLoadingNotStarted, setErrorNotStarted);
            fetchJobs('fetchInProgressBookingsByUserId', setInProgressJobs, setIsLoadingInProgress, setErrorInProgress);
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
            fetchJobs('fetchNotStartedBookingsByUserId', setNotStartedJobs, setIsLoadingNotStarted, setErrorNotStarted);
            fetchJobs('fetchInProgressBookingsByUserId', setInProgressJobs, setIsLoadingInProgress, setErrorInProgress);
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to report cleaning as completed');
        }
    };

    const renderNotStartedJobsTable = () => {
        return renderJobsTable("Not Started Jobs", notStartedJobs, startCleaning, 'Starta');
    };

    const renderJobsTable = (title, jobs, actionHandler, actionButtonText, isLoading, error, noDataMessage) => {
        if (isLoading) {
            return <div>Loading...</div>;
        }
        if (error) {
            return <div>Error: {error}</div>;
        }
        if (jobs.length === 0) {
            return <p>{noDataMessage}</p>;
        }

        return (
            <>
                <h3>{title}</h3>
                <table>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Kund</th>
                        <th>Bokningsdress</th>
                        <th>Tjänst</th>
                        <th>Bokningstid</th>
                        <th>Kundmeddelande</th>
                        <th>Status</th>
                        {title !== "Reported Completed Jobs" && <th>Åtgärd</th>}
                    </tr>
                    </thead>
                    <tbody>
                    {jobs.map((job) => (
                        <tr key={job.id}>
                            <td>{job.id}</td>
                            <td>{job.kund.firstname} {job.kund.lastname}</td>
                            <td>{job.adress}</td>
                            <td>{job.tjänst}</td>
                            <td>{job.bookingTime}</td>
                            <td>{job.messageAtBooking}</td>
                            <td>{job.status}</td>
                            {title !== "Reported Completed Jobs" && (
                                <td>
                                    {actionHandler && <button onClick={() => actionHandler(job.id)}>{actionButtonText}</button>}
                                </td>
                            )}
                        </tr>
                    ))}
                    </tbody>
                </table>
            </>
        );
    };


    return (
        <div>
            <h2>Inbokade Jobb</h2>
            {renderJobsTable("", notStartedJobs, startCleaning, 'Starta', isLoadingNotStarted, errorNotStarted, "Det finns inga ej påbörjade uppdrag just nu.")}
            <h2>Påbörjade uppdrag</h2>
            {renderJobsTable("", inProgressJobs, finishCleaning, 'Avsluta', isLoadingInProgress, errorInProgress, "Det finns inga påbörjade uppdrag just nu.")}
            <h2>Avslutade uppdrag</h2>
            {renderJobsTable("", reportedCompletedJobs, null, '', isLoadingReportedCompleted, errorReportedCompleted, "Det finns inga avslutade uppdrag just nu.")}
        </div>
    );
};

export default BookedJobs;
