import React, { useState, useEffect, useRef } from 'react';
import { Search, Plus, ChevronLeft, ChevronRight, ArrowLeft, CheckCircle, Users, ChevronDown, ChevronRight as ChevronRightIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../sidebar/Sidebar';
import './EventStaff.css';
import { FETCH_STATUS } from '../fetchStatus';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

interface StaffElement {
  ID: number;
  nom: string;
  prenom: string;
  email: string;
  role: string;
  disponibility?: string;
  phone?: string;
}

interface SelectedItems {
  [key: number]: boolean;
}

function EventStaff() {
  const navigate = useNavigate();
  const [status, setStatus] = useState<string>(FETCH_STATUS.IDLE);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [staffList, setStaffList] = useState<StaffElement[]>([]);
  const [selectedItems, setSelectedItems] = useState<SelectedItems>({});
  const [currentPage, setCurrentPage] = useState(1);
  const itemPerPage = 7;
  const [dropdownOpen, setDropdownOpen] = useState<number | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [isTeamsExpanded, setIsTeamsExpanded] = useState<boolean>(false);

  const IndexOfLastItem = itemPerPage * currentPage;
  const IndexOfFirstItem = IndexOfLastItem - itemPerPage;

  const filteredStaff = staffList.filter((item) => {
    return (
      item.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.prenom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.role.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const totalPages = Math.ceil(filteredStaff.length / itemPerPage);
  const shownStaff = filteredStaff.slice(IndexOfFirstItem, IndexOfLastItem);
  const allSelected = shownStaff.length > 0 && shownStaff.every((item) => selectedItems[item.ID]);

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isSelected = e.target.checked;
    const tempSelectedItems: SelectedItems = {};

    shownStaff.forEach((item) => {
      tempSelectedItems[item.ID] = isSelected;
    });
    setSelectedItems(tempSelectedItems);
  };

  const handleSelectItem = (id: number, isSelected: boolean) => {
    setSelectedItems((prev) => ({
      ...prev,
      [id]: isSelected,
    }));
  };

  function handleClickOutside(event: MouseEvent) {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setDropdownOpen(null);
    }
  }

  useEffect(() => {
    fetchStaff();
  }, []);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const fetchStaff = async () => {
    try {
      setStatus(FETCH_STATUS.LOADING);
      const response = await fetch("http://localhost:5000/api/getAllStaff", {
        method: "GET",
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });

      const result = await response.json();
      if (!result.success) {
        throw ({ status: response.status, message: result.message });
      }

      const statuses = ['Available', 'Unavailable', 'On-Leave'];
      const enhancedData = result.data.map((staff: StaffElement) => ({
        ...staff,
        disponibility: statuses[Math.floor(Math.random() * 3)],
        phone: `+216 ${Math.floor(Math.random() * 10000000) + 90000000}`
      }));

      setStaffList(enhancedData);
      setStatus(FETCH_STATUS.SUCCESS);
    } catch (error: any) {
      console.error("Error while getting staff", error.message);
      setStatus(FETCH_STATUS.ERROR);
      toast.error('Error loading staff');
    }
  };

  const handleAddToEvent = async () => {
    let selectedStaffIds: number[] = [];
    Object.keys(selectedItems).forEach((key) => {
      if (selectedItems[parseInt(key)]) {
        selectedStaffIds.push(parseInt(key));
      }
    });
    if (selectedStaffIds.length > 0) {
      try {
        // Here you would make an API call to add the selected staff to the event
        toast.success("Staff added to event successfully");
      } catch (error: any) {
        toast.error('Error adding staff to event');
      }
    } else {
      toast.warning("No staff selected");
    }
  };

  const handleDelete = async () => {
    let selectedStaffIds: number[] = [];
    Object.keys(selectedItems).forEach((key) => {
      if (selectedItems[parseInt(key)]) {
        selectedStaffIds.push(parseInt(key));
      }
    });
    if (selectedStaffIds.length > 0) {
      try {
        // Add delete functionality here
        toast.success("Selected staff removed from event");
      } catch (error: any) {
        toast.error('Error removing staff from event');
      }
    } else {
      toast.warning("No staff selected");
    }
  };

  const handleMenuClick = (id: number) => {
    // Add menu functionality here
    console.log('Menu clicked for staff with ID:', id);
  };

  const renderPagination = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => setCurrentPage(i)}
          className={currentPage === i ? 'active' : ''}
        >
          {i}
        </button>
      );
    }
    return pages;
  };

  const handleGoBack = () => {
    navigate('/eventdetails');
  };

  const handleCheckStaff = () => {
    navigate('/add-staff-event-table');
  };

  const handleCheckAgencyStaff = () => {
    navigate('/agency-staff-in-event');
  };

  const toggleTeams = () => {
    setIsTeamsExpanded(!isTeamsExpanded);
  };

  const handleTeamsClick = () => {
    navigate('/in-staff-team');
    setIsTeamsExpanded(false);
  };

  return (
    <div className='event-staff'>
      <Sidebar />
      <div className='event-staff-content'>
        <header className='event-staff-header'>
          <div className='title-section'>
            <div className='management-header'>
              <h1 className='event-staff-title'>Event Staff</h1>
              <div className='toggle-team-container'>
                <button 
                  className='toggle-teams-button'
                  onClick={toggleTeams}
                  aria-expanded={isTeamsExpanded}
                >
                  {isTeamsExpanded ? <ChevronDown size={18} /> : <ChevronRightIcon size={18} />}
                </button>
                {isTeamsExpanded && (
                  <div className='teams-dropdown' onClick={handleTeamsClick}>
                    <span>Teams Management</span>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className='event-staff-actions'>
            <div className='search-container'>
              <Search className='search-icon' size={18} />
              <input
                type="text"
                placeholder='Search staff...'
                className='search-input'
                value={searchTerm}
                onChange={(e) => { setSearchTerm(e.target.value) }}
              />
            </div>

            <button 
              className='add-to-event-button'
              onClick={handleAddToEvent}
            >
              <Plus size={18} />
              <span>Add to Event</span>
            </button>
            <button 
              className='add-staff-button'
              onClick={() => navigate('/AddStaffInEvent')}
              title="Add Staff"
            >
              <Plus size={20} />
            </button>
          </div>
        </header>

        <div className='table-container'>
          <table className='staff-table'>
            <thead>
              <tr>
                <th className='event-staff-checkbox-header'>
                  <div className='event-staff-checkbox-container'>
                    <input
                      type="checkbox"
                      checked={allSelected}
                      onChange={handleSelectAll}
                      id="select-all"
                      className='event-staff-checkbox-input'
                    />
                    <label htmlFor="select-all" className='event-staff-checkbox-label'></label>
                  </div>
                </th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Role</th>
                <th>Availability</th>
              </tr>
            </thead>
            <tbody>
              {status === FETCH_STATUS.LOADING ? (
                <tr>
                  <td colSpan={7} className="loading-row">
                    <div className="loading-spinner"></div>
                    <span>Loading staff...</span>
                  </td>
                </tr>
              ) : filteredStaff.length > 0 ? (
                shownStaff.map((item) => (
                  <tr 
                    key={item.ID} 
                    className={`staff-row ${selectedItems[item.ID] ? 'selected' : ''}`}
                  >
                    <td className="checkbox-cell">
                      <input
                        type="checkbox"
                        id={`staff-${item.ID}`}
                        checked={selectedItems[item.ID] || false}
                        onChange={(e) => handleSelectItem(item.ID, e.target.checked)}
                        className="event-staff-checkbox-input"
                      />
                      <label htmlFor={`staff-${item.ID}`} className="event-staff-checkbox-label"></label>
                    </td>
                    <td>{item.prenom}</td>
                    <td>{item.nom}</td>
                    <td>{item.email}</td>
                    <td>{item.phone}</td>
                    <td>{item.role}</td>
                    <td>
                      <span className={`status-badge ${item.disponibility?.toLowerCase().replace("-", "-")}`}>
                        {item.disponibility === 'On-Leave' ? 'On Leave' : item.disponibility}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="empty-row">
                    <div className="empty-state">
                      <div className="empty-icon">👥</div>
                      <h3>No staff found</h3>
                      <p>Try adjusting your search</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <footer className='event-staff-footer'>
          <div className='pagination-info'>
            Showing {shownStaff.length} of {filteredStaff.length} staff
          </div>
          <div className='footer-actions'>
            <button className='go-back-button' onClick={handleGoBack}>
              <ArrowLeft size={18} />
              Go Back
            </button>
            <button className='check-staff-button' onClick={handleCheckStaff}>
              <CheckCircle size={18} />
              Check Staff
            </button>
            <button className='check-agency-staff-button' onClick={handleCheckAgencyStaff}>
              <Users size={18} />
              Check Agency Staff
            </button>
          </div>
          <div className='pagination-controls'>
            <button 
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft size={18} />
            </button>
            {renderPagination()}
            <button 
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </footer>
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

export default EventStaff; 