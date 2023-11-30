import React, { useState, useEffect } from 'react';

function UsersList() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await fetch('http://localhost:7878/api/admin/users', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer YOUR_TOKEN`
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

    const deleteUser = async (userId) => {
        // Här skulle du anropa din deleteUser endpoint
    };

    return (
        <div>
            {/* Rendera användarlista med borttagning */}
        </div>
    );
}

export default UsersList;
