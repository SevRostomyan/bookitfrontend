import React, { useState } from 'react';
import {useAuth} from "../../AuthContext";

function RegisterUserForm({ onUserAdded }) {
    const [userData, setUserData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        role: 'KUND'
    });
    const { auth } = useAuth();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setUserData({ ...userData, [name]: value });
    };

    const handleSubmit = async (event) => {
        const token = auth.token;
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:7878/api/auth/register', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
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

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="firstname"
                value={userData.firstname}
                onChange={handleChange}
                placeholder="Förnamn"
                required
            />
            <input
                type="text"
                name="lastname"
                value={userData.lastname}
                onChange={handleChange}
                placeholder="Efternamn"
                required
            />
            <input
                type="email"
                name="email"
                value={userData.email}
                onChange={handleChange}
                placeholder="Email"
                required
            />
            <input
                type="password"
                name="password"
                value={userData.password}
                onChange={handleChange}
                placeholder="Lösenord"
                required
            />
            <select
                name="role"
                value={userData.role}
                onChange={handleChange}
                required
            >
                <option value="KUND">Kund</option>
                <option value="STÄDARE">Städare</option>
                <option value="ADMIN">Admin</option>
            </select>
            <button type="submit">Registrera Användare</button>
        </form>
    );
}

export default RegisterUserForm;
