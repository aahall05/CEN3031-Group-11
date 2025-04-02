import React, { useState } from 'react';
import './Login.css';
import logo from './assets/Logo FINAL.png';
import masterList from './assets/masterList.js';
import handleSubmit from './assets/handleSubmit.js'; 

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    return (
        <div className="container">
            <img src={logo} alt="Logo" className="login-logo" />
            <form onSubmit={(e) => handleSubmit(e, username, password, masterList, setErrorMessage)}>
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
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;