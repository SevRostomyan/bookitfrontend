import React from 'react';
import '../assets/TimeoutPopupComponent.css';
const TimeoutPopupComponent = ({ onStayLoggedIn }) => {
    return (
        <div className="timeout-popup">
            <h2>Sessionen löper ut</h2>
            <p>Din session kommer att löpa ut på grund av inaktivitet.</p>
            <button onClick={onStayLoggedIn}>
                Fortsätt vara inloggad
            </button>
        </div>
    );
};

export default TimeoutPopupComponent;
