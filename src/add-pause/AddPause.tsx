import React, { useEffect, useRef, useState } from 'react';
import Sidebar from '../sidebar/Sidebar';
import './AddPause.css';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLocation } from 'react-router-dom';
import { URLS } from '../URLS';

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

export default function AddPause() {
  const location = useLocation();
  const evenement_id = useRef<number | null>(null);

  useEffect(() => {
    if (location.state && location.state.evenement_id) {
      evenement_id.current = location.state.evenement_id;
    }
  }, [location.state]);

  const [formData, setFormData] = useState({
    name: '',
    dateDebut: '',
    dateFin: '',
    prixPersonne: '',
    details: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const submitData = {
        ...formData,
        start_time: formData.dateDebut ? new Date(formData.dateDebut).toISOString() : '',
        end_time: formData.dateFin ? new Date(formData.dateFin).toISOString() : '',
        price_per_person:Number(formData.prixPersonne),
        evenement_id:evenement_id.current,
      };
      const response = await fetch(`${URLS.ServerIpAddress}/api/addPause`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submitData)
      });
      if (!response.ok) throw new Error('Failed to add break');
      await response.json();
      setFormData({ name: '', dateDebut: '', dateFin: '', prixPersonne: '', details: '' });
      toast.success('Break added successfully!');
    } catch (error: any) {
      toast.error('Failed to add break: ' + error.message);
    }
  };

  return (
    <div className="ap-dashboard-container">
      <Sidebar />
      <div className="ap-main-content">
        <h1 className="ap-page-title">Add New Break</h1>
        <div className="ap-form-card">
          <form onSubmit={handleSubmit}>
            <div className="ap-form-grid">
              <div>
                <div className="ap-form-group">
                  <label className="ap-form-label">Name</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter break name"
                    className="ap-form-input"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="ap-form-group">
                  <label className="ap-form-label">Start Date</label>
                  <input
                    type="date"
                    name="dateDebut"
                    className="ap-form-input"
                    value={formData.dateDebut}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <div>
                <div className="ap-form-group">
                  <label className="ap-form-label">Price Per Person</label>
                  <input
                    type="number"
                    name="prixPersonne"
                    placeholder="Enter price per person"
                    className="ap-form-input"
                    value={formData.prixPersonne}
                    onChange={handleInputChange}
                    step="0.01"
                    min="0"
                  />
                </div>
                <div className="ap-form-group">
                  <label className="ap-form-label">End Date</label>
                  <input
                    type="date"
                    name="dateFin"
                    className="ap-form-input"
                    value={formData.dateFin}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
            </div>
            <div className="ap-form-group details-center">
              <label className="ap-form-label">Specific Details</label>
              <textarea
                name="details"
                placeholder="Enter additional details about the break"
                rows={4}
                className="ap-form-input"
                value={formData.details}
                onChange={handleInputChange}
              ></textarea>
            </div>
            <div className="ap-buttons-container">
              <button type="submit" className="ap-submit-button">
                Add Break
              </button>
            </div>
          </form>
        </div>
      </div>

      <ToastContainer 
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
      />
    </div>
  );
}