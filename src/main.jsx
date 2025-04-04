import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Login from './Login.jsx'
import {useState } from 'react';
import RedirectPage from './Redirectpage.jsx';



const Main = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const handleLoginSuccess = () => {
    setIsLoggedIn(true);
}

    return (
        <StrictMode>
            {isLoggedIn ? <RedirectPage /> : <Login onLoginSuccess={handleLoginSuccess} />}
        </StrictMode>
    )
}

createRoot(document.getElementById('root')).render(<Main />);