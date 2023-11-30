import React, { useState, useEffect } from 'react';
import '../../assets/BookedClean.css';

const Bookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        // Hämta token från localStorage om det finns
        const token = localStorage.getItem('jwtToken');

        // Kontrollera om token finns innan du gör fetch-anropet
        if (token) {
          const response = await fetch('http://localhost:7878/api/bokning/fetchBookingsByUserId', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`//Lägg till Bearer Token i headern
            },
          });
          if (response.ok) {
            const data = await response.json();
            setBookings(data);
          } else {
            console.log('Server responded with non-OK status:', response.status);
          }
        } else {
          console.log('Ingen autentiserings-token tillgänglig.');
        }
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };

    fetchBookings();
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
