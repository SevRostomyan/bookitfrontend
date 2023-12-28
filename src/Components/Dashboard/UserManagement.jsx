import React, { useState, useEffect } from 'react';
import { useAuth } from "../../AuthContext";

function UserManagement() {
    const [users, setUsers] = useState([]);
    const { auth } = useAuth();

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const token = auth.token;
            const response = await fetch('http://localhost:7878/api/admin/users/all', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (!response.ok) {
                throw new Error('Failed to fetch users');
            }
            const data = await response.json();
            setUsers(data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const updateUser = (userId) => {
        // Öppna en modal eller navigera till en sida för att uppdatera användaren
        console.log(`Öppnar uppdateringsmodal för användare ${userId}`);
    };

    const deleteUser = async (userId) => {
        try {
            const token = auth.token;
            const response = await fetch(`http://localhost:7878/api/admin/users/delete`, {
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
            // Uppdatera listan efter borttagning
            fetchUsers();
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <h2>Användarhantering</h2>
            <table>
                <thead>
                <tr>
                    <th>Namn</th>
                    <th>Roll</th>
                    <th>Åtgärder</th>
                </tr>
                </thead>
                <tbody>
                {users.map(user => (
                    <tr key={user.id}>
                        <td>{user.name}</td>
                        <td>{user.role}</td>
                        <td>
                            <button onClick={() => updateUser(user.id)}>Uppdatera</button>
                            <button onClick={() => deleteUser(user.id)}>Ta bort</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default UserManagement;
