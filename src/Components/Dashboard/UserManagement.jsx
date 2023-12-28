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
            const endpoint = userType === 'städare' ? 'städare/all' : 'kunder/all';
            const token = auth.token;

            const response = await fetch(`http://localhost:7878/api/admin/${endpoint}`, {
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

    return (
        <div>
            <h2>Användarhantering</h2>
            <div>
                <h3>Städare</h3>
                {cleaners.map(cleaner => (
                    <div key={cleaner.id}>{cleaner.name}</div>
                ))}
            </div>
            <div>
                <h3>Kunder</h3>
                {customers.map(customer => (
                    <div key={customer.id}>{customer.name}</div>
                ))}
            </div>
        </div>
    );
}

export default UserManagement;
