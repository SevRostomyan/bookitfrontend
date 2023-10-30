import React, { useState, useEffect } from 'react';
import '../../assets/BookedClean.css'

const Bookings = () => {
    // Använd useState och useEffect för att hantera bokade städningar
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        // hämta data om bokade städningar från en databas
        // uppdatera 'bookings'-tillståndet med den data som hämtats
        // Fetcha data
    }, []);

    return (
        <div className="bookings">
            <h1>Mina bokade städningar</h1>
            {bookings.length === 0 ? (
                <p>Du har inga bokade städningar.</p>
            ) : (
                <ul>
                    {bookings.map((booking, index) => (
                        <li key={index}>
                            <h3>Städning {index + 1}</h3>
                            <p>Datum: {booking.date}</p>
                            <p>Tid: {booking.time}</p>
                            <p>Städföretag: {booking.cleaningCompany}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Bookings;
