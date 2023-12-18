import React, { useState, useEffect } from 'react';

function UserManagement() {
    const [cleaners, setCleaners] = useState([]);
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        fetchUsers('städare', setCleaners);
        fetchUsers('kunder', setCustomers);
    }, []);

    const fetchUsers = async (userType, setUserList) => {
        try {
            const response = await fetch(`http://localhost:7878/api/admin/${userType}/all`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer YOUR_TOKEN`
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
                {/* Rendera listan med städare */}
                {cleaners.map(cleaner => (
                    <div key={cleaner.id}>{cleaner.name}</div> // Antag att varje städare har ett id och namn
                ))}
            </div>
            <div>
                <h3>Kunder</h3>
                {/* Rendera listan med kunder */}
                {customers.map(customer => (
                    <div key={customer.id}>{customer.name}</div> // Antag att varje kund har ett id och namn
                ))}
            </div>
        </div>
    );
}

export default UserManagement;
