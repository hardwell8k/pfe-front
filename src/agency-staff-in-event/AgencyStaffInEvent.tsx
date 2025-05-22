import React, { useState, useEffect, useRef } from 'react';
import { Search, Plus, Trash2, ChevronLeft, ChevronRight, MoreHorizontal, Edit, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../sidebar/Sidebar';
import './AgencyStaffInEvent.css';
import { FETCH_STATUS } from '../fetchStatus';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface StaffElement {
  ID: number;
  nom: string | null;
  prenom: string | null;
  email: string;
  role: string;
  phone?: string;
  agency?: string;
  employees?: number;
}

interface SelectedItems {
  [key: number]: boolean;
}

function AgencyStaffInEvent() {
  const navigate = useNavigate();
  const [status, setStatus] = useState<string>(FETCH_STATUS.SUCCESS);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [staffList, setStaffList] = useState<StaffElement[]>([
    {
      ID: 1,
      nom: "Smith",
      prenom: "John",
      email: "john.smith@agency1.com",
      role: "Manager",
      phone: "+216 98765432",
      agency: "Agency A",
      employees: 25
    },
    {
      ID: 2,
      nom: "Johnson",
      prenom: "Sarah",
      email: "sarah.j@agency2.com",
      role: "Coordinator",
      phone: "+216 98765433",
      agency: "Agency B",
      employees: undefined
    },
    {
      ID: 3,
      nom: "Williams",
      prenom: "Michael",
      email: "m.williams@agency3.com",
      role: "Supervisor",
      phone: "+216 98765434",
      agency: "Agency C",
      employees: 15
    },
    {
      ID: 4,
      nom: "Brown",
      prenom: "Emma",
      email: "emma.b@agency1.com",
      role: "Assistant",
      phone: "+216 98765435",
      agency: "Agency A",
      employees: undefined
    },
    {
      ID: 5,
      nom: "Davis",
      prenom: "James",
      email: "j.davis@agency2.com",
      role: "Manager",
      phone: "+216 98765436",
      agency: "Agency B",
      employees: 30
    },
    {
      ID: 6,
      nom: "Miller",
      prenom: "Lisa",
      email: "l.miller@agency3.com",
      role: "Coordinator",
      phone: "+216 98765437",
      agency: "Agency C",
      employees: undefined
    },
    {
      ID: 7,
      nom: "Wilson",
      prenom: "David",
      email: "d.wilson@agency1.com",
      role: "Supervisor",
      phone: "+216 98765438",
      agency: "Agency A",
      employees: 20
    },
    {
      ID: 8,
      nom: null,
      prenom: null,
      email: "agency4@example.com",
      role: "Manager",
      phone: "+216 98765439",
      agency: "Agency D",
      employees: 40
    },
    {
      ID: 9,
      nom: "Taylor",
      prenom: "Sophie",
      email: "s.taylor@agency5.com",
      role: "Coordinator",
      phone: "+216 98765440",
      agency: "Agency E",
      employees: undefined
    },
    {
      ID: 10,
      nom: null,
      prenom: null,
      email: "agency6@example.com",
      role: "Supervisor",
      phone: "+216 98765441",
      agency: "Agency F",
      employees: 35
    },
    {
      ID: 11,
      nom: "Anderson",
      prenom: "Robert",
      email: "r.anderson@agency7.com",
      role: "Assistant",
      phone: "+216 98765442",
      agency: "Agency G",
      employees: undefined
    },
    {
      ID: 12,
      nom: null,
      prenom: null,
      email: "agency8@example.com",
      role: "Manager",
      phone: "+216 98765443",
      agency: "Agency H",
      employees: 45
    },
    {
      ID: 13,
      nom: "Thomas",
      prenom: "Emily",
      email: "e.thomas@agency9.com",
      role: "Coordinator",
      phone: "+216 98765444",
      agency: "Agency I",
      employees: undefined
    },
    {
      ID: 14,
      nom: null,
      prenom: null,
      email: "agency10@example.com",
      role: "Supervisor",
      phone: "+216 98765445",
      agency: "Agency J",
      employees: 50
    },
    {
      ID: 15,
      nom: "Jackson",
      prenom: "Daniel",
      email: "d.jackson@agency11.com",
      role: "Assistant",
      phone: "+216 98765446",
      agency: "Agency K",
      employees: undefined
    },
    {
      ID: 16,
      nom: null,
      prenom: null,
      email: "agency12@example.com",
      role: "Manager",
      phone: "+216 98765447",
      agency: "Agency L",
      employees: 55
    },
    {
      ID: 17,
      nom: "White",
      prenom: "Olivia",
      email: "o.white@agency13.com",
      role: "Coordinator",
      phone: "+216 98765448",
      agency: "Agency M",
      employees: undefined
    }
  ]);
  const [selectedItems, setSelectedItems] = useState<SelectedItems>({});
  const [currentPage, setCurrentPage] = useState(1);
  const itemPerPage = 10;
  const [dropdownOpen, setDropdownOpen] = useState<number | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const IndexOfLastItem = itemPerPage * currentPage;
  const IndexOfFirstItem = IndexOfLastItem - itemPerPage;

  const filteredStaff = staffList.filter((item) => {
    const searchTermLower = searchTerm.toLowerCase().trim();
    if (!searchTermLower) return true;

    return (
      (item.nom?.toLowerCase().includes(searchTermLower) ?? false) ||
      (item.prenom?.toLowerCase().includes(searchTermLower) ?? false) ||
      item.email.toLowerCase().includes(searchTermLower) ||
      item.role.toLowerCase().includes(searchTermLower) ||
      (item.agency?.toLowerCase().includes(searchTermLower) ?? false) ||
      (item.phone?.toLowerCase().includes(searchTermLower) ?? false) ||
      (item.employees?.toString().includes(searchTermLower) ?? false)
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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleDropdown = (index: number) => {
    setDropdownOpen(dropdownOpen === index ? null : index);
  };

  const handleEdit = (id: number) => {
    const staffToEdit = staffList.find(staff => staff.ID === id);
    if (staffToEdit) {
      navigate('/EditStaffInEvent', {
        state: {
          staffData: {
            id: staffToEdit.ID,
            fullName: `${staffToEdit.prenom} ${staffToEdit.nom}`,
            email: staffToEdit.email,
            agency: staffToEdit.agency,
            role: staffToEdit.role,
            employees: staffToEdit.employees
          }
        }
      });
    }
  };

  const handleDelete = (index: number) => {
    handleDeleteSingle(index);
    setDropdownOpen(null);
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
        toast.success("Agency staff added to event successfully");
      } catch (error: any) {
        toast.error('Error adding agency staff to event');
      }
    } else {
      toast.warning("No agency staff selected");
    }
  };

  const handleDeleteSelected = async () => {
    let selectedStaffIds: number[] = [];
    Object.keys(selectedItems).forEach((key) => {
      if (selectedItems[parseInt(key)]) {
        selectedStaffIds.push(parseInt(key));
      }
    });
    if (selectedStaffIds.length > 0) {
      try {
        // Add delete functionality here
        toast.success("Selected agency staff removed from event");
      } catch (error: any) {
        toast.error('Error removing agency staff from event');
      }
    } else {
      toast.warning("No agency staff selected");
    }
  };

  const handleDeleteSingle = async (id: number) => {
    try {
      // Add delete functionality here
      toast.success("Agency staff removed from event");
    } catch (error: any) {
      toast.error('Error removing agency staff from event');
    }
  };

  const handleGoBack = () => {
    navigate('/event-staff');
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
    <div className='agency-staff-in-event'>
      <Sidebar />
      <div className='agency-staff-in-event-content'>
        <header className='agency-staff-in-event-header'>
          <div className='title-section'>
            <h1 className='agency-staff-in-event-title'>Agency Staff in Event</h1>
          </div>
          <div className='agency-staff-in-event-actions'>
            <div className='search-container'>
              <Search className='search-icon' size={18} />
              <input
                type="text"
                placeholder='Search agency staff...'
                className='search-input'
                value={searchTerm}
                onChange={(e) => { setSearchTerm(e.target.value) }}
              />
            </div>

            <button 
              className='add-staff-button'
              onClick={() => navigate('/AddStaffInEvent')}
              title="Add Agency Staff"
            >
              <Plus size={20} />
            </button>
          </div>
        </header>

        <div className='table-container'>
          <table className='staff-table'>
            <thead>
              <tr>
                <th className='checkbox-header'>
                  <div className='checkbox-container'>
                    <input
                      type="checkbox"
                      checked={allSelected}
                      onChange={handleSelectAll}
                      id="select-all"
                      className='checkbox-input'
                    />
                    <label htmlFor="select-all" className='checkbox-label'></label>
                  </div>
                </th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Agency</th>
                <th>Role</th>
                <th>Employees</th>
                <th className='actions-header'>
                  <button className='delete-button' onClick={handleDeleteSelected} title="Remove selected">
                    <Trash2 size={18} />
                  </button>
                </th>
              </tr>
            </thead>
            <tbody>
              {status === FETCH_STATUS.LOADING ? (
                <tr>
                  <td colSpan={9} className="loading-row">
                    <div className="loading-spinner"></div>
                    <span>Loading agency staff...</span>
                  </td>
                </tr>
              ) : filteredStaff.length > 0 ? (
                shownStaff.map((item, index) => (
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
                        className="checkbox-input"
                      />
                      <label htmlFor={`staff-${item.ID}`} className="checkbox-label"></label>
                    </td>
                    <td>{item.employees ? '-' : item.prenom}</td>
                    <td>{item.employees ? '-' : item.nom}</td>
                    <td>{item.email}</td>
                    <td>{item.phone}</td>
                    <td>{item.agency}</td>
                    <td>{item.role}</td>
                    <td>{item.employees || '-'}</td>
                    <td>
                      <button
                        type="button"
                        className="edit-button"
                        onClick={() => handleEdit(item.ID)}
                        title="Edit staff"
                      >
                        <Edit size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={9} className="empty-row">
                    <div className="empty-state">
                      <div className="empty-icon">👥</div>
                      <h3>No agency staff found</h3>
                      <p>Try adjusting your search</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <footer className='agency-staff-in-event-footer'>
          <div className='pagination-info'>
            Showing {shownStaff.length} of {filteredStaff.length} agency staff
          </div>
          
          <div className='footer-center'>
            <button className='go-back-button' onClick={handleGoBack}>
              <ArrowLeft size={18} />
              Go Back to Event Staff
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

export default AgencyStaffInEvent; 