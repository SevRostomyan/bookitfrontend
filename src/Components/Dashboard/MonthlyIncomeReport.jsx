import React, { useState, useEffect } from 'react';

function MonthlyIncomeReport() {
    const [incomeReport, setIncomeReport] = useState({});

    const fetchMonthlyIncome = async (cleanerId) => {
        try {
            const response = await fetch(`http://localhost:7878/api/admin/calculateCleanerMonthlyIncome`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer YOUR_TOKEN`
                },
                body: JSON.stringify({ cleanerId })
            });
            if (!response.ok) {
                throw new Error('Failed to fetch monthly income');
            }
            const data = await response.json();
            setIncomeReport(data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            {/* Rendera månatlig inkomstrapport */}
        </div>
    );
}

export default MonthlyIncomeReport;
