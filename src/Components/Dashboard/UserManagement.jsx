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

    const handleGenerateInvoice = async (userId) => {
        try {
            const token = auth.token;
            const response = await fetch('http://localhost:7878/api/admin/generateInvoices', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ kundId: userId }),
            });
            if (!response.ok) {
                throw new Error('Failed to generate invoice');
            }
            alert('Invoice generated successfully for user ID: ' + userId);
        } catch (error) {
            console.error('Error generating invoice:', error);
            alert('Failed to generate invoice');
        }
    };

    const renderUserRows = (users) => users.map(user => (
        <tr key={user.id}>
            <td>{user.id}</td>
            <td>{user.firstname} {user.lastname}</td>
            <td>{user.email}</td>
            <td>
                <button onClick={() => handleDeleteUser(user.id)}>Ta bort</button>
                <button onClick={() => handleUpdateUser(user)}>Uppdatera</button>
                <button onClick={() => handleGenerateInvoice(user.id)}>Fakturera</button>
            </td>
        </tr>
    ));

    return (
        <div>
            <h2>Användarhantering</h2>
            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Namn</th>
                    <th>Email</th>
                    <th>Åtgärder</th>
                </tr>
                </thead>
                <tbody>
                {renderUserRows([...cleaners, ...customers])}
                </tbody>
            </table>
            {showModal && <UpdateUserModal user={selectedUser} onClose={() => setShowModal(false)} onUpdate={onUpdateUser} />}
        </div>
    );
}

export default UserManagement;
