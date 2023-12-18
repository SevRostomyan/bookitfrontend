import React, { useState, useEffect } from 'react';

function UserManagement() {
    const [searchTerm, setSearchTerm] = useState('');
    const [users, setUsers] = useState([]);

    useEffect(() => {
        if (searchTerm) {
            searchUsers(searchTerm);
        }
    }, [searchTerm]);

    const searchUsers = async (query) => {
        try {
            const userType = query.includes('@') ? 'städare' : 'kunder'; // Antag att e-postadress indikerar en städare
            const response = await fetch(`http://localhost:7878/api/admin/search/${userType}?query=${query}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer YOUR_TOKEN`
                }
            });
            if (!response.ok) {
                throw new Error(`Failed to fetch users`);
            }
            const data = await response.json();
            setUsers(data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <h2>Användarhantering</h2>
            <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Sök användare..."
            />
            <button onClick={() => searchUsers(searchTerm)}>Sök</button>
            <div>
                {users.map(user => (
                    <div key={user.id}>{user.name}</div> // Antag att varje användare har ett id och namn
                ))}
            </div>
        </div>
    );
}

export default UserManagement;
