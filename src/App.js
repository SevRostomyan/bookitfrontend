import './App.css';
import Navbar from "./Components/nav/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./Components/pages/Home";
import Register from "./Components/pages/Register";
import Booking from "./Components/pages/Booking";


function App() {
    return (
        <div className="App">
            <Navbar />
            <main>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/booking" element={<Booking />} />
                    <Route path="/register" element={<Register />} />
                </Routes>
            </main>
        </div>
    );

}

export default App;
