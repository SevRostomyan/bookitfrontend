import React, { useState } from 'react';

const CleaningApproval = ({ cleaning }) => {
    const [approved, setApproved] = useState(false);

    const handleApproval = (isApproved) => {
        setApproved(isApproved);
    };

    return (
        <div className="cleaning-approval">
            <h2>Godkänn avslutad städning</h2>
            <div className="cleaning-details">
                <p>Datum: {cleaning.date}</p>
                <p>Tid: {cleaning.time}</p>
            </div>
            <div className="approval-buttons">
                <button onClick={() => handleApproval(true)}>Godkänn</button>
                <button onClick={() => handleApproval(false)}>Ogiltigförklara</button>
            </div>
            {approved && <p>Städningen är godkänd.</p>}
            {approved === false && <p>Städningen är ogiltigförklarad.</p>}
        </div>
    );
};

export default CleaningApproval;
