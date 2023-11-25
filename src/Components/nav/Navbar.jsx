import { Link } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {

    let [isOpen, setOpen] = useState(false);

    return (
        <nav className="nav text-sm md-text-base">
            {/*Mobile*/}

            <div className={`relative z-40 ${isOpen ? 'md-hidden' : 'hidden'}`}>
                <div className={`fixed inset-0 bg-black/25`}></div>
                <div className="fixed inset-0 z-40 flex">
                    <div className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
                        {/*Close Btn*/}
                        <div className="flex px-4 pb-2 pt-5">
                            <button type="button" onClick={() => setOpen(!isOpen)} className="button button-link ml-auto w-auto inline-flex items-center">
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path>
                                </svg>
                            </button>
                        </div>

                        <div className="p-4">
                            <ul className="flex flex-col gap-2">
                                <li>
                                    <Link to="/" className="button button-link">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-primary">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                                        </svg>
                                    </Link>
                                </li>
                                <li><Link to="/booking" className="button button-link">Bokning</Link></li>
                                <li><Link to="/history" className="button button-link">Historik</Link></li>
                            </ul>

                            <div className="p-4"><hr/></div>

                            <ul className="flex flex-col gap-2 pt-4">
                                <li><Link to="/login" className="button button-white">Logga in</Link></li>
                                <li><Link to="/register" className="button button-secondary">Registrera</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container-xl flex md-hidden mx-auto px-8 justify-between items-center">
                <ul className="flex gap-4">
                    <li>
                        <button type="button" onClick={() => setOpen(!isOpen)} className="button button-primary flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                            </svg>
                        </button>
                    </li>
                </ul>
                <ul className="flex gap-4">
                    <li><Link to="/login" className="button button-white">Logga in</Link></li>
                    <li><Link to="/register" className="button button-secondary">Registrera</Link></li>
                </ul>
            </div>

            {/*Desktop*/}
            <div className="container-xl hidden md-flex mx-auto px-8 justify-between items-center">
                <Link to="/" className="button button-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-white">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                    </svg>
                </Link>
                <ul className="flex gap-4">
                    <li><Link to="/booking" className="button button-primary">Bokning</Link></li>
                    <li><Link to="/history" className="button button-primary">Historik</Link></li>
                </ul>
                <ul className="flex gap-4">
                    <li><Link to="/login" className="button button-white">Logga in</Link></li>
                    <li><Link to="/register" className="button button-secondary">Registrera</Link></li>
                </ul>
            </div>
        </nav>
    );
}