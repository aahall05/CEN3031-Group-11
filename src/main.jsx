import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Login from './Login.jsx'
import { useState } from 'react';
import RedirectPage from './Redirectpage.jsx';
import Map from './components/Map.jsx';
import Resources from './components/Resources.jsx';

const Main = () => {
    // Initialize isLoggedIn from sessionStorage
    const [isLoggedIn, setIsLoggedIn] = useState(() =>{
        return sessionStorage.getItem('isLoggedIn') === 'true';
    });

    const handleLoginSuccess = () => {
        setIsLoggedIn(true);
        sessionStorage.setItem('isLoggedIn', 'true'); // Record login state
    };

    const handleLogout = () => {
        setIsLoggedIn(false);        
        sessionStorage.removeItem('isLoggedIn'); // Clear login state
        window.location.href = '/';
    };

    const currentPath = window.location.pathname;

    if (currentPath === '/map') {
        return (
            <StrictMode>
                <Map onLogout={handleLogout} />
            </StrictMode>
        );
    }
    else if (currentPath === '/resources') {
        return (
            <StrictMode>
                <Resources onLogout={handleLogout}/>
            </StrictMode>
        );
    }

    return (
        <StrictMode>
            {isLoggedIn ? (
                <RedirectPage onLogout={handleLogout} />
            ) : (
                <Login onLoginSuccess={handleLoginSuccess} />
            )}
        </StrictMode>
    )
}

createRoot(document.getElementById('root')).render(<Main />);