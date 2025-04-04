import React, { useEffect, useState, useRef } from 'react';

const GOOGLE_MAPS_API_KEY = 'AIzaSyBm8XXU3Qw-q50E14PnXRHKAT-u_fLmE24'; // Replace with your actual key

const Map = () => {
    const [ipAddress, setIpAddress] = useState(null);
    const [location, setLocation] = useState(null);
    const [loading, setLoading] = useState(true);
    const mapRef = useRef(null);

    // Load Google Maps script dynamically
    const loadGoogleMapsScript = () => {
        return new Promise((resolve) => {
            if (window.google) {
                resolve();
            } else {
                const script = document.createElement('script');
                script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}`;
                script.async = true;
                script.onload = resolve;
                document.body.appendChild(script);
            }
        });
    };

    // Fetch IP and location
    useEffect(() => {
        const fetchIpAndLocation = async () => {
            try {
                const response = await fetch('https://ipapi.co/json/');
                const data = await response.json();
                setIpAddress(data.ip);
                setLocation({ lat: data.latitude, lng: data.longitude });
            } catch (error) {
                console.error('Error fetching IP/location:', error);
                setIpAddress('Unavailable');
            } finally {
                setLoading(false);
            }
        };

        fetchIpAndLocation();
    }, []);

    // Initialize Google Map once location is available
    useEffect(() => {
        if (location) {
            loadGoogleMapsScript().then(() => {
                const map = new window.google.maps.Map(mapRef.current, {
                    center: location,
                    zoom: 12,
                });

                new window.google.maps.Marker({
                    position: location,
                    map,
                    title: 'Your Location',
                });
            });
        }
    }, [location]);

    return (
        <div style={{ textAlign: 'center', marginTop: '30px' }}>
            <h1>Welcome to the Map Page!</h1>
            <p>Your Public IP Address: <strong>{ipAddress || 'Loading...'}</strong></p>
            <p>Below is your approximate location based on your IP address:</p>

            {loading ? (
                <p>Loading your location...</p>
            ) : (
                <div
                    ref={mapRef}
                    style={{
                        height: '400px',
                        width: '80%',
                        margin: '20px auto',
                        border: '1px solid #ccc',
                        borderRadius: '10px',
                    }}
                />
            )}
        </div>
    );
};

export default Map;
