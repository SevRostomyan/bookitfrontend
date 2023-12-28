import React, { useState, useEffect } from 'react';
import { useAuth } from "../../AuthContext";

function UserManagement() {
    const [cleaners, setCleaners] = useState([]);
    const [customers, setCustomers] = useState([]);
    const { auth } = useAuth();

    useEffect(() => {
        fetchUsers('städare', setCleaners);
        fetchUsers('kunder', setCustomers);
    }, []);

    const fetchUsers = async (userType, setUserList) => {
        try {
            const token = auth.token;
            const response = await fetch(`http://localhost:7878/api/admin/${userType}/all`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (!response.ok) {
                throw new Error(`Failed to fetch ${userType}`);
            }
            const data = await response.json();
            setUserList(data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const updateUser = (userId) => {
        // Öppna en modal för att uppdatera användaren
        console.log(`Öppnar uppdateringsmodal för användare ${userId}`);
    };

    const deleteUser = async (userId, userType) => {
        try {
            const token = auth.token;
            const response = await fetch(`http://localhost:7878/api/admin/${userType}/delete`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ userId })
            });
            if (!response.ok) {
                throw new Error(`Failed to delete user ${userId}`);
            }
            // Uppdatera listorna efter borttagning
            fetchUsers('städare', setCleaners);
            fetchUsers('kunder', setCustomers);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <h2>Användarhantering</h2>
            <div>
                <h3>Städare</h3>
                {cleaners.map(cleaner => (
                    <div key={cleaner.id}>
                        {cleaner.name}
                        <button onClick={() => updateUser(cleaner.id)}>Uppdatera</button>
                        <button onClick={() => deleteUser(cleaner.id, 'städare')}>Ta bort</button>
                    </div>
                ))}
            </div>
            <div>
                <h3>Kunder</h3>
                {customers.map(customer => (
                    <div key={customer.id}>
                        {customer.name}
                        <button onClick={() => updateUser(customer.id)}>Uppdatera</button>
                        <button onClick={() => deleteUser(customer.id, 'kund')}>Ta bort</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default UserManagement;
