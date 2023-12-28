import React, { useState } from 'react';
import '../../assets/UpdateUserModal.css';

function UpdateUserModal({ user, onClose, onUpdate }) {
    const [updatedUser, setUpdatedUser] = useState({ ...user });

    const handleChange = (e) => {
        setUpdatedUser({ ...updatedUser, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdate(updatedUser);
    };

    return (
        <div className="update-user-modal">
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <form onSubmit={handleSubmit}>
                    <label>Förnamn:</label>
                    <input type="text" name="firstname" value={updatedUser.firstname} onChange={handleChange} />

                    <label>Efternamn:</label>
                    <input type="text" name="lastname" value={updatedUser.lastname} onChange={handleChange} />

                    <label>Email:</label>
                    <input type="email" name="email" value={updatedUser.email} onChange={handleChange} />

                    <button type="submit">Uppdatera Användare</button>
                </form>
            </div>
        </div>
    );
}

export default UpdateUserModal;
