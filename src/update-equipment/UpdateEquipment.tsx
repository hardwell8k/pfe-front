import React, { useState, useEffect } from 'react';
import './UpdateEquipment.css';
import Sidebar from '../sidebar/Sidebar';

export default function UpdateEquipment() {
  const [formData, setFormData] = useState({
    equipmentId: '',
    nom: '',
    RFID: '',
    price: '',
    code_bar: '',
    rentalDate: '',
    returnDate: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const submitData = {
        ...formData,
        rentalDate: formData.rentalDate ? new Date(formData.rentalDate).getTime() : '',
        returnDate: formData.returnDate ? new Date(formData.returnDate).getTime() : '',
      };
      const response = await fetch(`http://localhost:5000/api/equipment/${formData.equipmentId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submitData)
      });
      if (!response.ok) throw new Error('Failed to update equipment');
      await response.json();
      setFormData({ equipmentId: '', nom: '', RFID: '', price: '', code_bar: '', rentalDate: '', returnDate: '' });
      alert('Equipment updated successfully!');
    } catch (error: any) {
      alert('Failed to update equipment: ' + error.message);
    }
  };

  const fetchEquipmentDetails = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:5000/api/equipment/${id}`);
      if (!response.ok) throw new Error('Equipment not found');
      const data = await response.json();
      setFormData(prev => ({ ...prev, ...data }));
    } catch (error: any) {
      alert('Failed to fetch equipment details: ' + error.message);
    }
  };

  return (
    <div className="aeq-dashboard-container">
      <Sidebar />
      <div className="aeq-main-content">
        <h1 className="aeq-page-title">Update Equipment</h1>
        <div className="aeq-form-card">
          <form onSubmit={handleSubmit}>
            <div className="aeq-form-grid">
              <div>
                <div className="aeq-form-group">
                  <label className="aeq-form-label">Equipment ID</label>
                  <input
                    type="text"
                    name="equipmentId"
                    placeholder="Enter equipment ID"
                    className="aeq-form-input"
                    value={formData.equipmentId}
                    onChange={handleInputChange}
                    onBlur={(e) => e.target.value && fetchEquipmentDetails(e.target.value)}
                    required
                  />
                </div>
                <div className="aeq-form-group">
                  <label className="aeq-form-label">Name</label>
                  <input
                    type="text"
                    name="nom"
                    placeholder="Enter equipment name"
                    className="aeq-form-input"
                    value={formData.nom}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="aeq-form-group">
                  <label className="aeq-form-label">RFID</label>
                  <input
                    type="text"
                    name="RFID"
                    placeholder="Enter RFID"
                    className="aeq-form-input"
                    value={formData.RFID}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="aeq-form-group">
                  <label className="aeq-form-label">Rental Date</label>
                  <input
                    type="datetime-local"
                    name="rentalDate"
                    className="aeq-form-input"
                    value={formData.rentalDate}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div>
                <div className="aeq-form-group">
                  <label className="aeq-form-label">Price</label>
                  <input
                    type="text"
                    name="price"
                    placeholder="Enter price"
                    className="aeq-form-input"
                    value={formData.price}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="aeq-form-group">
                  <label className="aeq-form-label">Barcode</label>
                  <input
                    type="text"
                    name="code_bar"
                    placeholder="Enter barcode"
                    className="aeq-form-input"
                    value={formData.code_bar}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="aeq-form-group">
                  <label className="aeq-form-label">Return Date</label>
                  <input
                    type="datetime-local"
                    name="returnDate"
                    className="aeq-form-input"
                    value={formData.returnDate}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
            <div className="aeq-buttons-container">
              <button type="submit" className="aeq-submit-button">
                Update Equipment
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 