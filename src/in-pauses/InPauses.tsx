import React, { useState, useEffect } from 'react';
import './InPauses.css';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../sidebar/Sidebar';

// Mock data for pauses
const pauses = [
  {
    id: 1,
    name: "Coffee Break",
    startDate: "15/12/2023",
    endDate: "15/12/2023",
    type: "REFRESHMENT",
    pricePerPerson: "25dt"
  },
  {
    id: 2,
    name: "Lunch Break",
    startDate: "15/12/2023",
    endDate: "15/12/2023",
    type: "MEAL",
    pricePerPerson: "75dt"
  },
  {
    id: 3,
    name: "Networking Break",
    startDate: "16/12/2023",
    endDate: "16/12/2023",
    type: "NETWORKING",
    pricePerPerson: "40dt"
  }
];

const InPauses = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  const filtered = pauses.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.type.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#faf7f2' }}>
      <Sidebar />
      <div className="pauses-container">
        <div className="pauses-header-row">
          <h2 className="pauses-title">Pause</h2>
          <div className="pauses-controls">
            <button className="pauses-create-btn" onClick={() => navigate('/addPause')}>+ Create New Pause</button>
            <input
              className="pauses-search"
              type="text"
              placeholder="Search..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
        </div>
        
        <div className="pauses-table-wrapper">
          <table className="pauses-table">
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Type</th>
                <th>Price/Person</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((pause) => (
                <tr key={pause.id} className="pauses-row">
                  <td>
                    <input type="checkbox" className="pauses-checkbox" />
                  </td>
                  <td>{pause.name}</td>
                  <td>{pause.startDate}</td>
                  <td>{pause.endDate}</td>
                  <td><span className="pauses-type-pill">{pause.type}</span></td>
                  <td>{pause.pricePerPerson}</td>
                  <td onClick={(e) => e.stopPropagation()}>
                    <span className="pauses-recycle-bin" title="Delete">
                      <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M1 7h22M8 7V4a1 1 0 011-1h6a1 1 0 011 1v3" /></svg>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="pauses-button-row">
          <button className="pauses-back-btn" onClick={() => navigate('/eventDetails')}>
            &#8592; Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default InPauses; 