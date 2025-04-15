import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddAccomodation.css';
import Sidebar from '../sidebar/Sidebar';

export default function AddAccomodation() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    number: '',
    type: '',
    dateDebut: '',
    dateFin: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://localhost:5000/api/accomodations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Failed to add accomodation');
      }

      const result = await response.json();
      console.log('Accomodation added successfully:', result);
      alert('Accomodation added successfully!');
      setFormData({
        name: '',
        address: '',
        number: '',
        type: '',
        dateDebut: '',
        dateFin: ''
      });
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to add accomodation');
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="dashboard-container">
      <Sidebar/>
      <div className="main-content">
        <h1 className="page-title">Add Accomodation</h1>
        
        <div className="form-card">
          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              {/* Left Column */}
              <div>
                <div className="form-group">
                  <label className="form-label">Accomodation Name</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter accomodation name"
                    className="form-input"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Address</label>
                  <input
                    type="text"
                    name="address"
                    placeholder="Enter address"
                    className="form-input"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Number</label>
                  <input
                    type="text"
                    name="number"
                    placeholder="Enter number"
                    className="form-input"
                    value={formData.number}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              {/* Right Column */}
              <div>
                <div className="form-group">
                  <label className="form-label">Type</label>
                  <input
                    type="text"
                    name="type"
                    placeholder="Enter type"
                    className="form-input"
                    value={formData.type}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Date Debut</label>
                  <input
                    type="date"
                    name="dateDebut"
                    className="form-input"
                    value={formData.dateDebut}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Date Fin</label>
                  <input
                    type="date"
                    name="dateFin"
                    className="form-input"
                    value={formData.dateFin}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Buttons Container */}
            <div className="buttons-container">
              <button type="submit" className="submit-button">
                Add Accomodation
              </button>
              <div className="secondary-buttons">
                <button type="button" className="secondary-button" onClick={handleGoBack}>
                  Go Back
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 