import React, { useState } from 'react';
import { Calendar } from 'lucide-react';
import Sidebar from '../sidebar/Sidebar';
import './AddEquipment.css';

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

export default function AddEquipment() {
  // State for form inputs
  const [formData, setFormData] = useState({
    nom: '',
    RFID: '',
    category: '',
    type: '',
    rentalDate: '',
    returnDate: '',
    price: '',
    code_bar: '',
    fournisseur: '',
    purchaseDate: '',
    details: '',
    subcategorie: ''
  });

  // State to track which date picker is open
  const [activeDatePicker, setActiveDatePicker] = useState(null);

  const handleInputChange = (e:any) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDateInputClick = (fieldName:any) => {
    setActiveDatePicker(fieldName);
  };

  // Update the date input handler
  const handleDateInputChange = (e: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
    const value = e.target.value;
    handleInputChange({
      target: { name: fieldName, value: value }
    });
    setActiveDatePicker(null); // Close the dropdown when a date is selected
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Create a copy of formData with parsed dates
      const submitData = {
        ...formData,
        rentalDate: formData.rentalDate ? parseDate(formData.rentalDate) : '',
        returnDate: formData.returnDate ? parseDate(formData.returnDate) : '',
        purchaseDate: formData.purchaseDate ? parseDate(formData.purchaseDate) : ''
      };

      const response = await fetch('http://localhost:5000/api/equipment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submitData)
      });
  
      if (!response.ok) {
        throw new Error('Failed to add equipment');
      }
  
      const result = await response.json();
      console.log('Equipment added successfully:', result);
      
      // Clear form
      setFormData({
        nom: '',
        RFID: '',
        category: '',
        type: '',
        rentalDate: '',
        returnDate: '',
        price: '',
        code_bar: '',
        fournisseur: '',
        subcategorie: '',
        purchaseDate: '',
        details: '',
      });
  
      alert('Equipment added successfully!');
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to add equipment');
    }
  };

  return (
    <div className="dashboard-container">
      
      <Sidebar/>
      {/* Main Content */}
      <div className="main-content">
        <h1 className="page-title">equipment</h1>
        
        {/* Equipment Form Card */}
        <div className="form-card">
          <h2 className="form-title">add equipment</h2>
          
          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              {/* Left Column */}
              <div>
                <div className="form-group">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    name="nom"
                    placeholder="Select name"
                    className="form-input"
                    value={formData.nom}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">RFID</label>
                  <input
                    type="text"
                    name="RFID"
                    placeholder="Select RFID"
                    className="form-input"
                    value={formData.RFID}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">category</label>
                  <div className="select-wrapper">
                    <select
                      name="category"
                      className="form-select"
                      value={formData.category}
                      onChange={handleInputChange}
                    >
                      <option value="" disabled>Select category</option>
                      <option value="audio">Audio</option>
                      <option value="video">Video</option>
                      <option value="lighting">Lighting</option>
                      <option value="staging">Staging</option>
                    </select>
                    <div className="select-icon">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </div>
                  </div>
                </div>
                
                <div className="form-group">
                  <label className="form-label">type</label>
                  <div className="select-wrapper">
                    <select
                      name="type"
                      className="form-select"
                      value={formData.type}
                      onChange={handleInputChange}
                    >
                      <option value="" disabled>Select type</option>
                      <option value="rented">Rented</option>
                      <option value="purchased">Purchased</option>
                    </select>
                    <div className="select-icon">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </div>
                  </div>
                </div>
                
                {/* Show rental date and return date only if type is 'rented' or not selected */}
                {(formData.type === 'rented') && (
                  <>
                    <div className="form-group">
                      <label className="form-label">rental date</label>
                      <div className="date-picker-wrapper">
                        <input
                          type="date"
                          name="rentalDate"
                          placeholder="Select date"
                          className="form-input"
                          value={formData.rentalDate}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    
                    <div className="form-group">
                      <label className="form-label">return date</label>
                      <div className="date-picker-wrapper">
                        <input
                          type="date"
                          name="returnDate"
                          placeholder="Select date"
                          className="form-input"
                          value={formData.returnDate}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  </>
                )}
              </div>
              
              {/* Right Column */}
              <div>
                <div className="form-group">
                  <label className="form-label">price</label>
                  <input
                    type="text"
                    name="price"
                    placeholder="Select price"
                    className="form-input"
                    value={formData.price}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">Barcode</label>
                  <input
                    type="text"
                    name="code_bar"
                    placeholder="Select barcode"
                    className="form-input"
                    value={formData.code_bar}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">fournisseur</label>
                  <input
                    type="text"
                    name="fournisseur"
                    placeholder="Select type"
                    className="form-input"
                    value={formData.fournisseur}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">sub_category</label>
                  <div className="select-wrapper">

                  <select
                      name="subcategorie"
                      className="form-select"
                      value={formData.subcategorie}
                      onChange={handleInputChange}
                    >
                      <option value="" disabled>Select category</option>
                      <option value="audio">Audio</option>
                      <option value="video">Video</option>
                      <option value="lighting">Lighting</option>
                      <option value="staging">Staging</option>
                    </select>
                    <div className="select-icon">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </div>
                  </div>
                </div>



                {/* Show purchase date only if type is 'purchased' or not selected */}
                {(formData.type === 'purchased') && (
                  <div className="form-group">
                    <label className="form-label">purchase date</label>
                    <div className="date-picker-wrapper">
                      <input
                        type="date"
                        name="purchaseDate"
                        placeholder="Select date"
                        className="form-input"
                        value={formData.purchaseDate}
                        onChange={handleInputChange}

                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Specific Details - Full Width */}
            <div className="form-group">
              <label className="form-label">Specific details</label>
              <textarea
                name="details"
                placeholder="Details"
                rows={4}
                className="form-textarea"
                value={formData.details}
                onChange={handleInputChange}
              ></textarea>
            </div>
            
            {/* Submit Button */}
            <div className="button-container">
              <button
                type="submit"
                className="submit-button"
              >
                + Add equipment
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}