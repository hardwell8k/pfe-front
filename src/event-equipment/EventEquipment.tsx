import React, { useState, useEffect } from 'react';
import { Search, Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import Sidebar from '../sidebar/Sidebar';
import './EventEquipment.css';
import { FETCH_STATUS } from '../fetchStatus';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { URLS } from '../URLS';

interface EquipmentElement {
  ID: number;
  nom: string;
  category_nom: string;
  type_nom: string;
  quantity: number;
  details: string;
  disponibility: string;
}

interface SelectedItems {
  [key: number]: boolean;
}

function EventEquipment() {
  const [status, setStatus] = useState<string>(FETCH_STATUS.IDLE);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [equipmentList, setEquipmentList] = useState<EquipmentElement[]>([]);
  const [selectedItems, setSelectedItems] = useState<SelectedItems>({});
  const [currentPage, setCurrentPage] = useState(1);
  const itemPerPage = 7;
  const navigate = useNavigate();

  const IndexOfLastItem = itemPerPage * currentPage;
  const IndexOfFirstItem = IndexOfLastItem - itemPerPage;

  const filteredEquipment = equipmentList.filter((item) => {
    return (
      item.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category_nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.type_nom.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const totalPages = Math.ceil(filteredEquipment.length / itemPerPage);
  const shownEquipment = filteredEquipment.slice(IndexOfFirstItem, IndexOfLastItem);
  const allSelected = shownEquipment.length > 0 && shownEquipment.every((item) => selectedItems[item.ID]);

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isSelected = e.target.checked;
    const newSelectedItems = { ...selectedItems };

    shownEquipment.forEach((item) => {
      newSelectedItems[item.ID] = isSelected;
    });
    setSelectedItems(newSelectedItems);
  };

  const handleSelectItem = (id: number, isSelected: boolean) => {
    setSelectedItems((prev) => ({
      ...prev,
      [id]: isSelected,
    }));
  };

  useEffect(() => {
    getEquipment();
  }, []);

  const getEquipment = async () => {
    try {
      setStatus(FETCH_STATUS.LOADING);
      const response = await fetch(`http://${URLS.ServerIpAddress}/api/getAllEquipment`, {
        method: "GET",
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });

      const result = await response.json();
      if (!result.success) {
        throw ({ status: response.status, message: result.message });
      }

      setEquipmentList(result.data);
      setStatus(FETCH_STATUS.SUCCESS);
    } catch (error: any) {
      console.error("Error while getting equipment", error.message);
      setStatus(FETCH_STATUS.ERROR);
      toast.error('Error loading equipment');
    }
  };

  const handleAddToEvent = async () => {
    let selectedEquipmentIds: number[] = [];
    Object.keys(selectedItems).forEach((key) => {
      if (selectedItems[Number(key)]) {
        selectedEquipmentIds.push(Number(key));
      }
    });
    if (selectedEquipmentIds.length > 0) {
      try {
        // Here you would make an API call to add the selected equipment to the event
        toast.success("Equipment added to event successfully");
      } catch (error: any) {
        toast.error('Error adding equipment to event');
      }
    } else {
      toast.warning("No equipment selected");
    }
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

  return (
    <div className='event-equipment'>
      <Sidebar />
      <div className='event-equipment-content'>
        <header className='event-equipment-header'>
          <div className='title-section'>
            <h1 className='event-equipment-title'>Add Equipment to Event</h1>
          </div>
          <div className='event-equipment-actions'>
            <div className='search-container'>
              <Search className='search-icon' size={18} />
              <input
                type="text"
                placeholder='Search equipment...'
                className='search-input'
                value={searchTerm}
                onChange={(e) => { setSearchTerm(e.target.value) }}
              />
            </div>
            <div className='button-group'>
              <button 
                className='add-to-event-button'
                onClick={handleAddToEvent}
              >
                <Plus size={18} />
                <span>Add to Event</span>
              </button>
              <button 
                className='add-new-equipment-button'
                onClick={() => navigate('/in-add-equipment')}
              >
                <Plus size={24} />
              </button>
            </div>
          </div>
        </header>

        <div className='table-container'>
          <table className='equipment-table'>
            <thead>
              <tr>
                <th className='event-equipment-checkbox-header'>
                  <div className='event-equipment-checkbox-container'>
                    <input
                      type="checkbox"
                      checked={allSelected}
                      onChange={handleSelectAll}
                      id="select-all"
                      className='event-equipment-checkbox-input'
                    />
                    <label htmlFor="select-all" className='event-equipment-checkbox-label'></label>
                  </div>
                </th>
                <th>Name</th>
                <th>Category</th>
                <th>Type</th>
                <th>Quantity</th>
                <th>Details</th>
                <th>Availability</th>
              </tr>
            </thead>
            <tbody>
              {status === FETCH_STATUS.LOADING ? (
                <tr>
                  <td colSpan={7} className="loading-row">
                    <div className="loading-spinner"></div>
                    <span>Loading equipment...</span>
                  </td>
                </tr>
              ) : filteredEquipment.length > 0 ? (
                shownEquipment.map((item) => (
                  <tr key={item.ID} className="equipment-row">
                    <td className="checkbox-cell">
                      <input
                        type="checkbox"
                        checked={selectedItems[item.ID] || false}
                        onChange={(e) => handleSelectItem(item.ID, e.target.checked)}
                      />
                    </td>
                    <td>{item.nom}</td>
                    <td>{item.category_nom}</td>
                    <td>{item.type_nom}</td>
                    <td>{item.quantity}</td>
                    <td>{item.details || '-'}</td>
                    <td>
                      <span className={`status-badge ${item.disponibility?.toLowerCase()}`}>
                        {item.disponibility}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="empty-row">
                    <div className="empty-state">
                      <div className="empty-icon">🔧</div>
                      <h3>No equipment found</h3>
                      <p>Try adjusting your search</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <footer className='event-equipment-footer'>
          <div className='pagination-info'>
            Showing {shownEquipment.length} of {filteredEquipment.length} equipment
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

export default EventEquipment; 