import React, { useState } from 'react';
import './AddStaffInEvent.css';
import Sidebar from '../sidebar/Sidebar';
import { URLS } from '../URLS';

export default function AddStaffInEvent() {
  const [addMultiple, setAddMultiple] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    contact: '+216',
    email: '',
    department: '',
    role: '',
    agence: '',
    number: ''  // Added number field
  });

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    
    // Special handling for contact field
    if (name === 'contact') {
      // Only allow numbers and keep the +216 prefix
      const numericValue = value.replace(/[^\d+]/g, '');
      if (numericValue.startsWith('+216')) {
        setFormData(prev => ({ ...prev, [name]: numericValue }));
      }
      return;
    }

    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch(`${URLS.ServerIpAddress}/api/agence-staff`, {
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
      
      // Clear form if not adding multiple
      if (!addMultiple) {
        setFormData({
          firstName: '',
          lastName: '',
          contact: '+216',
          email: '',
          department: '',
          role: '',
          agence: '',
          number: ''
        });
      }

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
        <h1 className="page-title">Add Staff</h1>
        
        <div className="form-card">
          <div className="multiple-checkbox">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={addMultiple}
                onChange={(e) => setAddMultiple(e.target.checked)}
              />
              Add Multiple
            </label>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              {/* Left Column */}
              <div>
                {!addMultiple && (
                  <>
                    <div className="form-group">
                      <label className="form-label">First Name</label>
                      <input
                        type="text"
                        name="firstName"
                        placeholder="Enter first name"
                        className="form-input"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required={!addMultiple}
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
                        required={!addMultiple}
                      />
                    </div>
                  </>
                )}

                <div className="form-group">
                  <label className="form-label">Contact</label>
                  <input
                    type="tel"
                    name="contact"
                    placeholder="+216"
                    className="form-input"
                    value={formData.contact}
                    onChange={handleInputChange}
                    pattern="\\+216[0-9]{8}"
                    title="Phone number must start with +216 followed by 8 digits"
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

                {addMultiple && (
                  <div className="form-group">
                    <label className="form-label">Number</label>
                    <input
                      type="text"
                      name="number"
                      placeholder="Enter number"
                      className="form-input"
                      value={formData.number}
                      onChange={handleInputChange}
                      required={addMultiple}
                    />
                  </div>
                )}
              </div>

              {/* Right Column */}
              <div>
                {!addMultiple && (
                  <div className="form-group">
                    <label className="form-label">Department</label>
                    <div className="select-wrapper">
                      <select
                        name="department"
                        className="form-select"
                        value={formData.department}
                        onChange={handleInputChange}
                        required={!addMultiple}
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
                )}

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

                <div className="form-group">
                  <label className="form-label">Agence</label>
                  <div className="select-wrapper">
                    <select
                      name="agence"
                      className="form-select"
                      value={formData.agence}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="" disabled>Select agence</option>
                      <option value="tunis">Tunis</option>
                      <option value="sfax">Sfax</option>
                      <option value="sousse">Sousse</option>
                      <option value="bizerte">Bizerte</option>
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
                Add Staff
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 