import React, {useState, useEffect} from 'react';
import './../../assets/CleaningApproval.css';

import {useAuth} from "../../AuthContext";
import {useNavigate} from "react-router-dom";
import { useBookings } from '../../BookingsContext';
import DataRefreshButton from '../BookedCleanings/DataRefreshButton';

const CleaningApproval = () => {
    const { bookings, setBookings, fetchBookings } = useBookings();

    const [feedbacks, setFeedbacks] = useState({}); // New state to track feedbacks
    const [feedbackSubmitted, setFeedbackSubmitted] = useState({}); // New state to track submitted feedbacks

    const [showPopup, setShowPopup] = useState({});
    const {auth} = useAuth();
    const navigate = useNavigate();


    //Datan kommer från BookingsContext men states hanteras lokalt enligt nedan.
    const { reportedCompletedBookings, fetchReportedCompletedBookings } = useBookings();
    const [completedBookings, setCompletedBookings] = useState([]);
    const [feedbackVisible, setFeedbackVisible] = useState({}); // Track visibility of feedback text fields
    const [buttonsVisible, setButtonsVisible] = useState({});   // Track visibility of approval/disapproval buttons




   /* // Define fetchReportedCompletedBookings function with useCallback
    const fetchReportedCompletedBookings = useCallback(async () => {
        try {
            const response = await fetch('http://localhost:7878/api/bokning/fetchReportedCompletedBookingsByUserId', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${auth.token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                // Check if the response body is not empty
                if (response.status !== 204) { // 204 No Content
                    const data = await response.json();
                    setCompletedBookings([...data]); // Spread into a new array

                    // Initialize visibility states for each booking
                    const initialFeedbackVisible = {};
                    const initialButtonsVisible = {};
                    data.forEach(booking => {
                        initialFeedbackVisible[booking.id] = true; // Feedback is initially visible
                        initialButtonsVisible[booking.id] = true; // Buttons are initially visible
                    });
                    setFeedbackVisible(initialFeedbackVisible);
                    setButtonsVisible(initialButtonsVisible);
                } else {
                    // Handle empty response
                    console.log('No content returned from the server');
                }
            } else {
                console.error('Failed to fetch bookings:', response.status);
            }
        } catch (error) {
            console.error('Error during fetch:', error);
        }
    }, [auth.token]); // Dependencies for useCallback*/



    /*useEffect(() => {
        fetchReportedCompletedBookings().catch(error => {
            console.error('Error in fetchReportedCompletedBookings:', error);
        });
    }, [auth.token, fetchReportedCompletedBookings]); // Add fetchReportedCompletedBookings as a dependency for useEffect
*/

    useEffect(() => {
        fetchReportedCompletedBookings().catch(error => {
            console.error('Error in fetchReportedCompletedBookings:', error);
        });
    }, [fetchReportedCompletedBookings]); // Only fetchReportedCompletedBookings as a dependency

    useEffect(() => {
        setCompletedBookings(reportedCompletedBookings);

        const initialFeedbackVisible = {};
        const initialButtonsVisible = {};
        reportedCompletedBookings.forEach(booking => {
            initialFeedbackVisible[booking.id] = true;
            initialButtonsVisible[booking.id] = true;
        });
        setFeedbackVisible(initialFeedbackVisible);
        setButtonsVisible(initialButtonsVisible);
    }, [reportedCompletedBookings]);



    const updateCleaningStatus = async (cleaningId, status) => {
        const endpoint = status === 'COMPLETED'
            ? '/updateCleaningStatustoGodkand'
            : '/updateCleaningStatusToUnderkand';

        try {
            const response = await fetch(`http://localhost:7878/api/kund${endpoint}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${auth.token}`
                },
                body: JSON.stringify({cleaningId}),
            });

            if (response.ok) {

                // Update local state immediately
                setBookings(bookings.map(booking =>
                    booking.id === cleaningId ? {...booking, approved: status} : booking
                ));
                setButtonsVisible({...buttonsVisible, [cleaningId]: false}); // Hide approval/disapproval buttons


                // Use a callback with setState to ensure fetchReportedCompletedBookings is called after state update
                setBookings(currentBookings => {
                    const updatedBookings = currentBookings.map(booking =>
                        booking.id === cleaningId ? {...booking, approved: status} : booking
                    );
                    fetchReportedCompletedBookings(); // Call fetchReportedCompletedBookings after updating the state
                    return updatedBookings;
                });



                // Set the popup visibility for the specific booking ID on successful update
                setShowPopup(currentPopups => ({ ...currentPopups, [cleaningId]: true }));
                await fetchBookings(); // Refresh the bookings list in BookedClean
            } else {
                console.error('Failed to update cleaning status:', response.status);
            }
        } catch (error) {
            console.error('Error during update request:', error);
        }
    };


    const saveFeedback = async (cleaningId, feedback) => {
        try {
            const response = await fetch('http://localhost:7878/api/kund/saveCustomerFeedback', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${auth.token}`
                },
                body: JSON.stringify({bookingId: cleaningId, feedback}),
            });

            if (response.ok) {
                alert("Tack för din feedback!");
                setFeedbackSubmitted({...feedbackSubmitted, [cleaningId]: true}); // Mark feedback as submitted
                setFeedbackVisible({...feedbackVisible, [cleaningId]: false}); // Hide feedback text field
            } else {
                console.error('Failed to save feedback:', response.status);
            }
        } catch (error) {
            console.error('Error during feedback request:', error);
        }
    };

    const handleFeedbackChange = (cleaningId, feedback) => {
        setFeedbacks({...feedbacks, [cleaningId]: feedback});
    };

    const handlePopupClose = (bookingId) => {
        setShowPopup(currentPopups => ({ ...currentPopups, [bookingId]: false }));
    };

    const goToDashboard = () => {
        navigate('/customer-dashboard');
    };

    // Popup component
    const Popup = ({ bookingId }) => (
        <div className="popup-overlay">
            <div className="popup-content">
                <p>Tack för din feedback!</p>
                <button onClick={goToDashboard}>Till min dashboard</button>
                <button onClick={() => handlePopupClose(bookingId)}>Stanna kvar</button>
                {/*<button onClick={handlePopupClose}>Stanna kvar</button>*/}
            </div>
        </div>
    );

    return (
        <div className="cleaning-approval">
            <div>
                {/*Refresh Only Reported Completed Bookings:*/}
                <DataRefreshButton onRefresh={fetchReportedCompletedBookings} />
            </div>
            <h2> Recensera Avslutade Städningar</h2>
            {completedBookings.length === 0 ? (
                <p>Inga rapporterade städningar att recensera.</p>
            ) : (
                <ul>
                    {completedBookings.map(booking => (
                        <li key={booking.id}>
                            <div className="cleaning-details">
                                <p>Datum: {booking.bookingTime}</p>
                                <p>Adress: {booking.adress}</p>
                                {showPopup[booking.id] && <Popup bookingId={booking.id} />}
                            </div>
                            {feedbackVisible[booking.id] && (
                                <div className="feedback-section">
                                <textarea
                                    className="feedback-textarea"
                                    placeholder="Lämna feedback här..."
                                    onChange={(e) => handleFeedbackChange(booking.id, e.target.value)}
                                />
                                    <button onClick={() => saveFeedback(booking.id, feedbacks[booking.id])}>Skicka
                                        Feedback
                                    </button>
                                </div>
                            )}
                            {buttonsVisible[booking.id] && (
                                <div className="approval-buttons">
                                    <button
                                        onClick={() => updateCleaningStatus(booking.id, 'COMPLETED')}
                                        disabled={!feedbackSubmitted[booking.id]} // Check if feedback is submitted
                                    >
                                        Godkänn
                                    </button>
                                    <button
                                        onClick={() => updateCleaningStatus(booking.id, 'UNDERKAND')}
                                        disabled={!feedbackSubmitted[booking.id]} // Check if feedback is submitted
                                    >
                                        Underkänn
                                    </button>
                                </div>
                            )}


                            {booking.approved &&
                                <p>Städningen är {booking.approved === 'COMPLETED' ? 'godkänd' : 'underkänd'}.</p>}
                        </li>
                    ))}
                </ul>
            )}

        </div>

    );
};

export default CleaningApproval;




