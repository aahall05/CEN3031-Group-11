import React from 'react';
import logo from './assets/Logo FINAL.png';
import './Login.css'; 

const RedirectPage = ({ onLogout, username }) => {
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
        marginTop: '30px',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: '10px'
        
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
        window.location.href = '/resources';
    }

    const handleDatabaseClick = () => {
    alert('Database button clicked!');
    }
    
    const handleMapRedirect = () => {
        window.location.href = '/map';
    }

    return (
        <div style={pageStyle}>
            <button style={logoutButtonStyle} onClick={onLogout}>Logout</button>
           
            <img src={logo} alt="Logo" style={logoStyle} />
            <h1>Welcome {username}!</h1>
            <p>You have successfully logged in.</p>
            
            <div style={buttonContainerStyle}>
                <button onClick={handleResourcesClick}>Resources</button>
                <button onClick={handleDatabaseClick}>Database</button>
                <button onClick={handleMapRedirect}>Map</button>
            </div>
        </div>
  )
}

export default RedirectPage;