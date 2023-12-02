import React, { useState } from 'react';
import '../../assets/Booking.css';
import {useAuth} from "../../AuthContext";


const BookingForm = () => {
  const { auth } = useAuth(); // Use the useAuth hook to access the auth state
  const [formData, setFormData] = useState({
    cleaningType: '',
    desiredDate: '',
    desiredTime: '',
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
        const bookingDateTime = `${formData.desiredDate}T${formData.desiredTime}`;

        const token =auth.token; // Use the token from the AuthContext


        const response = await fetch('http://localhost:7878/api/bokning/bookCleaning', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` // Include the token in the Authorization header
          },
          body: JSON.stringify({
            städningsAlternativ: formData.cleaningType,
            bookingTime: bookingDateTime,
            adress: formData.adress,
            messageAtBooking: formData.message,
          }),
        });
        const contentType = response.headers.get("Content-Type");

        if (response.ok) {
          if (contentType && contentType.includes("application/json")) {
          const result = await response.json();
          console.log('POST response:', result);
            // Handle the JSON response here
          // Du kan hantera svaret här och uppdatera din komponent om det behövs.
        } else {
            const textResult = await response.text();
            console.log('POST response:', textResult);
            // Handle the text response here
          }
        }
          else {
          console.error('Server responded with non-OK status:', response.status);
        }
      } catch (error) {
        console.error('Error during fetch or response handling:', error);
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
                <option value="BASIC">Basic Städning - 800:-</option>
                <option value="TOPP">Topp Städning - 1000:-</option>
                <option value="DIAMANT">Diamant Städning - 1500:-</option>
                <option value="FÖNSTERTVÄTT">Fönstertvätt - 1800:-</option>
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
              <label>Tid för städning</label>
              <input
                  type="time"
                  value={formData.desiredTime}
                  onChange={handleInputChange}
                  name="desiredTime"
              />
            </div>
            <div className="form-group">
              <label>Adress</label>
              <textarea className={"textarea2"}
                  name="adress"
                  value={formData.adress}
                  onChange={handleInputChange}
                  placeholder="Ange adress"
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
