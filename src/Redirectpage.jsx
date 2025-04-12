import React from 'react';
import logo from './assets/Logo FINAL.png';
import './Login.css'; 

const RedirectPage = ({ onLogout }) => {
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
    
    const logoutButtonStyle = {
        position: 'absolute',
        top: '20px',
        right: '20px',
        padding: '8px 15px',
        cursor: 'pointer',
        backgroundColor: '#f44336',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        fontSize: '14px',
     }

    const handleResourcesClick = () => {
        alert('Resources button clicked!');
        
    }

    const handleDatabaseClick = () => {
    alert('Database button clicked!');
    }
    
    const handleMapRedirect = () => {
        window.location.href = '/map';
    }

    return (
        <div style={pageStyle}>
            <button style={logoutButtonStyle} onClick={onLogout}>
               Logout
            </button>
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
            <button onClick={handleMapRedirect}>
                Map
            </button>
        </div>
    </div>
  )
}

export default RedirectPage;