import React from 'react';
import './App.css';
import Navbar from "./Components/nav/Navbar";
import {Route, Routes} from "react-router-dom";
import {BookingsProvider} from './BookingsContext';
import Home from "./Components/pages/Home";
import Register from "./Components/pages/Register";
import Booking from "./Components/pages/Booking";
import Login from "./Components/pages/Login";
import BookingHistoryComponent from "./Components/Booking/BookingHistoryComponent";
import AdminDashboard from "./Components/Dashboard/AdminDashboard";
import EmployeeDashboard from "./Components/Dashboard/EmployeeDashboard";
import CustomerDashboard from "./Components/Dashboard/CustomerDashboard";
import PerformedCleaningComponent from "./Components/Booking/PerformedCleaningComponent";
import BookingAdminPanel from "./Components/Admin/BookingAdminPanel";
import BookedJobs from "./Components/Dashboard/BookedJobs";
import HanteraAktuellaBokningar from "./Components/Dashboard/HanteraAktuellaBokningar";
import DownloadPdf from './Components/Dashboard//DownloadPdf';
import MinaBokningar from "./Components/pages/MinaAktuellaBokningar";


function App() {
    return (
        <div className="App">
            <Navbar/>
            <main>
                <BookingsProvider>
                    <Routes>
                        <Route path="/login" element={<Login/>}/>
                        <Route path="/register" element={<Register/>}/>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/booking" element={<Booking/>}/>
                        <Route path="/history" element={<BookingHistoryComponent/>}/>
                        <Route path="/performed-cleaning" element={<PerformedCleaningComponent/>}/>
                        <Route path="/admin-dashboard/*" element={<AdminDashboard/>}/>
                        <Route path="/booking-admin-panel" element={<BookingAdminPanel/>}/>
                        <Route path="/employee-dashboard" element={<EmployeeDashboard/>}/>
                        <Route path="/customer-dashboard" element={<CustomerDashboard/>}/>
                        <Route path="/mina-aktuella-bokningar" element={<MinaBokningar/>}/>
                        <Route path="/mina-fakturor" element={<DownloadPdf/>}/>
                        <Route path="/booked-jobs" element={<BookedJobs/>}/>
                    </Routes>
                </BookingsProvider>
            </main>
        </div>
    );
}

export default App;
