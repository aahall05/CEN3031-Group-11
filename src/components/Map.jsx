import React, { useEffect, useState, useRef } from 'react';

const GOOGLE_MAPS_API_KEY = 'AIzaSyBm8XXU3Qw-q50E14PnXRHKAT-u_fLmE24'; // Replace with your actual key

const Map = ({ onLogout }) => {
    const [ipAddress, setIpAddress] = useState(null);
    const [location, setLocation] = useState(null);
    const [loading, setLoading] = useState(true);
    const [places, setPlaces] = useState([]);
    const mapRef = useRef(null);
    
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
     };
    // Load Google Maps script dynamically
    const loadGoogleMapsScript = () => {
        return new Promise((resolve) => {
            if (window.google) {
                resolve();
            } else {
                const script = document.createElement('script');
                script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`;
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

                // Only use IPv4 for display
                const ip = data.ip && !data.ip.includes(':') ? data.ip : null;
                setIpAddress(ip);

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

                // Search for nearby emergency shelters
                const service = new window.google.maps.places.PlacesService(map);
                const request = {
                    location: location,
                    radius: 10000,
                    keyword: 'emergency shelter',
                };

                service.nearbySearch(request, (results, status) => {
                    if (status === window.google.maps.places.PlacesServiceStatus.OK) {
                        setPlaces(results);
                        results.forEach(place => {
                            new window.google.maps.Marker({
                                position: place.geometry.location,
                                map,
                                title: place.name,
                            });
                        });
                    }
                });
            });
        }
    }, [location]);

    return (
        <div style={{ padding: '30px' }}>
            <h1 style={{ textAlign: 'center' }}>Welcome to the Map Page!</h1>
    
            <div style={{ display: 'flex', flexDirection: 'row', gap: '40px', justifyContent: 'center', marginTop: '30px' }}>
                {/* Left side: IP & Map */}
                <div style={{ flex: '1', maxWidth: '90%' }}>
                    {ipAddress && (
                        <div style={{
                            marginBottom: '20px',
                            padding: '10px 20px',
                            border: '1px solid #ccc',
                            borderRadius: '8px',
                            backgroundColor: '#f9f9f9',
                            fontFamily: 'monospace',
                            fontSize: '16px',
                            width: 'fit-content'
                        }}>
                            <p style={{ margin: 0 }}>
                                Your Public IP Address:
                                <br />
                                <strong>{ipAddress}</strong>
                            </p>
                        </div>
                    )}
    
                    <p>Below is your approximate location based on your IP address:</p>
    
                    {loading ? (
                        <p>Loading your location...</p>
                    ) : (
                        <div
                            ref={mapRef}
                            style={{
                                height: '100%',
                                width: '100%',
                                border: '1px solid #ccc',
                                borderRadius: '10px',
                            }}
                        />
                    )}
                </div>
    
                {/* Right side: Help Places */}
                <div style={{
                    flex: '1',
                    maxWidth: '40%',
                    maxHeight: '650px',
                    overflowY: 'auto',
                    border: '1px solid #ccc',
                    borderRadius: '10px',
                    padding: '20px',
                    backgroundColor: '#f4f8ff'
                }}>
                    <h2>Nearby Help Centers</h2>
                    {places.length === 0 ? (
                        <p>No nearby places found yet.</p>
                    ) : (
                        <ul style={{ listStyle: 'none', padding: 0 }}>
                            {places.map((place, index) => (
                                <li key={index} style={{
                                    marginBottom: '15px',
                                    paddingBottom: '10px',
                                    borderBottom: '1px solid #ccc'
                                }}>
                                    <strong>{place.name}</strong><br />
                                    {place.vicinity}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );    
};

export default Map;