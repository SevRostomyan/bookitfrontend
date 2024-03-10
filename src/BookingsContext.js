// BookingsContext.js HOC
import React, { createContext, useState, useContext, useCallback } from 'react';
import { useAuth } from './AuthContext';

export const BookingsContext = createContext();

export const BookingsProvider = ({ children }) => {
    const [bookings, setBookings] = useState([]);
    const [reportedCompletedBookings, setReportedCompletedBookings] = useState([]);
    const { auth } = useAuth();

    const fetchBookings = useCallback(async () => {
        if (auth.token) {
            try {
                const response = await fetch('http://localhost:7878/api/bokning/fetchBookingsByUserId', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${auth.token}`
                    },
                });

                if (response.status === 204) {
                    console.log('No bookings found.');
                    setBookings([]);
                } else if (response.ok) {
                    const data = await response.json();
                    setBookings(data);
                } else {
                    console.error('Server responded with non-OK status:', response.status);
                }
            } catch (error) {
                console.error('Error fetching bookings:', error);
            }
        } else {
            console.log('No authentication token available.');
        }
    }, [auth.token]);


    const fetchReportedCompletedBookings = useCallback(async () => {
        if (auth.token) {
            try {
                const response = await fetch('http://localhost:7878/api/bokning/fetchReportedCompletedBookingsByUserId', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${auth.token}`
                    },
                });

                if (response.status === 204) {
                    console.log('No reported completed bookings found.');
                    setReportedCompletedBookings([]);
                } else if (response.ok) {
                    const data = await response.json();
                    setReportedCompletedBookings(data);
                } else {
                    console.error('Server responded with non-OK status:', response.status);
                }
            } catch (error) {
                console.error('Error fetching reported completed bookings:', error);
            }
        } else {
            console.log('No authentication token available.');
        }
    }, [auth.token]);



    return (
        <BookingsContext.Provider value={{ bookings, fetchBookings, reportedCompletedBookings, fetchReportedCompletedBookings, setBookings }}>
            {children}
        </BookingsContext.Provider>
    );
};



export const useBookings = () => useContext(BookingsContext);
