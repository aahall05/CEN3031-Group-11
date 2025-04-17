import React from 'react';
import resourceList from '../assets/resourceList';

const Resources = () => {
    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h1>Available Resources</h1>
            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
                <thead>
                    <tr>
                        <th style={tableHeaderStyle}>Name</th>
                        <th style={tableHeaderStyle}>Address</th>
                        <th style={tableHeaderStyle}>Service</th>
                        <th style={tableHeaderStyle}>Distance (miles)</th>
                    </tr>
                </thead>
                <tbody>
                    {resourceList.map((resource, index) => (
                        <tr key={index}>
                            <td style={tableCellStyle}>{resource.name}</td>
                            <td style={tableCellStyle}>{resource.address}</td>
                            <td style={tableCellStyle}>{resource.service}</td>
                            <td style={tableCellStyle}>{resource.distance}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

const tableHeaderStyle = {
    border: '1px solid #ddd',
    padding: '8px',
    textAlign: 'left',
    backgroundColor: '#ff0000',
    fontWeight: 'bold',
};

const tableCellStyle = {
    border: '1px solid #000000',
    padding: '8px',
    textAlign: 'left',
};

export default Resources;