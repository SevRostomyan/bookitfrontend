import './App.css';
import RegistrationForm from '../src/Components/Registration/ReqistrationForm';
import BookingForm from '../src/Components/Booking/BookingForm';
import BookedClean from '../src/Components/BookedCleanings/BookedClean'

function App() {
    return (
        <div className="App">
            <RegistrationForm />
            <BookingForm />
            <BookedClean />
        </div>
    );
}

export default App;
