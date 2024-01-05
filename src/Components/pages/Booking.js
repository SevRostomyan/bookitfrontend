import React, { Component } from 'react';
import BookingForm from "../Booking/BookingForm";
import BookedClean from "../BookedCleanings/BookedClean";
import '../../assets/CleaningApproval.css';
import CleaningApproval from "../CleaningApproval1/CleaningApproval";
import DataRefreshButton from '../BookedCleanings/DataRefreshButton';
import { withBookings } from '../../WithBookings';
import BookingConfirmation from "../Booking/BookingConfirmation"; // HOC

class Booking extends Component {

    render() {
        const { fetchReportedCompletedBookings } = this.props; // Accessed via props

        const cleaningData = {
            date: '2023-11-01',
            time: '10:00 AM'
        };

        return (
            <div>
                <div className="mx-auto max-w-xl"><DataRefreshButton onRefresh={fetchReportedCompletedBookings} refreshAll /></div>
                <div className="pt-4 mt-4"><BookingForm /></div>
                <div className="pt-4 mt-4"><BookingConfirmation /></div>
                <div className="pt-4 mt-4"><BookedClean /></div>
                <div className="pt-4 mt-4"><CleaningApproval cleaning={cleaningData} /></div>
            </div>
        );
    }
}

export default withBookings(Booking); // Wrap with HOC
