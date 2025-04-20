import { StrictMode, useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client'
import './index.css'
import Login from './Login.jsx'
import RedirectPage from './Redirectpage.jsx';
import Map from './components/Map.jsx';
import Resources from './components/Resources.jsx';
import initialMasterList from './assets/masterList.js';

const Main = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(() =>{
        return sessionStorage.getItem('isLoggedIn') === 'true';
    });
    
    const [loggedInUser, setLoggedInUser] = useState(() => {
        return sessionStorage.getItem('loggedInUser') || '';
    });
    const [masterList, setMasterList] = useState(initialMasterList);
    const [authView, setAuthView] = useState('login');
    
    useEffect(() => {
        if (isLoggedIn && loggedInUser) {
            sessionStorage.setItem('loggedInUser', loggedInUser);
        } 
        else {
            sessionStorage.removeItem('loggedInUser');
        }
    }, [isLoggedIn, loggedInUser]);
    
    const handleLoginSuccess = (username) => {
        setIsLoggedIn(true);
        setLoggedInUser(username); 
        sessionStorage.setItem('isLoggedIn', 'true');
        sessionStorage.setItem('loggedInUser', username);
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setLoggedInUser('');
        sessionStorage.removeItem('isLoggedIn');
        sessionStorage.removeItem('loggedInUser'); 
        setAuthView('login'); 
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
                <RedirectPage onLogout={handleLogout} username={loggedInUser} />
            ) : (
                <Login
                    onLoginSuccess={handleLoginSuccess}
                    masterList={masterList}         
                    setMasterList={setMasterList}   
                    authView={authView}           
                    setAuthView={setAuthView}       
                />
            )}
        </StrictMode>
    )
}

createRoot(document.getElementById('root')).render(<Main />);