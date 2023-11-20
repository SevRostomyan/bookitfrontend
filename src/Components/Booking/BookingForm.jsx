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
        message: '',
      },
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

  handleSubmit = async (e) => {
    e.preventDefault();
    if (this.validateForm()) {
      try {
        const response = await fetch('http://localhost:7878/api/bokning/bookCleaning', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            städningsAlternativ: this.state.cleaningType,
            bookingTime: this.state.desiredDate,
            messageAtBooking: this.state.message,
          }),
        });

        const result = await response.json();
        console.log('POST response:', result);

        // Du kan hantera svaret här och uppdatera din komponent om det behövs.

      } catch (error) {
        console.error('Error making POST request:', error);
      }
    }
  };

  render() {
    return (
        <div className="booking-container">
          <div className="booking-form">
            <h2>Boka en städning</h2>
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label>Typ av städning</label>
                <select
                    name="cleaningType"
                    value={this.state.cleaningType}
                    onChange={this.handleInputChange}
                >
                  <option value="">-- Välj städtyp --</option>
                  <option value="BASIC">Basic Städning</option>
                  <option value="TOPP">Topp Städning</option>
                  <option value="DIAMANT">Diamant Städning</option>
                  <option value="FÖNSTERTVÄTT">Fönstertvätt</option>
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
                    placeholder="Lägg till meddelande..."
                />
              </div>
              <button type="submit">Boka</button>
            </form>
          </div>
        </div>
    );
  }
}

export default BookingForm;
