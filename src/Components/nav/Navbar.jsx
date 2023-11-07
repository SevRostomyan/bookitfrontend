import { Link } from "react-router-dom";

export default function Navbar() {

    return (
        <nav className="nav">
            <div className="container-xl mx-auto px-8 flex justify-between items-center">
                <Link to="/" className="button button-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-white">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                    </svg>
                </Link>
                <ul className="flex gap-4">
                    <li>
                        <Link to="/booking" className="button button-primary">Bokning</Link>
                    </li>
                </ul>
                <ul className="flex gap-4">
                    <li><Link to="/login" className="button button-white">Logga in</Link></li>
                    <li><Link to="/register" className="button button-secondary">Registrera</Link></li>
                </ul>
            </div>
        </nav>
    );
}