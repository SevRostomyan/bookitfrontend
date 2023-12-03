// BookingsContext.js
import React, { createContext, useState, useContext, useCallback } from 'react';
import { useAuth } from './AuthContext';

const BookingsContext = createContext();

export const BookingsProvider = ({ children }) => {
    const [bookings, setBookings] = useState([]);
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

                if (response.ok) {
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

    return (
        <BookingsContext.Provider value={{ bookings, fetchBookings, setBookings}}>
            {children}
        </BookingsContext.Provider>
    );
};

export const useBookings = () => useContext(BookingsContext);
