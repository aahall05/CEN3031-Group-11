import React from 'react';
import logo from './assets/Logo FINAL.png';
import './Login.css'; 

const RedirectPage = () => {
    const pageStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
        fontFamily: 'Arial, sans-serif'
        
    }

    const logoStyle = {
        width: '300px', 
        marginBottom: '20px'
        
    }

    const buttonContainerStyle = {
        marginTop: '30px'
        
    }

    const handleResourcesClick = () => {
        alert('Resources button clicked!');
        
    }

    const handleDatabaseClick = () => {
    alert('Database button clicked!');
    }

    return (
        <div style={pageStyle}>
            <img src={logo} alt="Logo" style={logoStyle} />
            <h1>Welcome!</h1>
            <p>You have successfully logged in.</p>
            <div style={buttonContainerStyle}>
                <button onClick={handleResourcesClick}>
                    Resources
            </button>
            <button onClick={handleDatabaseClick}>
                Database
            </button>
        </div>
    </div>
  )
}

export default RedirectPage;