import React, { useState } from 'react';
import '../../assets/Booking.css';



const BookingForm = () => {
  const [formData, setFormData] = useState({
    cleaningType: '',
    desiredDate: '',
    message: '',
  });

  const [errors, setErrors] = useState({
    cleaningType: '',
    desiredDate: '',
    message: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const { desiredDate } = formData;
    const newErrors = {
      desiredDate: '',
      message: '',
    };
    let isValid = true;

    if (!desiredDate) {
      newErrors.desiredDate = 'Välj önskat datum';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await fetch('http://localhost:7878/api/bokning/bookCleaning', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            städningsAlternativ: formData.cleaningType,
            bookingTime: formData.desiredDate,
            messageAtBooking: formData.message,
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

  return (
      <div className="booking-container">
        <div className="booking-form">
          <h2>Boka en städning</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Typ av städning</label>
              <select
                  name="cleaningType"
                  value={formData.cleaningType}
                  onChange={handleInputChange}
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
                  value={formData.desiredDate}
                  onChange={handleInputChange}
                  name="desiredDate"
              />
            </div>
            <div className="form-group">
              <label>Meddelande</label>
              <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Lägg till meddelande..."
              />
            </div>
            <button type="submit">Boka</button>
          </form>
        </div>
      </div>
  );
};

export default BookingForm;
