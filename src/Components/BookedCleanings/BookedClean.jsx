import React, {useEffect } from 'react';
import { useBookings } from '../../BookingsContext';
import '../../assets/BookedClean.css';

const Bookings = () => {
  const { bookings, fetchBookings } = useBookings();


  useEffect(() => {
    fetchBookings(); // Call fetchBookings from the context
  }, [fetchBookings]); // Add fetchBookings as a dependency


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
                    <p>Boknings-ID: {booking.id}</p>
                    <p>Datum och tid: {booking.bookingTime}</p>
                    <p>Adress: {booking.adress}</p>
                    <p>Meddelande vid bokning: {booking.messageAtBooking}</p>
                    <p>Status: {booking.status}</p>
                    <p>Rapportstatus: {booking.cleaningReportStatus}</p>
                  </li>
              ))}
            </ul>
        )}
      </div>
  );
};

export default Bookings;
