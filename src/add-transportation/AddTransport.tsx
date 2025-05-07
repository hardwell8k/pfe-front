import React, { useState } from 'react';
import Sidebar from '../sidebar/Sidebar';
import './AddTransport.css';

export default function AddTransport() {
  // State for form inputs
  const [formData, setFormData] = useState({
    startAddress: '',      // Starting location
    arrivalAddress: '',    // Destination
    numberOfPlaces: '',    // Number of seats/places
    price: '',             // Price
    dateDebut: '',         // Start date
    agence: '',            // Agency name
    description: '',       // Transportation details
    selfDone: false        // Self-arranged transportation checkbox
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const target = e.target as HTMLInputElement;
      setFormData(prev => ({ ...prev, [name]: target.checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Create a copy of formData for submission
      const submitData = {
        ...formData,
        dateDebut: formData.dateDebut ? new Date(formData.dateDebut).getTime() : '',
      };

      const response = await fetch('http://localhost:5000/api/transportation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submitData)
      });
  
      if (!response.ok) {
        throw new Error('Failed to add transportation');
      }
  
      const result = await response.json();
      console.log('Transportation added successfully:', result);
      
      // Clear form
      setFormData({
        startAddress: '',
        arrivalAddress: '',
        numberOfPlaces: '',
        price: '',
        dateDebut: '',
        agence: '',
        description: '',
        selfDone: false
      });
  
      alert('Transportation added successfully!');
    } catch (error: any) {
      console.error('Error:', error);
      alert('Failed to add transportation: ' + error.message);
    }
  };

  // Functions for the additional buttons
  const handleAddParticipant = () => {
    console.log("Add participant clicked");
    // Add navigation or modal logic here
  };

  const handleCheckParticipants = () => {
    console.log("Check participants clicked");
    // Add navigation or modal logic here
  };

  const handleAddStaff = () => {
    console.log("Add staff clicked");
    // Add navigation or modal logic here
  };

  const handleCheckStaff = () => {
    console.log("Check staff clicked");
    // Add navigation or modal logic here
  };

  const handleAddCar = () => {
    console.log("Add car clicked");
    // Add navigation or modal logic here
  };

  const handleCheckCar = () => {
    console.log("Check car clicked");
    // Add navigation or modal logic here
  };

  const handleCheckTransportations = () => {
    console.log("Check transportations clicked");
    // Add navigation or modal logic here
  };

  return (
    <div className="transport-container">
      <Sidebar />
      <div className="transport-content">
        <h1 className="transport-title">Transportation Management</h1>
        
        <div className="transport-form-container">
          <h2 className="form-title">Add Transportation</h2>
          
          <form onSubmit={handleSubmit}>
            <div className="transport-form-grid">
              {/* Left Column */}
              <div className="transport-form-column">
                <div className="transport-form-group">
                  <label>start address</label>
                  <input
                    type="text"
                    name="startAddress"
                    placeholder="Enter starting location"
                    value={formData.startAddress}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="transport-form-group">
                  <label>number of places</label>
                  <input 
                    type="number"
                    name="numberOfPlaces"
                    placeholder="Enter number of seats"
                    value={formData.numberOfPlaces}
                    onChange={handleInputChange}
                    min="1"
                    required
                  />
                </div>
                
                <div className="transport-form-group">
                  <label>date Debut</label>
                  <input
                    type="datetime-local"
                    name="dateDebut"
                    value={formData.dateDebut}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="transport-form-group description-group">
                  <label>description</label>
                  <textarea
                    name="description"
                    placeholder="Enter transportation details"
                    value={formData.description}
                    onChange={handleInputChange}
                  ></textarea>
                </div>
              </div>
              
              {/* Right Column */}
              <div className="transport-form-column">
                <div className="transport-form-group">
                  <label>finish address</label>
                  <input
                    type="text"
                    name="arrivalAddress"
                    placeholder="Enter destination address"
                    value={formData.arrivalAddress}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="transport-form-group">
                  <label>price</label>
                  <input
                    type="number"
                    name="price"
                    placeholder="Enter price"
                    value={formData.price}
                    onChange={handleInputChange}
                    step="0.01"
                    min="0"
                    required
                  />
                </div>
                
                <div className="transport-form-group">
                  <label>Agence</label>
                  <input
                    type="text"
                    name="agence"
                    placeholder="Enter agency name"
                    value={formData.agence}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="transport-form-group checkbox-group">
                  <label className="self-done-label">self done</label>
                  <input
                    type="checkbox"
                    name="selfDone"
                    checked={formData.selfDone}
                    onChange={handleInputChange}
                    className="self-done-checkbox"
                  />
                </div>
                
                <div className="transport-action-buttons">
                  <div className="button-row">
                    <button type="button" className="action-button blue" onClick={handleAddParticipant}>
                      + Add participant
                    </button>
                    <button type="button" className="action-button gray" onClick={handleCheckParticipants}>
                      check participants
                    </button>
                  </div>
                  
                  <div className="button-row">
                    <button type="button" className="action-button blue" onClick={handleAddStaff}>
                      + Add staff
                    </button>
                    <button type="button" className="action-button gray" onClick={handleCheckStaff}>
                      check staff
                    </button>
                  </div>
                  
                  <div className="button-row">
                    <button type="button" className="action-button blue" onClick={handleAddCar}>
                      + Add car
                    </button>
                    <button type="button" className="action-button gray" onClick={handleCheckCar}>
                      check car
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Bottom Buttons */}
            <div className="transport-bottom-buttons">
              <button type="submit" className="add-transportation-button">
                + Add transportation
              </button>
              <button type="button" className="check-transportation-button" onClick={handleCheckTransportations}>
                check transportations
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}