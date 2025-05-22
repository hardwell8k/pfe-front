import React, { useState } from 'react';
import Sidebar from '../sidebar/Sidebar';
import './InAccomodationTable.css';
import { useNavigate } from 'react-router-dom';

const mockData = [
  {
    category: 'VIP Accommodation',
    rooms: [
      {
        location: 'Sheraton Tunis Hotel',
        start: '7:00 AM 12 Dec',
        finish: '9:00 AM 13 Dec',
        number: 1,
        type: 'Single',
      },
      {
        location: 'Sheraton Tunis Hotel',
        start: '7:00 AM 12 Dec',
        finish: '9:00 AM 13 Dec',
        number: 1,
        type: 'Suite',
      },
    ],
  },
  {
    category: 'User Accommodation',
    rooms: [
      {
        location: 'Sheraton Tunis Hotel',
        start: '7:00 AM 12 Dec',
        finish: '9:00 AM 13 Dec',
        number: 100,
        type: 'Single',
      },
    ],
  },
  {
    category: 'Instructors Accommodation',
    rooms: [
      {
        location: 'Sheraton Tunis Hotel',
        start: '7:00 AM 12 Dec',
        finish: '9:00 AM 13 Dec',
        number: 50,
        type: 'Suite',
      },
      {
        location: 'Sheraton Tunis Hotel',
        start: '7:00 AM 12 Dec',
        finish: '9:00 AM 13 Dec',
        number: 100,
        type: 'Single',
      },
    ],
  },
];

const InAccomodationTable = () => {
  const [expanded, setExpanded] = useState<{ [key: string]: boolean }>({});
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const handleExpand = (category: string) => {
    setExpanded((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const filteredData = mockData.filter(cat => 
    cat.category.toLowerCase().includes(search.toLowerCase()) ||
    cat.rooms.some(room => 
      room.location.toLowerCase().includes(search.toLowerCase()) ||
      room.type.toLowerCase().includes(search.toLowerCase())
    )
  );

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#faf7f2' }}>
      <Sidebar />
      <div className="accommodation-container">
        <div className="accommodation-header-row">
          <h2 className="accommodation-title">Accommodation</h2>
          <div className="accommodation-controls">
            <button
              className="accommodation-create-btn"
              onClick={() => navigate('/AddAccomodation')}
            >
              + Create New Accommodation
            </button>
            <input
              className="accommodation-search"
              type="text"
              placeholder="Search..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="accommodation-table-wrapper">
          <table className="accommodation-table">
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Location</th>
                <th>Start time</th>
                <th>Finish time</th>
                <th>Number</th>
                <th>Type</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((cat) => (
                <React.Fragment key={cat.category}>
                  <tr className="accommodation-row">
                    <td>
                      <button
                        className="expand-btn"
                        onClick={() => handleExpand(cat.category)}
                        style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                      >
                        {cat.rooms.length > 1 ? (
                          expanded[cat.category] ? (
                            <span style={{ fontSize: 20, color: '#2563eb' }}>&#8594;</span>
                          ) : (
                            <span style={{ fontSize: 20, color: '#2563eb' }}>+</span>
                          )
                        ) : null}
                      </button>
                    </td>
                    <td style={{ fontWeight: 600, cursor: 'pointer', color: '#2256e7' }} onClick={() => navigate(`/in-accomodation-participant/${cat.category.toLowerCase().replace(/ /g, '-')}`)}>{cat.category}</td>
                    <td>{cat.rooms[0].location}</td>
                    <td>{cat.rooms[0].start}</td>
                    <td>{cat.rooms[0].finish}</td>
                    <td>{cat.rooms[0].number}</td>
                    <td>
                      <span className={`accommodation-type-pill ${cat.rooms[0].type.toLowerCase()}`}>
                        {cat.rooms[0].type}
                      </span>
                    </td>
                    <td>
                      <span className="accommodation-more-menu">&#8230;</span>
                    </td>
                  </tr>
                  {expanded[cat.category] &&
                    cat.rooms.slice(1).map((room, i) => (
                      <tr className="accommodation-row sub-row" key={i}>
                        <td></td>
                        <td></td>
                        <td>{room.location}</td>
                        <td>{room.start}</td>
                        <td>{room.finish}</td>
                        <td>{room.number}</td>
                        <td>
                          <span className={`accommodation-type-pill ${room.type.toLowerCase()}`}>
                            {room.type}
                          </span>
                        </td>
                        <td>
                          <span className="accommodation-more-menu">&#8230;</span>
                        </td>
                      </tr>
                    ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
        <div className="accommodation-button-row">
          <button
            className="accommodation-back-btn"
            onClick={() => navigate('/eventDetails')}
          >
            &#8592; Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default InAccomodationTable; 