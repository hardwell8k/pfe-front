import React, { useState } from 'react';
import './AddStaff.css';
import Sidebar from '../sidebar/Sidebar';

export default function AddStaff() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    contact: '',
    email: '',
    department: '',
    team: '',
    role: ''
  });

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://localhost:5000/api/staff', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Failed to add staff member');
      }

      const result = await response.json();
      console.log('Staff member added successfully:', result);
      
      // Clear form
      setFormData({
        firstName: '',
        lastName: '',
        contact: '',
        email: '',
        department: '',
        team: '',
        role: ''
      });

      alert('Staff member added successfully!');
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to add staff member');
    }
  };

  return (
    <div className="dashboard-container">
      <Sidebar/>
      <div className="main-content">
        <h1 className="page-title">Staff Management</h1>
        
        <div className="form-card">
          <h2 className="form-title">Add Staff Member</h2>
          
          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              {/* Left Column */}
              <div>
                <div className="form-group">
                  <label className="form-label">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    placeholder="Enter first name"
                    className="form-input"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Enter last name"
                    className="form-input"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Contact</label>
                  <input
                    type="tel"
                    name="contact"
                    placeholder="Enter phone number"
                    className="form-input"
                    value={formData.contact}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter email address"
                    className="form-input"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              {/* Right Column */}
              <div>
                <div className="form-group">
                  <label className="form-label">Department</label>
                  <div className="select-wrapper">
                    <select
                      name="department"
                      className="form-select"
                      value={formData.department}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="" disabled>Select department</option>
                      <option value="technical">Technical</option>
                      <option value="operations">Operations</option>
                      <option value="management">Management</option>
                      <option value="logistics">Logistics</option>
                    </select>
                    <div className="select-icon">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Team</label>
                  <div className="select-wrapper">
                    <select
                      name="team"
                      className="form-select"
                      value={formData.team}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="" disabled>Select team</option>
                      <option value="audio">Audio Team</option>
                      <option value="video">Video Team</option>
                      <option value="lighting">Lighting Team</option>
                      <option value="staging">Staging Team</option>
                    </select>
                    <div className="select-icon">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Role</label>
                  <div className="select-wrapper">
                    <select
                      name="role"
                      className="form-select"
                      value={formData.role}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="" disabled>Select role</option>
                      <option value="manager">Manager</option>
                      <option value="supervisor">Supervisor</option>
                      <option value="technician">Technician</option>
                      <option value="operator">Operator</option>
                    </select>
                    <div className="select-icon">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="button-container">
              <button
                type="submit"
                className="submit-button"
              >
                Add Staff Member
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 