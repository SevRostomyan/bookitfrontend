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
        refreshUsers().then(r => {});
    }, []);

    const refreshUsers = async () => {
        await fetchUsers('städare/all', setCleaners);
        await fetchUsers('kunder/all', setCustomers);
    };

    const fetchUsers = async (endpoint, setUserList) => {
        try {
            const token = auth.token;
            const response = await fetch(`http://localhost:7878/api/admin/${endpoint}`, {
                method: 'GET',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (!response.ok) throw new Error('Failed to fetch users');
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

    const handleGenerateInvoice = async (user) => {
        try {
            const token = auth.token;
            const response = await fetch('http://localhost:7878/api/admin/generateInvoices', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ kundId: user.id }),
            });
            if (!response.ok) {
                throw new Error('Failed to generate invoice');
            }
            alert(`Invoice generated successfully for ${user.firstname} ${user.lastname}.`);
        } catch (error) {
            console.error('Error generating invoice:', error);
            alert('Failed to generate invoice');
        }
    };


    const renderUserTable = (users, userType) => (
        <div className="bookings">
            <h2>{userType === 'customers' ? 'Kunder' : 'Städare'}</h2>
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
                {users.map(user => (
                    <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.firstname} {user.lastname}</td>
                        <td>{user.email}</td>
                        <td>
                            <div className="actions-container">
                                <button className="user-action-button" onClick={() => handleDeleteUser(user.id, userType === 'customers' ? 'kund' : 'städare')}>Ta bort</button>
                                <button className="user-action-button" onClick={() => handleUpdateUser(user)}>Uppdatera</button>
                                {userType === 'customers' && <button className="user-action-button" onClick={() => handleGenerateInvoice(user)}>Fakturera</button>}
                            </div>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );





    return (
        <div>
            <h1>Användarhantering</h1>
            {renderUserTable(customers, 'customers')}
            {renderUserTable(cleaners, 'cleaners')}
            {showModal && <UpdateUserModal user={selectedUser} onClose={() => setShowModal(false)} onUpdate={onUpdateUser} />}
        </div>
    );
}

export default UserManagement;
