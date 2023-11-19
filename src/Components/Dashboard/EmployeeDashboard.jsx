import React from 'react';
import '../../assets/EmployeeDash.css';

const EmployeeDashboard = () => {
    const handleStartCleaningClick = () => {
        const apiUrl = '/api/städare/startCleaning';

        // Anpassa detta objekt baserat på CleaningStatusRequest-strukturen i backend
        const requestData = {
            // Exempel: cleaningId: value1, osv.
        };

        fetch(apiUrl, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                // JWT-auth
            },
            body: JSON.stringify(requestData),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Något gick fel vid hämtning av data.');
                }
                return response.json();
            })
            .then(data => {
                // Logga
                console.log(data);
            })
            .catch(error => {
                // Felhantering
                console.error('Fetch error:', error);
            });
    };

    const handleReportCleaningCompletedClick = () => {
        const apiUrl = '/api/städare/reportCleaningCompleted';

        // Anpassa detta objekt baserat på CleaningStatusRequest-strukturen i backend
        const requestData = {

        };

        fetch(apiUrl, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                // JWT-Token auth här
            },
            body: JSON.stringify(requestData),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Något gick fel vid hämtning av data.');
                }
                return response.json();
            })
            .then(data => {
                // Logga
                console.log(data);
            })
            .catch(error => {
                // Felhantering
                console.error('Fetch error:', error);
            });
    };

    return (
        <div className="employee-dashboard">
            <div className="welcome-user">VÄLKOMMEN USER</div>
            <button className="dashboard-button" onClick={handleStartCleaningClick}>INBOKADE JOBB</button>
            <button className="dashboard-button" onClick={handleReportCleaningCompletedClick}>HISTORIK</button>
        </div>
    );
}

export default EmployeeDashboard;
