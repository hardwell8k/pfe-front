import React, { useState } from 'react';
import { Calendar } from 'lucide-react';
import './AccountCreation.css'
import Sidebar from '../sidebar/Sidebar';

export default function AccountCreation() {
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    email: '',
    password: '',
    type: '',
    event: '',
    startTime: '',
    finishTime: ''
  });

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://localhost:5000/api/accounts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Failed to create account');
      }

      const result = await response.json();
      console.log('Account created successfully:', result);
      
      // Clear form
      setFormData({
        name: '',
        role: '',
        email: '',
        password: '',
        type: '',
        event: '',
        startTime: '',
        finishTime: ''
      });

      alert('Account created successfully!');
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to create account');
    }
  };

  return (
    <div className="dashboard-container">
      <Sidebar/>
      <div className="main-content">
        <h1 className="page-title">Account Creation</h1>
        
        <div className="form-card">
          <h2 className="form-title">Create New Account</h2>
          
          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              {/* Left Column */}
              <div>
                <div className="form-group">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter name"
                    className="form-input"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
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
                      <option value="admin">Admin</option>
                      <option value="eventmaster">Event Master</option>
                      <option value="user">User</option>
                    </select>
                    <div className="select-icon">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter email"
                    className="form-input"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    name="password"
                    placeholder="Enter password"
                    className="form-input"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              {/* Right Column */}
              <div>
                <div className="form-group">
                  <label className="form-label">Type</label>
                  <div className="select-wrapper">
                    <select
                      name="type"
                      className="form-select"
                      value={formData.type}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="" disabled>Select type</option>
                      <option value="internal">Internal</option>
                      <option value="external">External</option>
                    </select>
                    <div className="select-icon">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Conditional Event dropdown for eventmaster role */}
                {formData.role === 'eventmaster' && (
                  <div className="form-group">
                    <label className="form-label">Event</label>
                    <div className="select-wrapper">
                      <select
                        name="event"
                        className="form-select"
                        value={formData.event}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="" disabled>Select event</option>
                        <option value="event1">Event 1</option>
                        <option value="event2">Event 2</option>
                        <option value="event3">Event 3</option>
                      </select>
                      <div className="select-icon">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      </div>
                    </div>
                  </div>
                )}

                <div className="form-group">
                  <label className="form-label">Start Time</label>
                  <div className="date-picker-wrapper">
                    <input
                      type="date"
                      name="startTime"
                      className="form-input"
                      value={formData.startTime}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Finish Time</label>
                  <div className="date-picker-wrapper">
                    <input
                      type="date"
                      name="finishTime"
                      className="form-input"
                      value={formData.finishTime}
                      onChange={handleInputChange}
                      required
                    />
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
                Create Account
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 