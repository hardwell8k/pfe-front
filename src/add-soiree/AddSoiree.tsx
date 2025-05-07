import React, { useEffect, useRef, useState } from 'react';
import Sidebar from '../sidebar/Sidebar';
import './AddSoiree.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLocation } from 'react-router-dom';

export default function AddSoiree() {
  const location = useLocation();
  const evenement_id = useRef<number | null>(null);

  const [formData, setFormData] = useState({
    nom: '',
    address: '',
    prix: 0,
    code_bar: '',
    startDate: '',
    endDate: '',
  });
  useEffect(() => {
    if (location.state && location.state.evenement_id) {
      evenement_id.current = location.state.evenement_id;
    }
  }, [location.state]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const submitData = {
        ...formData,
        date: formData.startDate ? new Date(formData.startDate).toISOString() : '',
        endDate: formData.endDate ? new Date(formData.endDate).toISOString() : '',
        evenement_id:evenement_id.current,
        prix:Number(formData.prix),
      };
      const response = await fetch('http://localhost:5000/api/addSoiree', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submitData),
        credentials:"include",
      });

      if(!response.ok){
        throw new Error('Failed to add soiree');
      }
      await response.json();
      setFormData({ nom: '', address: '', prix: 0, code_bar: '', startDate: '', endDate: '' });
      toast.success('Soiree added successfully!');
    } catch (error: any) {
      toast.error('Failed to add soiree: ' + error.message);
    }
  };

  return (
    <div className="as-dashboard-container">
      <Sidebar />
      <div className="as-main-content">
        <h1 className="as-page-title">Add New Soiree</h1>
        <div className="as-form-card">
          <form onSubmit={handleSubmit}>
            <div className="as-form-grid">
              <div>
                <div className="as-form-group">
                  <label className="as-form-label">Nom de soiree</label>
                  <input
                    type="text"
                    name="nom"
                    placeholder="Enter soiree name"
                    className="as-form-input"
                    value={formData.nom}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="as-form-group">
                  <label className="as-form-label">Address</label>
                  <input
                    type="text"
                    name="address"
                    placeholder="Enter address"
                    className="as-form-input"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <div>
                <div className="as-form-group">
                  <label className="as-form-label">Prix</label>
                  <input
                    type="text"
                    name="prix"
                    placeholder="Enter price"
                    className="as-form-input"
                    value={formData.prix}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="as-form-group">
                  <label className="as-form-label">Nombre max d'invites</label>
                  <input
                    type="text"
                    name="code_bar"
                    placeholder="Enter max guests"
                    className="as-form-input"
                    value={formData.code_bar}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <div>
                <div className="as-form-group">
                  <label className="as-form-label">Date debut</label>
                  <input
                    type="date"
                    name="startDate"
                    className="as-form-input"
                    value={formData.startDate}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <div>
                <div className="as-form-group">
                  <label className="as-form-label">Date fin</label>
                  <input
                    type="date"
                    name="endDate"
                    className="as-form-input"
                    value={formData.endDate}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
            </div>
            <div className="as-buttons-container">
              <button type="submit" className="as-submit-button">
                Add Soiree
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