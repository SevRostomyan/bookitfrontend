import React, { Component } from 'react';
import '../../assets/Booking.css';

class BookingForm extends Component {
    constructor() {
        super();
        this.state = {
            cleaningType: '',
            desiredDate: '',
            message: '',
            errors: {
                cleaningType: '',
                desiredDate: '',
                message: ''
            }
        };
    }

    handleInputChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    };

    validateForm = () => {
        const { desiredDate } = this.state;
        const errors = {
            desiredDate: '',
            message: '',
        };
        let isValid = true;

        if (!desiredDate) {
            errors.desiredDate = 'Välj önskat datum';
            isValid = false;
        }

        this.setState({ errors });
        return isValid;
    };

    handleSubmit = (e) => {
        e.preventDefault();
        if (this.validateForm()) {
            // skicka bokningsinformation
            console.log(this.state);
        }
    };

    render() {
        return (
            <div className="booking-container">
                <div className="booking-form">
                    <h2>Boka en städning</h2>
                    <div className="form-group">
                        <label>Typ av städning</label>
                        <select
                            name="cleaningType"
                            value={this.state.cleaningType}
                            onChange={this.handleInputChange}
                        >
                            <option value="">-- Välj städtyp --</option>
                            <option value="basic">Basic Städning</option>
                            <option value="topp">Topp Städning</option>
                            <option value="diamant">Diamant Städning</option>
                            <option value="fönstertvätt">Fönstertvätt</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Datum för städning</label>
                        <input
                            type="date"
                            value={this.state.desiredDate}
                            onChange={this.handleInputChange}
                            name="desiredDate"
                        />
                    </div>
                    <div className="form-group">
                        <label>Meddelande</label>
                        <textarea
                            name="message"
                            value={this.state.message}
                            onChange={this.handleInputChange}
                            placeholder='Lägg till meddelande...'
                        />
                    </div>
                    <button type="submit">Boka</button>
                </div>
            </div>
        );
    }
}

export default BookingForm;
