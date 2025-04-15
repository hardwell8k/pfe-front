import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddWorkshop.css';
import Sidebar from '../sidebar/Sidebar';

export default function AddWorkshop() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    fee: '',
    maxUsers: '',
    instructor: '',
    address: '',
    startTime: '',
    finishTime: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://localhost:5000/api/workshops', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Failed to create workshop');
      }

      const result = await response.json();
      console.log('Workshop created successfully:', result);
      alert('Workshop created successfully!');
      setFormData({
        name: '',
        type: '',
        fee: '',
        maxUsers: '',
        instructor: '',
        address: '',
        startTime: '',
        finishTime: ''
      });
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to create workshop');
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleCheckWorkshops = () => {
    navigate('/workshops');
  };

  return (
    <div className="dashboard-container">
      <Sidebar/>
      <div className="main-content">
        <h1 className="page-title">Add Workshop</h1>
        
        <div className="form-card">
          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              {/* Left Column */}
              <div>
                <div className="form-group">
                  <label className="form-label">Workshop Name</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter workshop name"
                    className="form-input"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Type</label>
                  <input
                    type="text"
                    name="type"
                    placeholder="Enter workshop type"
                    className="form-input"
                    value={formData.type}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Fee</label>
                  <input
                    type="number"
                    name="fee"
                    placeholder="Enter workshop fee"
                    className="form-input"
                    value={formData.fee}
                    onChange={handleInputChange}
                    min="0"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Max Users</label>
                  <input
                    type="number"
                    name="maxUsers"
                    placeholder="Enter maximum users"
                    className="form-input"
                    value={formData.maxUsers}
                    onChange={handleInputChange}
                    min="1"
                    required
                  />
                </div>
              </div>

              {/* Right Column */}
              <div>
                <div className="form-group">
                  <label className="form-label">Instructor</label>
                  <input
                    type="text"
                    name="instructor"
                    placeholder="Enter instructor name"
                    className="form-input"
                    value={formData.instructor}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Address</label>
                  <input
                    type="text"
                    name="address"
                    placeholder="Enter workshop address"
                    className="form-input"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Start Time</label>
                  <input
                    type="datetime-local"
                    name="startTime"
                    className="form-input"
                    value={formData.startTime}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Finish Time</label>
                  <input
                    type="datetime-local"
                    name="finishTime"
                    className="form-input"
                    value={formData.finishTime}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Buttons Container */}
            <div className="buttons-container">
              <button type="submit" className="submit-button">
                Create Workshop
              </button>
              <div className="secondary-buttons">
                <button type="button" className="secondary-button" onClick={handleGoBack}>
                  Go Back
                </button>
                <button type="button" className="secondary-button" onClick={handleCheckWorkshops}>
                  Check Workshops
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 