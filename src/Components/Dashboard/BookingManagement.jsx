import React, { useState, useEffect } from 'react';

function BookingManagement() {
    const [bookings, setBookings] = useState([]);
    const [selectedBooking, setSelectedBooking] = useState(null);

    useEffect(() => {
        fetchNotAssignedBookings();
    }, []);

    const fetchNotAssignedBookings = async () => {
        // Kod för att hämta icke-tilldelade bokningar
    };

    const assignCleaning = async (bookingId, cleanerId) => {
        // Kod för att tilldela städning
    };

    const handleSelectBooking = (booking) => {
        setSelectedBooking(booking);
        // Kod för att hämta tillgängliga städare
    };

    return (
        <div>
            <h2>Bokningshantering</h2>
            {bookings.map(booking => (
                <div key={booking.id} onClick={() => handleSelectBooking(booking)}>
                    {booking.details} {/* Antag att varje bokning har detaljer */}
                </div>
            ))}
            {selectedBooking && (
                <div>
                    {/* Ytterligare UI för att hantera den valda bokningen */}
                </div>
            )}
        </div>
    );
}

export default BookingManagement;
