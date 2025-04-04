import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Login from './Login.jsx'
import { useState } from 'react'
import RedirectPage from './Redirectpage.jsx'
import Map from './components/Map.jsx'

const Main = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLoginSuccess = () => {
        setIsLoggedIn(true);
    };

    const currentPath = window.location.pathname;

    if (currentPath === '/map') {
        return (
            <StrictMode>
                <Map />
            </StrictMode>
        );
    }

    return (
        <StrictMode>
            {isLoggedIn ? <RedirectPage /> : <Login onLoginSuccess={handleLoginSuccess} />}
        </StrictMode>
    );
};

createRoot(document.getElementById('root')).render(<Main />);
