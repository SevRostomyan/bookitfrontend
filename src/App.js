import './App.css';
import RegistrationForm from '../src/Components/Registration/ReqistrationForm';
import BookingForm from '../src/Components/Booking/BookingForm';
import BookedClean from '../src/Components/BookedCleanings/BookedClean'
import CleaningApproval from '../src/Components/CleaningApproval1/CleaningApproval'

function App() {
    const cleaningData = {
        date: '2023-11-01',
        time: '10:00 AM',
        cleaningCompany: 'Exempel Städföretag',
    };

    return (
        <div className="App">
            <RegistrationForm />
            <BookingForm />
            <BookedClean />
            <CleaningApproval cleaning={cleaningData}/>
        </div>
    );
}

export default App;
