import React, { useState } from 'react';
import { useAuth } from '../../AuthContext';

function GenerateInvoices() {
    const { auth } = useAuth();
    const [kundId, setKundId] = useState('');

    async function generateInvoices() {
        try {
            const response = await fetch('http://localhost:7878/api/admin/generateInvoices', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${auth.token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ kundId: kundId }),
            });

            if (!response.ok) {
                throw new Error('Failed to generate invoices');
            }

            const data = await response.json();
            console.log(data);
            alert('Invoices generated successfully for KundId: ' + kundId);
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to generate invoices.');
        }
    }

    return (
        <div>
            <input
                type="text"
                placeholder="Enter KundId"
                value={kundId}
                onChange={e => setKundId(e.target.value)}
            />
            <button className="dashboard-button" onClick={generateInvoices}>Generate Invoices</button>
        </div>
    );
}

export default GenerateInvoices;
