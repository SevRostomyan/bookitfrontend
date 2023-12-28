import React, { useState, useEffect } from 'react';
import { useAuth } from "../../AuthContext";
import UpdateUserModal from './UpdateUserModal';

function UserManagement() {
    const [cleaners, setCleaners] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const { auth } = useAuth();

    useEffect(() => {
        refreshUsers();
    }, []);

    const refreshUsers = () => {
        fetchUsers('städare/all', setCleaners);
        fetchUsers('kunder/all', setCustomers);
    };

    const fetchUsers = async (endpoint, setUserList) => {
        try {
            const token = auth.token;

            const response = await fetch(`http://localhost:7878/api/admin/${endpoint}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (!response.ok) {
                throw new Error('Failed to fetch users');
            }
            const data = await response.json();
            setUserList(data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleDeleteUser = async (userId, userType) => {
        try {
            const token = auth.token;
            const response = await fetch(`http://localhost:7878/api/admin/${userType}/delete`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ userId })
            });
            if (!response.ok) {
                throw new Error('Failed to delete user');
            }
            refreshUsers(); // Uppdatera listan med användare
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleUpdateUser = (user) => {
        setSelectedUser(user);
        setShowModal(true);
    };

    const onUpdateUser = async (updatedUser) => {
        try {
            const token = auth.token;
            const response = await fetch(`http://localhost:7878/api/admin/users/update`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedUser)
            });
            if (!response.ok) {
                throw new Error('Failed to update user');
            }
            setShowModal(false);
            refreshUsers(); // Uppdatera listan med användare
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
                        {cleaner.firstname} {cleaner.lastname} {cleaner.lastname} ({cleaner.email})
                        <button onClick={() => handleDeleteUser(cleaner.id, 'städare')}>Ta bort</button>
                        <button onClick={() => handleUpdateUser(cleaner)}>Uppdatera</button>
                    </div>
                ))}
            </div>
            <div>
                <h3>Kunder</h3>
                {customers.map(customer => (
                    <div key={customer.id}>
                        {customer.firstname} {customer.lastname} {customer.password} ({customer.email})
                        <button onClick={() => handleDeleteUser(customer.id, 'kund')}>Ta bort</button>
                        <button onClick={() => handleUpdateUser(customer)}>Uppdatera</button>
                    </div>
                ))}
            </div>
            {showModal && <UpdateUserModal user={selectedUser} onClose={() => setShowModal(false)} onUpdate={onUpdateUser} />}
        </div>
    );
}

export default UserManagement;
