import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import './AddStaffInEvent.css';

interface Staff {
  ID: number;
  nom: string;
  prenom: string;
  email: string;
  role: string;
}

interface Event {
  ID: number;
  nom: string;
}

interface FormData {
  fullName: string;
  email: string;
  agency: string;
  role: string;
  startDate: string;
  endDate: string;
  salary: string;
  count?: string;
}

interface ApiResponse {
  success: boolean;
  data?: any;
  message?: string;
}

function AddStaffInEvent() {
  const navigate = useNavigate();
  const location = useLocation();
  const [staff, setStaff] = useState<Staff[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [isMultiple, setIsMultiple] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState<number[]>([]);
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    agency: '',
    role: '',
    startDate: '',
    endDate: '',
    salary: '',
    count: ''
  });

  useEffect(() => {
    getStaff();
    getEvents();
    
    // Check if we have data from navigation state
    console.log('Location state:', location.state);
    
    if (location.state?.staffData) {
      console.log('Setting form data from navigation state:', location.state.staffData);
      const { fullName, email, agency, role, employees } = location.state.staffData;
      setFormData(prev => ({
        ...prev,
        fullName,
        email,
        agency,
        role
      }));
      if (employees) {
        setIsMultiple(true);
        setFormData(prev => ({
          ...prev,
          count: employees.toString()
        }));
      }
    }
  }, [location.state]);

  const getStaff = async () => {
    try {
      const response = await axios.get<{ success: boolean; data: Staff[] }>('${URLS.ServerIpAddress}/api/staff');
      if (response.data.success) {
        setStaff(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching staff:', error);
    }
  };

  const getEvents = async () => {
    try {
      const response = await axios.get<{ success: boolean; data: Event[] }>('${URLS.ServerIpAddress}/api/events');
      if (response.data.success) {
        setEvents(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isMultiple) {
        // Handle multiple staff submission
        const response = await axios.post<ApiResponse>('${URLS.ServerIpAddress}/api/staff-in-event/multiple', {
          staffIds: selectedStaff,
          role: formData.role,
          startDate: formData.startDate,
          endDate: formData.endDate,
          salary: formData.salary
        });
        if (response.data.success) {
          navigate('/event-staff');
        }
      } else {
        // Handle single staff submission
        const response = await axios.post<ApiResponse>('${URLS.ServerIpAddress}/api/staff-in-event', {
          fullName: formData.fullName,
          email: formData.email,
          agency: formData.agency,
          role: formData.role,
          startDate: formData.startDate,
          endDate: formData.endDate,
          salary: formData.salary
        });
        if (response.data.success) {
          navigate('/event-staff');
        }
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleStaffSelect = (staffId: number) => {
    setSelectedStaff(prev => {
      if (prev.includes(staffId)) {
        return prev.filter(id => id !== staffId);
      } else {
        return [...prev, staffId];
      }
    });
  };

  return (
    <div className="asie-dashboard-container">
      <div className="asie-main-content">
        <h1 className="asie-page-title">Add Staff to Event</h1>
        <div className="asie-form-card">
          <form onSubmit={handleSubmit}>
            <div className="asie-form-grid">
              {!isMultiple && (
                <>
                  <div className="asie-form-group">
                    <label className="asie-form-label">Full Name</label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="asie-form-input"
                      required
                    />
                  </div>
                  <div className="asie-form-group">
                    <label className="asie-form-label">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="asie-form-input"
                      required
                    />
                  </div>
                  <div className="asie-form-group">
                    <label className="asie-form-label">Agency</label>
                    <input
                      type="text"
                      name="agency"
                      value={formData.agency}
                      onChange={handleInputChange}
                      className="asie-form-input"
                      required
                    />
                  </div>
                </>
              )}
              <div className="asie-form-group">
                <label className="asie-form-label">Role</label>
                <input
                  type="text"
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  className="asie-form-input"
                  required
                />
              </div>
              <div className="asie-form-group">
                <label className="asie-form-label">Start Date</label>
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleInputChange}
                  className="asie-form-input"
                  required
                />
              </div>
              <div className="asie-form-group">
                <label className="asie-form-label">End Date</label>
                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleInputChange}
                  className="asie-form-input"
                  required
                />
              </div>
              <div className="asie-form-group">
                <label className="asie-form-label">Salary</label>
                <input
                  type="number"
                  name="salary"
                  value={formData.salary}
                  onChange={handleInputChange}
                  className="asie-form-input"
                  required
                />
              </div>
              {isMultiple && (
                <div className="asie-form-group">
                  <label className="asie-form-label">Count</label>
                  <input
                    type="number"
                    name="count"
                    value={formData.count}
                    onChange={handleInputChange}
                    className="asie-form-input"
                    required
                    min="1"
                  />
                </div>
              )}
            </div>

            

            <div className="asie-form-actions">
            <div className="asie-multiple-checkbox">
                <input
                  type="checkbox"
                  id="multiple"
                  checked={isMultiple}
                  onChange={(e) => setIsMultiple(e.target.checked)}
                  className="asie-checkbox-input"
                />
                <label htmlFor="multiple" className="asie-checkbox-label"></label>
                <span>Add Multiple Staff</span>
              </div>
              <div className="asie-button-group">
                <button type="submit" className="asie-submit-button">
                  Add Staff
                </button>
                <button 
                  type="button" 
                  className="asie-back-button"
                  onClick={() => navigate('/event-staff')}
                >
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

export default AddStaffInEvent; 