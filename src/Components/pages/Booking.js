import React, { Component } from 'react';
import BookingForm from "../Booking/BookingForm";
import '../../assets/CleaningApproval.css';
import { withBookings } from '../../WithBookings';


class Booking extends Component {

    render() {
// Accessed via props

        return (
            <div>
                <div className="pt-4 mt-4"><BookingForm /></div>
            </div>
        );
    }
}

export default withBookings(Booking); // Wrap with HOC
