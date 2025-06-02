import React, { useState, useEffect } from 'react';
import Sidebar from '../sidebar/Sidebar';
import './AddTransport.css';
import { URLS } from '../URLS';
import { useNavigate } from 'react-router-dom';

interface TransportFormData {
  startAddress: string;
  arrivalAddress: string;
  numberOfPlaces: string;
  price: string;
  dateDebut: string;
  agence: string;
  description: string;
  durationHours: string;
  durationMinutes: string;
  selfDone: boolean;
}

interface CustomCheckboxProps {
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  id: string;
  label: string;
}

const CustomCheckbox: React.FC<CustomCheckboxProps> = ({ checked, onChange, id, label }) => (
  <div className="transport-form-group">
    <input
      type="checkbox"
      id={id}
      name="selfDone"
      checked={checked}
      onChange={onChange}
    />
    <label htmlFor={id}>{label}</label>
  </div>
);

export default function AddTransport() {
  // Add navigation hook
  const navigate = useNavigate();

  // State for form inputs with initial values from localStorage if available
  const [formData, setFormData] = useState<TransportFormData>(() => {
    // Try to get saved data from localStorage
    const savedData = localStorage.getItem('transportFormData');
    if (savedData) {
      return JSON.parse(savedData);
    }
    // Default initial state
    return {
      startAddress: '',      // Starting location
      arrivalAddress: '',    // Destination
      numberOfPlaces: '',    // Number of seats/places
      price: '',             // Price
      dateDebut: '',         // Start date
      agence: '',            // Agency name
      description: '',       // Transportation details
      durationHours: '',     // Duration hours
      durationMinutes: '',   // Duration minutes
      selfDone: false        // Self-arranged transportation checkbox
    };
  });

  // Save form data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('transportFormData', JSON.stringify(formData));
  }, [formData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const target = e.target as HTMLInputElement;
      setFormData((prev: TransportFormData) => ({ ...prev, [name]: target.checked }));
    } else if (name === 'durationHours' || name === 'durationMinutes') {
      // Ensure only numbers are entered for duration
      let numericValue = value.replace(/[^0-9]/g, '');
      
      // Enforce maximum of 59 for minutes
      if (name === 'durationMinutes' && numericValue !== '') {
        const minutesValue = parseInt(numericValue);
        if (minutesValue > 59) {
          numericValue = '59';
        }
      }
      
      setFormData((prev: TransportFormData) => ({ ...prev, [name]: numericValue }));
    } else {
      setFormData((prev: TransportFormData) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Create a copy of formData for submission
      const submitData = {
        adress_depart: formData.startAddress,
        adress_arrive: formData.arrivalAddress,
        temps_depart: formData.dateDebut ? new Date(formData.dateDebut).getTime() : '',
        prix: Number(formData.price),
        description: formData.description,
        evenement_id: 1, // TODO: Get this from props or context
        car_id: formData.selfDone ? null : undefined // Only send if selfDone is false
      };

      const response = await fetch(`${URLS.ServerIpAddress}/api/addTransport`, {
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
      
      // Clear form but preserve selfDone state
      const selfDoneValue = formData.selfDone;
      setFormData({
        startAddress: '',
        arrivalAddress: '',
        numberOfPlaces: '',
        price: '',
        dateDebut: '',
        agence: '',
        description: '',
        durationHours: '',
        durationMinutes: '',
        selfDone: selfDoneValue // Keep the selfDone value
      });
  
      alert('Transportation added successfully!');
    } catch (error: any) {
      console.error('Error:', error);
      alert('Failed to add transportation: ' + error.message);
    }
  };

  // Functions for the additional buttons with localStorage preservation
  const handleAddParticipant = () => {
    console.log("Add participant clicked");
    // Navigate while preserving state in localStorage
  };

  const handleCheckParticipants = () => {
    console.log("Check participants clicked");
    // Navigate while preserving state in localStorage
  };

  const handleAddStaff = () => {
    console.log("Add staff clicked");
    // Form data is already saved in localStorage before navigation
    navigate('/in-staff');
  };

  const handleCheckStaff = () => {
    console.log("Check staff clicked");
    // Navigate while preserving state in localStorage
  };

  const handleAddCar = () => {
    console.log("Add car clicked");
    // Form data is already saved in localStorage before navigation
    navigate('/in-car');
  };

  const handleCheckCar = () => {
    console.log("Check car clicked");
    // Navigate while preserving state in localStorage
  };

  const handleCheckTransportations = () => {
    console.log("Check transportations clicked");
    // Navigate while preserving state in localStorage
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

                <div className="transport-form-group duration-group">
                  <label>duration</label>
                  <div className="duration-inputs">
                    <div className="duration-hours">
                      <input
                        type="text"
                        name="durationHours"
                        placeholder="0"
                        value={formData.durationHours}
                        onChange={handleInputChange}
                        maxLength={2}
                      />
                      <span className="duration-label">h</span>
                    </div>
                    <div className="duration-minutes">
                      <input
                        type="text"
                        name="durationMinutes"
                        placeholder="00"
                        value={formData.durationMinutes}
                        onChange={handleInputChange}
                        maxLength={2}
                        aria-label="Minutes"
                      />
                      <span className="duration-label">min</span>
                    </div>
                  </div>
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

                <CustomCheckbox
                  checked={formData.selfDone}
                  onChange={handleInputChange}
                  id="selfDoneCheck"
                  label="self done"
                />

                {formData.selfDone && (
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
                )}
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