import React, { Component } from 'react';
import HanteraAktuellaBokningar from '../Dashboard/HanteraAktuellaBokningar';
import CleaningApproval from '../CleaningApproval1/CleaningApproval';
import '../../assets/CleaningApproval.css';
import DataRefreshButton from '../BookedCleanings/DataRefreshButton';
import { withBookings } from '../../WithBookings';

class MinaAktuellaBokningar extends Component {
    render() {
        const { fetchReportedCompletedBookings } = this.props; // Om denna funktion behövs

        // Du kan lägga till mer data eller prop-variabler här om det behövs
        const cleaningData = {
            date: '2024-03-09',
            time: '10:00 AM'
        };

        return (
            <div>
                <div className="mx-auto max-w-xl"><DataRefreshButton onRefresh={fetchReportedCompletedBookings} refreshAll /></div>
                <div className="pt-4 mt-4"><HanteraAktuellaBokningar /></div>
                <div className="pt-4 mt-4"><CleaningApproval cleaning={cleaningData} /></div>
            </div>
        );
    }
}

export default withBookings(MinaAktuellaBokningar); // Wrap with HOC if needed
