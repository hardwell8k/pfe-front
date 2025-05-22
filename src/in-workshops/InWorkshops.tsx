import React, { useState } from 'react';
import './InWorkshops.css';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../sidebar/Sidebar';

const workshops = [
  {
    id: 1,
    name: 'Basics of Mobile UX',
    instructor: 'Irfran Ahsan',
    startTime: '7:00 AM 12 Dec',
    finishTime: '9:00 AM 12 Dec',
    fee: '100dt',
    type: 'UI DESIGN',
    maxUsers: 200,
    currentParticipants: 75
  },
  {
    id: 2,
    name: 'Advanced Web Design',
    instructor: 'Sarah Johnson',
    startTime: '10:00 AM 13 Dec',
    finishTime: '12:00 PM 13 Dec',
    fee: '150dt',
    type: 'WEB DEV',
    maxUsers: 150,
    currentParticipants: 120
  },
  {
    id: 3,
    name: 'Introduction to AI',
    instructor: 'Michael Chen',
    startTime: '2:00 PM 14 Dec',
    finishTime: '4:00 PM 14 Dec',
    fee: '200dt',
    type: 'AI & ML',
    maxUsers: 100,
    currentParticipants: 45
  }
];

const InWorkshops = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  const filtered = workshops.filter(w => 
    w.name.toLowerCase().includes(search.toLowerCase()) ||
    w.instructor.toLowerCase().includes(search.toLowerCase()) ||
    w.type.toLowerCase().includes(search.toLowerCase())
  );

  const handleRowClick = (workshopId: number) => {
    navigate(`/in-workshops-participant/${workshopId}`);
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#faf7f2' }}>
      <Sidebar />
      <div className="workshops-container">
        <div className="workshops-header-row">
          <h2 className="workshops-title">workshops</h2>
          <div className="workshops-controls">
            <button className="workshops-create-btn" onClick={() => navigate('/AddWorkshop')}>+ Create New workshop</button>
            <input
              className="workshops-search"
              type="text"
              placeholder="Search..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
        </div>
        
        <div className="workshops-table-wrapper">
          <table className="workshops-table">
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Instructor</th>
                <th>Start time</th>
                <th>Finish time</th>
                <th>Fee</th>
                <th>Type</th>
                <th>Participants</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((w) => (
                <tr 
                  key={w.id} 
                  className="workshops-row workshops-clickable-row" 
                  onClick={() => handleRowClick(w.id)}
                >
                  <td onClick={(e) => e.stopPropagation()}>
                    <input type="checkbox" className="workshops-checkbox" />
                  </td>
                  <td>{w.name}</td>
                  <td><b>{w.instructor}</b></td>
                  <td>{w.startTime}</td>
                  <td>{w.finishTime}</td>
                  <td>{w.fee}</td>
                  <td><span className="workshops-type-pill">{w.type}</span></td>
                  <td>
                    <div className="workshops-participants">
                      <span>{w.currentParticipants}/{w.maxUsers}</span>
                      <div className="workshops-progress-bar">
                        <div 
                          className="workshops-progress-fill" 
                          style={{ width: `${(w.currentParticipants / w.maxUsers) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td onClick={(e) => e.stopPropagation()}>
                    <span className="workshops-recycle-bin" title="Delete">
                      <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M1 7h22M8 7V4a1 1 0 011-1h6a1 1 0 011 1v3" /></svg>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="workshops-button-row">
          <button className="workshops-back-btn" onClick={() => navigate('/eventDetails')}>&#8592; Go Back</button>
        </div>
      </div>
    </div>
  );
};

export default InWorkshops; 