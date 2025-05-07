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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/staff', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (!response.ok) throw new Error('Failed to add staff member');
      await response.json();
      setFormData({ firstName: '', lastName: '', contact: '', email: '', department: '', team: '', role: '' });
      alert('Staff member added successfully!');
    } catch (error: any) {
      alert('Failed to add staff member: ' + error.message);
    }
  };

  return (
    <div className="asf-dashboard-container">
      <Sidebar />
      <div className="asf-main-content">
        <h1 className="asf-page-title">Add Staff Member</h1>
        <div className="asf-form-card">
          <form onSubmit={handleSubmit}>
            <div className="asf-form-grid">
              <div>
                <div className="asf-form-group">
                  <label className="asf-form-label">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    placeholder="Enter first name"
                    className="asf-form-input"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="asf-form-group">
                  <label className="asf-form-label">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Enter last name"
                    className="asf-form-input"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="asf-form-group">
                  <label className="asf-form-label">Contact</label>
                  <input
                    type="tel"
                    name="contact"
                    placeholder="Enter phone number"
                    className="asf-form-input"
                    value={formData.contact}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="asf-form-group">
                  <label className="asf-form-label">Email</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter email address"
                    className="asf-form-input"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <div>
                <div className="asf-form-group">
                  <label className="asf-form-label">Department</label>
                  <div className="asf-select-wrapper">
                    <select
                      name="department"
                      className="asf-form-select"
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

                  </div>
                </div>
                <div className="asf-form-group">
                  <label className="asf-form-label">Team</label>
                  <div className="asf-select-wrapper">
                    <select
                      name="team"
                      className="asf-form-select"
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

                  </div>
                </div>
                <div className="asf-form-group">
                  <label className="asf-form-label">Role</label>
                  <div className="asf-select-wrapper">
                    <select
                      name="role"
                      className="asf-form-select"
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

                  </div>
                </div>
              </div>
            </div>
            <div className="asf-buttons-container">
              <button type="submit" className="asf-submit-button">
                Add Staff Member
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 