import React, { useState } from 'react';

function RegisterUserForm({ onUserAdded }) {
    const [userData, setUserData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        role: 'KUND'
    });

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:7878/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });
            if (!response.ok) {
                throw new Error('Failed to register user');
            }
            onUserAdded(); // Uppdatera användarlistan
        } catch (error) {
            console.error('Error during registration:', error);
        }
    };

    // Formulärfält för användaruppgifter och submit-knapp här

    return (
        <form onSubmit={handleSubmit}>
            {/* Formulärfält för användaruppgifter */}
            <button type="submit">Registrera Användare</button>
        </form>
    );


}

export default RegisterUserForm;
