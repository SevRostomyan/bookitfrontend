import React, {Component} from 'react';

class BookingConfirmation extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showConfirmationModal: false,
            newBooking: {
                firstName: '',
                lastName: '',
                email: '',
                type: '',
                dateTime: '',
                address: '',
                message: '',
            },
        };
    }

    // det är bara ett example, kan ersättas med databas sen
    handleConfirmationModal = () => {

        this.setState({
            newBooking: {
                firstName: 'Jane',
                lastName: 'Doe',
                email: 'jane@example.com',
                type: 'Basic Städning',
                dateTime: '2024/01/02 10:00:00',
                address: 'Stagneliusgatan 9, 754 27 Uppsala',
                message: 'Lorem ipsum ...',
            },
            showConfirmationModal: true,
        });
    }

    // Confirm Booking
    handleConfirm = () => {
        // Save to the database

        console.log('Saved')
        this.resetData();
    };

    // Cancel Booking
    handleCancel = () => {

        this.setState({ showConfirmationModal: false });
    };

    resetData = () => {
        this.setState({
            newBooking: {
                firstName: '',
                lastName: '',
                email: '',
                type: '',
                dateTime: '',
                address: '',
                message: '',
            },
            showConfirmationModal: false,
        });
    }

    render() {

        return (
            <div>
                <div className="mt-6 mx-auto max-w-xl">
                    <div className="">
                        <button type="button"
                                onClick={this.handleConfirmationModal}
                                className="button button-secondary">Confirm</button>
                    </div>
                </div>

                {/* Booking confirmation dialog */}
                {this.state.showConfirmationModal && (
                    <div className="modal">
                        <div className="modal-content">
                            <div>
                                <p className="text-gray-600">Förnamn: {this.state.newBooking.firstName}</p>
                                <p className="text-gray-600">Efternamn: {this.state.newBooking.lastName}</p>
                                <p className="text-gray-600">E-post: {this.state.newBooking.email}</p>
                                <p className="text-gray-600">Typ: {this.state.newBooking.type}</p>
                                <div className="text-gray-600">Datum:
                                    <time dateTime={this.state.newBooking.dateTime}>{this.state.newBooking.dateTime}</time>
                                </div>
                                <p className="text-gray-600">Adress: {this.state.newBooking.address}</p>
                                <p className="text-gray-600">Meddelande: {this.state.newBooking.message}</p>
                            </div>
                            <button className="button-success mt-6" onClick={this.handleConfirm}>Bekräfta</button>
                            <button className="button-secondary mt-4" onClick={this.handleCancel}>Avbryt</button>
                        </div>
                    </div>
                )}
            </div>
        )
    }
}

export default BookingConfirmation;