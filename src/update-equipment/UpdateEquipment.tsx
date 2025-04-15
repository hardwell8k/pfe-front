import React, { useState, useEffect } from 'react';
import { Calendar, } from 'lucide-react';
import './UpdateEquipment.css';
import Sidebar from '../sidebar/Sidebar';

export default function UpdateEquipment() {
  // State for form inputs
  const [formData, setFormData] = useState({
    equipmentId: '',
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

  // Function to handle input changes
  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Function to handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch(`http://localhost:5000/api/equipment/${formData.equipmentId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Failed to update equipment');
      }

      const result = await response.json();
      console.log('Equipment updated successfully:', result);
      alert('Equipment updated successfully!');
      
      // Clear form
      setFormData({
        equipmentId: '',
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
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to update equipment');
    }
  };

  // Function to fetch equipment details
  const fetchEquipmentDetails = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:5000/api/equipment/${id}`);
      if (!response.ok) {
        throw new Error('Equipment not found');
      }
      const data = await response.json();
      setFormData(prev => ({ ...prev, ...data }));
    } catch (error) {
      console.error('Error fetching equipment:', error);
      alert('Failed to fetch equipment details');
    }
  };

  return (
    <div className="dashboard-container">
      <Sidebar/>
      <div className="main-content">
        <h1 className="page-title">Update Equipment</h1>
        
        <div className="form-card">
          <h2 className="form-title">Update Equipment Details</h2>
          
          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              {/* Left Column */}
              <div>
                <div className="form-group">
                  <label className="form-label">Equipment ID</label>
                  <input
                    type="text"
                    name="equipmentId"
                    placeholder="Enter equipment ID"
                    className="form-input"
                    value={formData.equipmentId}
                    onChange={handleInputChange}
                    onBlur={(e) => e.target.value && fetchEquipmentDetails(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    name="nom"
                    placeholder="Enter name"
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
                    placeholder="Enter RFID"
                    className="form-input"
                    value={formData.RFID}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Category</label>
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
                </div>
              </div>

              {/* Right Column */}
              <div>
                <div className="form-group">
                  <label className="form-label">Price</label>
                  <input
                    type="text"
                    name="price"
                    placeholder="Enter price"
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
                    placeholder="Enter barcode"
                    className="form-input"
                    value={formData.code_bar}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Fournisseur</label>
                  <input
                    type="text"
                    name="fournisseur"
                    placeholder="Enter supplier"
                    className="form-input"
                    value={formData.fournisseur}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>

            {/* Details Section */}
            <div className="form-group">
              <label className="form-label">Details</label>
              <textarea
                name="details"
                placeholder="Enter details"
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
                Update Equipment
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 