import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import TimeoutPopupComponent from "./Components/TimeoutPopupComponent";


const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({ token: null, userId: null, role: null });
    const [isPopupVisible, setPopupVisible] = useState(false);
    const inactivityTimer = useRef(null);

    const logoutTimer = useRef(null);
    const navigate = useNavigate();

    const tokenLifeSpan = 15 * 60 * 1000; // 15 minutes
    const alertBefore = 5 * 60 * 1000; // alert 5 minutes before token expiry

    useEffect(() => {
            if (auth.token) {
                const handleActivity = () => {
                    setPopupVisible(false);
                    clearTimeout(inactivityTimer.current);
                    inactivityTimer.current = setTimeout(() => setPopupVisible(true), tokenLifeSpan - alertBefore);
                };


                // Setup event listeners for user activity
                window.addEventListener('mousemove', handleActivity);
                window.addEventListener('keypress', handleActivity);

                // Start the inactivity timer
                inactivityTimer.current = setTimeout(() => setPopupVisible(true), tokenLifeSpan - alertBefore);

                // Cleanup
                return () => {
                    window.removeEventListener('mousemove', handleActivity);
                    window.removeEventListener('keypress', handleActivity);
                    clearTimeout(inactivityTimer.current);
                };
            }
    }, [auth.token, alertBefore, tokenLifeSpan]);

    const logout = async () => {
        try {
            const response = await fetch('http://localhost:7878/api/auth/logout', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${auth.token}`,
                },
            });

            if (response.ok) {
                // Clear the authentication state
                setAuth({ token: null, userId: null, role: null });

                // Clear the timers
                clearTimeout(inactivityTimer.current);
                clearTimeout(logoutTimer.current);

                // Hide the popup
                setPopupVisible(false);

                // Redirect to the home page
                navigate('/');
            } else {
                console.error('Logout failed:', response.status);
            }
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };


    const autoLogout = async () => {
        // Use the logout function for auto-logout
        await logout();
    };

    useEffect(() => {
        if (isPopupVisible) {
            logoutTimer.current = setTimeout(autoLogout, 3 * 60 * 1000); // 3 minutes
        }

        return () => {
            clearTimeout(logoutTimer.current);
        };
    }, [isPopupVisible]);

    const refreshToken = async () => {
        // Check if the token exists and is not null
        if (!auth.token) {
            console.error('No token available for refresh');

            // Optionally, display a message to the user
            alert("Din session har löpt ut. Var god logga in igen.");

            // Redirect to the login page
            navigate('/login');
            return;
        }



        try {
            const response = await fetch('http://localhost:7878/api/auth/refresh-token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${auth.token}`
                },
            });
            const data = await response.json();

            if (data.token) {
                setAuth({ ...auth, token: data.token });
                clearTimeout(logoutTimer.current);
            } else {
                console.error('Failed to refresh token');
            }
        } catch (error) {
            console.error('Error refreshing token:', error);
        }
    };

    return (
        <AuthContext.Provider value={{ auth, setAuth, refreshToken, logout }}>
            {children}
            {isPopupVisible && auth.token && ( // Ensure popup is shown only when user is logged in
                <TimeoutPopupComponent
                    onStayLoggedIn={() => {
                        refreshToken().then(r => {});
                        setPopupVisible(false);
                    }}
                />
            )}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);



