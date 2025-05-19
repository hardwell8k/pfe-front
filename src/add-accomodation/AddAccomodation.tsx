import React, { useState } from 'react';
import Sidebar from '../sidebar/Sidebar';
import './AddAccomodation.css';
import { URLS } from '../URLS';

// Add date formatting utility functions
const formatDate = (dateString: string) => {
  if (!dateString) return '';
  const [year, month, day] = dateString.split('-');
  return `${day}/${month}/${year}`;
};

const parseDate = (dateString: string) => {
  if (!dateString) return '';
  const [day, month, year] = dateString.split('/');
  return `${year}-${month}-${day}`;
};

export default function AddAccomodation() {
  const [formData, setFormData] = useState({
    nom: '',
    address: '',
    type: '',
    dateDebut: '',
    dateFin: '',
    nombreInvites: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const submitData = {
        ...formData,
        dateDebut: formData.dateDebut ? new Date(formData.dateDebut).toISOString() : '',
        dateFin: formData.dateFin ? new Date(formData.dateFin).toISOString() : '',
      };
      const response = await fetch(`${URLS.ServerIpAddress}/api/accommodation`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submitData)
      });
      if (!response.ok) throw new Error('Failed to add accommodation');
      await response.json();
      setFormData({ nom: '', address: '', type: '', dateDebut: '', dateFin: '', nombreInvites: '' });
      alert('Accommodation added successfully!');
    } catch (error: any) {
      alert('Failed to add accommodation: ' + error.message);
    }
  };

  return (
    <div className="aac-dashboard-container">
      <Sidebar />
      <div className="aac-main-content">
        <h1 className="aac-page-title">Add New Accommodation</h1>
        <div className="aac-form-card">
          <form onSubmit={handleSubmit}>
            <div className="aac-form-grid">
              <div>
                <div className="aac-form-group">
                  <label className="aac-form-label">Name</label>
                  <input
                    type="text"
                    name="nom"
                    placeholder="Enter accommodation name"
                    className="aac-form-input"
                    value={formData.nom}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="aac-form-group">
                  <label className="aac-form-label">Address</label>
                  <input
                    type="text"
                    name="address"
                    placeholder="Enter accommodation address"
                    className="aac-form-input"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <div>
                <div className="aac-form-group">
                  <label className="aac-form-label">Type</label>
                  <input
                    type="text"
                    name="type"
                    placeholder="Enter type (hotel, apartment, etc.)"
                    className="aac-form-input"
                    value={formData.type}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="aac-form-group">
                  <label className="aac-form-label">Number of Guests</label>
                  <input
                    type="number"
                    name="nombreInvites"
                    placeholder="Enter number of guests"
                    className="aac-form-input"
                    value={formData.nombreInvites}
                    onChange={handleInputChange}
                    required
                    min="1"
                  />
                </div>
              </div>
              <div>
                <div className="aac-form-group">
                  <label className="aac-form-label">Start Date</label>
                  <input
                    type="date"
                    name="dateDebut"
                    className="aac-form-input"
                    value={formData.dateDebut}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <div>
                <div className="aac-form-group">
                  <label className="aac-form-label">End Date</label>
                  <input
                    type="date"
                    name="dateFin"
                    className="aac-form-input"
                    value={formData.dateFin}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
            </div>
            <div className="aac-buttons-container">
              <button type="submit" className="aac-submit-button">
                Add Accommodation
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}