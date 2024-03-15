import React, {useState, useEffect, useCallback} from 'react';
import {useAuth} from "../../AuthContext";

function BookingManagement() {
    const [bookings, setBookings] = useState([]);
    const [allCompletedBookings, setAllCompletedBookings] = useState([]);
    const [unpaidBookings, setUnpaidBookings] = useState([]);
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [availableCleaners, setAvailableCleaners] = useState([]);
    const {auth} = useAuth();

    const fetchNotAssignedBookings = useCallback(async () => {
        try {
            const token = auth.token;
            const response = await fetch('http://localhost:7878/api/admin/fetchNotAssignedBookings', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            });
            if (!response.ok) {
                throw new Error('Failed to fetch bookings');
            }
            const data = await response.json();
            setBookings(data);
        } catch (error) {
            console.error('Error:', error);
        }
    }, [auth.token]);


    useEffect(() => {
        fetchNotAssignedBookings().then(r => {
        });
    }, [fetchNotAssignedBookings]);


    const fetchAvailableCleaners = async (bookingTime) => {
        try {
            const token = auth.token;
            const response = await fetch(`http://localhost:7878/api/admin/available-cleaners`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({bookingTime: bookingTime})
            });
            if (!response.ok) {
                throw new Error('Failed to fetch available cleaners');
            }
            const data = await response.json();
            setAvailableCleaners(data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const assignCleaning = async (bookingId, cleanerId) => {
        try {
            const token = auth.token;
            const response = await fetch('http://localhost:7878/api/admin/assignCleaning', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({bookingId, cleanerId})
            });
            if (!response.ok) {
                throw new Error('Failed to assign cleaning');
            }
            alert('Cleaning successfully assigned!'); // Feedback
            await fetchNotAssignedBookings(); // Uppdatera listan med ej tilldelade bokningar
        } catch (error) {
            console.error('Error:', error);
        }
    };



    const fetchAllCompletedBookings = useCallback(async () => {
        try {
            const token = auth.token;
            const response = await fetch('http://localhost:7878/api/admin/fetchAllCompletedBookings', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error('Failed to fetch completed bookings');
            }
            const data = await response.json();
            setAllCompletedBookings(data);
        } catch (error) {
            console.error('Error:', error);
        }
    }, [auth.token]);

    useEffect(() => {
        fetchAllCompletedBookings().then(r =>{} );
    }, [fetchAllCompletedBookings]);



    const handleGenerateInvoice = async (booking) => {
        try {
            const token = auth.token;
            const customerId = booking.kund.id; // Assuming 'kund' object has 'id' property
            const response = await fetch('http://localhost:7878/api/admin/generateInvoices', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ kundId: customerId }),
            });
            if (!response.ok) {
                throw new Error('Failed to generate invoice');
            }
            alert(`Invoice generated successfully for booking ID: ${booking.id}.`);
        } catch (error) {
            console.error('Error generating invoice:', error);
            alert('Failed to generate invoice');
        }
    };



    const fetchAllNotPaidBookings = useCallback(async () => {
        try {
            const token = auth.token;
            const response = await fetch('http://localhost:7878/api/admin/fetchAllNotPaidBookings', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error('Failed to fetch unpaid bookings');
            }
            const data = await response.json();
            setUnpaidBookings(data);
        } catch (error) {
            console.error('Error:', error);
        }
    }, [auth.token]);


    useEffect(() => {
        fetchAllNotPaidBookings().then(r => {
        });
    }, [fetchAllNotPaidBookings]);


    const handleSelectBooking = (booking) => {
        setSelectedBooking(booking);
        fetchAvailableCleaners(booking.bookingTime).then(r => {
        });
    };

    const handleAssignCleaning = (cleanerId) => {
        if (selectedBooking) {
            assignCleaning(selectedBooking.id, cleanerId).then(r => {
            });
        }
    };

    // Tabellstruktur för att visa bokningar
    return (
        <div>
            <h1>Bokningshantering</h1>
            <div className="bookings"> {/* Klassnamnet kan bytas ut för att bättre matcha innehållet i tabellen */}
                <h2>Ej Tilldelade Bokningar</h2>
                <table>
                    <thead>
                    <tr>
                        <th className="invoice-header">Kund</th>
                        <th className="invoice-header">Bokningsadress</th>
                        <th className="invoice-header">Bokningstid</th>
                        <th className="invoice-header">Tjänst</th>
                        <th className="invoice-header">Kundmeddelande</th>
                        <th className="invoice-header">Välj</th>
                    </tr>
                    </thead>
                    <tbody>
                    {bookings.map(booking => (
                        <tr key={booking.id} className="invoice-row">
                            <td className="invoice-data">{booking.kund.firstname + " " + booking.kund.lastname}</td>
                            <td className="invoice-data">{booking.adress}</td>
                            <td className="invoice-data">{booking.bookingTime}</td>
                            <td className="invoice-data">{booking.tjänst}</td>
                            <td className="invoice-data">{booking.messageAtBooking}</td>
                            <td className="invoice-data">
                                <button className="download-button" onClick={() => handleSelectBooking(booking)}>Välj
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                {selectedBooking && (
                    <>
                        <h2>Tillgängliga städare för vald bokning</h2>
                        <table>
                            <thead>
                            <tr>
                                <th className="invoice-header">Namn</th>
                                <th className="invoice-header">Efternamn</th>
                                <th className="invoice-header">Email</th>
                                <th className="invoice-header">Välj</th>
                            </tr>
                            </thead>
                            <tbody>
                            {availableCleaners.map(cleaner => (
                                <tr key={cleaner.id} className="invoice-row">
                                    <td className="invoice-data">{cleaner.firstname}</td>
                                    <td className="invoice-data">{cleaner.lastname}</td>
                                    <td className="invoice-data">{cleaner.email}</td>
                                    <td className="invoice-data">
                                        <button className="download-button"
                                                onClick={() => handleAssignCleaning(cleaner.id)}>Välj
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </>
                )}
            </div>

            <div>

                <br/>

            </div>

            <div className="bookings">

                <h2> Godkända Bokningar att Fakturera </h2>
                <table>
                    <thead>
                    <tr>
                        <th className="invoice-header">Kund</th>
                        <th className="invoice-header">Bokningsadress</th>
                        <th className="invoice-header">Bokningstid</th>
                        <th className="invoice-header">Tjänst</th>
                        <th className="invoice-header">Kundmeddelande</th>
                        <th className="invoice-header">Hantera</th>
                    </tr>
                    </thead>
                    <tbody>
                    {allCompletedBookings.map(booking => (
                        <tr key={booking.id} className="invoice-row">
                            <td className="invoice-data">{booking.kund.firstname + " " + booking.kund.lastname}</td>
                            <td className="invoice-data">{booking.adress}</td>
                            <td className="invoice-data">{booking.bookingTime}</td>
                            <td className="invoice-data">{booking.tjänst}</td>
                            <td className="invoice-data">{booking.messageAtBooking}</td>
                            <td className="invoice-data">
                                <button className="download-button"
                                        onClick={() => handleGenerateInvoice(booking)}>Fakturera
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>

            <h2>Obetalda Bokningar</h2>
            <table>
                <thead>
                <tr>
                    <th className="invoice-header">Kund</th>
                    <th className="invoice-header">Bokningsadress</th>
                    <th className="invoice-header">Bokningstid</th>
                    <th className="invoice-header">Tjänst</th>
                    <th className="invoice-header">Kundmeddelande</th>
                    <th className="invoice-header">Hantera</th>
                </tr>
                </thead>
                <tbody>
                {unpaidBookings.map(booking => (
                    <tr key={booking.id} className="invoice-row">
                        <td className="invoice-data">{booking.kund.firstname + " " + booking.kund.lastname}</td>
                        <td className="invoice-data">{booking.adress}</td>
                        <td className="invoice-data">{booking.bookingTime}</td>
                        <td className="invoice-data">{booking.tjänst}</td>
                        <td className="invoice-data">{booking.messageAtBooking}</td>
                        <td className="invoice-data">
                            {/* You can add a button or another element here for handling the unpaid booking */}
                            <button className="button">Hantera</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
</div>

)
    ;


}

export default BookingManagement;
