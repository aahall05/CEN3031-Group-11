import React, { useState } from 'react';
import './Login.css';
import logo from './assets/Logo FINAL.png';
import handleSubmit from './assets/handleSubmit.js';

const Login = ({ onLoginSuccess, masterList, setMasterList, authView, setAuthView }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginErrorMessage, setLoginErrorMessage] = useState('');

    
    const [regUsername, setRegUsername] = useState('');
    const [regPassword, setRegPassword] = useState('');
    const [regConfirmPassword, setRegConfirmPassword] = useState('');
    const [regErrorMessage, setRegErrorMessage] = useState('');
    const [regSuccessMessage, setRegSuccessMessage] = useState('');

    const handleLoginFormSubmit = (e) => {
        handleSubmit(e, username, password, masterList, setLoginErrorMessage, (user) => onLoginSuccess(user.username)); 
 }

    const handleRegistrationFormSubmit = (e) => {
        e.preventDefault();
        setRegErrorMessage(''); 
        setRegSuccessMessage(''); 

        if (!regUsername.trim() || !regPassword.trim() || !regConfirmPassword.trim()) {
            setRegErrorMessage('All fields are required.');
            return;
        }
        if (regPassword !== regConfirmPassword) {
            setRegErrorMessage('Passwords do not match.');
            return;
        }
        if (masterList.some(user => user.username.toLowerCase() === regUsername.trim().toLowerCase())) {
            setRegErrorMessage('Username already exists.');
            return;
        }

        const newUser = { username: regUsername.trim(), password: regPassword };
        setMasterList([...masterList, newUser]); 

        setRegUsername('');
        setRegPassword('');
        setRegConfirmPassword('');
        setRegSuccessMessage('Registration successful! You can now log in.');
    };

    return (
        <div className="container">
            <img src={logo} alt="Logo" className="login-logo" />
            {authView === 'login' ? (
                <form onSubmit={handleLoginFormSubmit}>
                    <div>
                        <label htmlFor="username">Username:</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    {loginErrorMessage && <p className="error-message" style={{color: 'red'}}>{loginErrorMessage}</p>}
                    <button type="submit">Login</button>
                    <button type="button" onClick={() => setAuthView('registration')} style={{marginTop: '10px', backgroundColor: '#6c757d'}}>
                        Register
                    </button>
                </form>
            ) : (
                <form onSubmit={handleRegistrationFormSubmit}>
                     <h2>Register New User</h2>
                     <div>
                        <label htmlFor="regUsername">Username:</label>
                        <input
                            type="text"
                            id="regUsername"
                            value={regUsername}
                            onChange={(e) => setRegUsername(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="regPassword">Password:</label>
                        <input
                            type="password"
                            id="regPassword"
                            value={regPassword}
                            onChange={(e) => setRegPassword(e.target.value)}
                        />
                    </div>
                     <div>
                        <label htmlFor="regConfirmPassword">Confirm Password:</label>
                        <input
                            type="password"
                            id="regConfirmPassword"
                            value={regConfirmPassword}
                            onChange={(e) => setRegConfirmPassword(e.target.value)}
                        />
                    </div>
                    {regErrorMessage && <p className="error-message" style={{color: 'red'}}>{regErrorMessage}</p>}
                    {regSuccessMessage && <p className="success-message" style={{color: 'green'}}>{regSuccessMessage}</p>}
                    <button type="submit">Register</button>
                    <button type="button" onClick={() => { setAuthView('login'); setRegErrorMessage(''); setRegSuccessMessage(''); }} style={{marginTop: '10px', backgroundColor: '#6c757d'}}>
                        Back to Login
                    </button>
                </form>
            )}
        </div>
    );
};

export default Login;