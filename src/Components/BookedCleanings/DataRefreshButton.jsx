import React from 'react';
import { useBookings } from '../../BookingsContext';


const DataRefreshButton = ({ onRefresh, refreshAll }) => {
    const { fetchBookings } = useBookings();

    const refreshData = async () => {
        if (refreshAll && onRefresh) {
            await onRefresh(); // Call fetchReportedCompletedBookings
        }
        await fetchBookings(); // Always call fetchBookings
    };

    return (
        <div>
            <button onClick={refreshData}>Uppdatera Information</button>
        </div>
    );
};

export default DataRefreshButton;



/*
Usage Scenarios:

    Refresh Only Reported Completed Bookings:
        <DataRefreshButton onRefresh={fetchReportedCompletedBookings} />


    Refresh Only General Bookings:
        <DataRefreshButton />

    Refresh Both at Once:
        <DataRefreshButton onRefresh={fetchReportedCompletedBookings} refreshAll />

*/
