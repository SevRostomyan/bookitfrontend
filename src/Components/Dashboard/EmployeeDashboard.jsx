import React, { useState, useEffect } from 'react';
import '../../assets/Dashboard.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../AuthContext';

const EmployeeDashboard = () => {
    const navigate = useNavigate();
    const { auth } = useAuth();
    const [monthlyIncome, setMonthlyIncome] = useState(null);

    useEffect(() => {
        if (auth && auth.token) {
            fetch('http://localhost:7878/api/bokning/calculateMonthlyIncome', {
                method: 'GET',
                headers: { 'Authorization': `Bearer ${auth.token}` }
            })
                .then(response => response.json())
                .then(data => setMonthlyIncome(data))
                .catch(error => console.error('Error fetching monthly income:', error));
        }
    }, [auth]);

    const handleInbokadeJobbClick = () => { navigate('/booked-jobs'); };
    const handleHistorikClick = () => { navigate('/history'); };

    const isIncomeDataEmpty = () => {
        return !monthlyIncome || Object.keys(monthlyIncome).length === 0;
    };

    const formatIncomeDisplay = () => {
        const monthNames = ["Januari", "Februari", "Mars", "April", "Maj", "Juni",
            "Juli", "Augusti", "September", "Oktober", "November", "December"];
        return Object.entries(monthlyIncome).map(([yearMonth, income]) => {
            const [year, month] = yearMonth.split('-');
            return (
                <p key={yearMonth}>
                    Omsättning för {monthNames[parseInt(month) - 1]} {year}: SEK {income}
                </p>
            );
        });
    };

    return (
        <div className="dashboard">
            <div className="dashboard-welcome">PERSONAL</div>
            <div className="dashboard-options">
                <button className="dashboard-button" onClick={handleInbokadeJobbClick}>INBOKADE JOBB</button>
                <button className="dashboard-button" onClick={handleHistorikClick}>HISTORIK</button>
            </div>
            <div className="dashboard-income">
                <h2 className="h2-omsättning">Omsättning - Avslutade jobb per månad</h2>
                {isIncomeDataEmpty() ? (
                    <p>Ingen data tillgänglig</p>
                ) : (
                    formatIncomeDisplay()
                )}
            </div>
        </div>
    );
}

export default EmployeeDashboard;
