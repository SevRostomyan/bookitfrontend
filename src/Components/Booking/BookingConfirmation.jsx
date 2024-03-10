// BookingConfirmation.js
import React from 'react';

const BookingConfirmation = ({ bookingData, onConfirm, onCancel }) => {
    if (!bookingData) return null;

    return (
        <div className="modal">
            <div className="modal-content">
                <p className="text-gray-600">Typ: {bookingData.cleaningType}</p>
                <p className="text-gray-600">Datum: {bookingData.desiredDate}</p>
                <p className="text-gray-600">Tid: {bookingData.desiredTime}</p>
                <p className="text-gray-600">Adress: {bookingData.adress}</p>
                <p className="text-gray-600">Meddelande: {bookingData.message}</p>
                <button className="button-success mt-6" onClick={onConfirm}>Bekräfta</button>
                <button className="button-secondary mt-4" onClick={onCancel}>Avbryt</button>
            </div>
        </div>
    );
};

export default BookingConfirmation;
