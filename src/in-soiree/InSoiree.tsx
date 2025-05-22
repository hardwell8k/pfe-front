import React, { useState } from 'react';
import './InSoiree.css';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../sidebar/Sidebar';

const soirees = [
  {
    id: 1,
    name: 'Networking Mixer',
    address: 'Grand Hotel',
    dateDebut: '15 Dec, 2023',
    price: 50,
    nombreMax: 150,
    currentParticipants: 3
  },
  // You can add more soiree objects here
];

const InSoiree = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  const handleRowClick = (soireeId: number) => {
    navigate(`/insoiree-participant/${soireeId}`);
  };

  const filtered = soirees.filter(s => 
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.address.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#faf7f2' }}>
      <Sidebar />
      <div className="insoiree-container">
        <div className="insoiree-header-row">
          <h2 className="insoiree-title">soirees</h2>
          <div className="insoiree-controls">
            <button className="insoiree-create-btn" onClick={() => navigate('/AddSoiree')}>+ Create New soiree</button>
            <input
              className="insoiree-search"
              type="text"
              placeholder="Search..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
        </div>
        
        <div className="insoiree-table-wrapper">
          <table className="insoiree-table">
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Address</th>
                <th>Date debut</th>
                <th>Price</th>
                <th>Participants</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((s, idx) => (
                <tr key={idx} className="insoiree-row insoiree-clickable-row" onClick={() => handleRowClick(s.id)}>
                  <td onClick={(e) => e.stopPropagation()}>
                    <input type="checkbox" className="insoiree-checkbox" />
                  </td>
                  <td>{s.name}</td>
                  <td>{s.address}</td>
                  <td>{s.dateDebut}</td>
                  <td>{s.price}dt</td>
                  <td>
                    <div className="insoiree-participants">
                      <span>{s.currentParticipants}/{s.nombreMax}</span>
                      <div className="insoiree-progress-bar">
                        <div 
                          className="insoiree-progress-fill" 
                          style={{ width: `${(s.currentParticipants / s.nombreMax) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td onClick={(e) => e.stopPropagation()}>
                    <span className="insoiree-recycle-bin" title="Delete">
                      <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M1 7h22M8 7V4a1 1 0 011-1h6a1 1 0 011 1v3" /></svg>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="insoiree-button-row">
          <button className="insoiree-back-btn" onClick={() => navigate('/eventDetails')}>&#8592; Go Back</button>
        </div>
      </div>
    </div>
  );
};

export default InSoiree; 