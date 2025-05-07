import {useEffect, useState } from 'react';
import './TeamPage.css';
import Sidebar from '../sidebar/Sidebar';
import { FETCH_STATUS } from '../fetchStatus';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Search } from 'lucide-react';
import TeamElement from './team-element/TeamElement';
import TeamStaff from './team-staff/TeamStaff';


interface Team {
    ID:number;
    nom:string;
    members:number;
    created_at : string;
    status : string;
}

interface Staff {
    ID: number;
    nom: string;
    prenom: string;
    email: string;
    num_tel: number;
    team_id:number,
    status: string;
}

interface selectedItems{
    [key:string]:boolean,
}

function TeamPage(){

    const [status,setStatus] = useState<string>(FETCH_STATUS.IDLE);
    const [teams,setTeams] = useState<Team[]>([]);
    const [staff,setStaff] = useState<Staff[]>([]);
    const [searchTerm,setSearchTerm] = useState<string>("");
    const [selectedItems,setSelectedItems] = useState<selectedItems>({});

    const getTeams = async () => {
        try {
            setStatus(FETCH_STATUS.LOADING);
            const response = await fetch("http://localhost:5000/api/getAllTeams", {
                method: "GET",
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
            });
    
            const result = await response.json();
            if (!result.success) {
                throw ({ status: response.status, message: result.message });
            }
    
            setTeams(result.data);
            setStatus(FETCH_STATUS.SUCCESS);
        } catch (error: any) {
            toast.error("Error while getting teams");
            setStatus(FETCH_STATUS.ERROR);
        }
    };

    const getStaffForTeams = async () => {
        try {
            setStatus(FETCH_STATUS.LOADING);
            const response = await fetch("http://localhost:5000/api/getAllStaffForTeams", {
                method: "GET",
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
            });
    
            const result = await response.json();
            if (!result.success) {
                throw ({ status: response.status, message: result.message });
            }
    
            setStaff(result.data);
            setStatus(FETCH_STATUS.SUCCESS);
        } catch (error: any) {
            toast.error("Error while getting staff");
            setStatus(FETCH_STATUS.ERROR);
        }
    };

    const filteredTeams = teams.filter((item)=>{
        return(
            (item.nom).toLowerCase().includes(searchTerm.toLowerCase())||
            String(item.created_at).toLowerCase().includes(searchTerm.toLowerCase())||
            //(item.status).toLowerCase().startsWith(searchTerm.toLowerCase())||
            (staff.filter((staff)=>{
                return(
                    item.ID === staff.team_id &&(
                        (staff.nom).toLowerCase().startsWith(searchTerm.toLowerCase())||
                        (staff.prenom).toLowerCase().startsWith(searchTerm.toLowerCase())||
                        (staff.email).toLowerCase().includes(searchTerm.toLowerCase())||
                        (String(staff.num_tel)).toLowerCase().includes(searchTerm.toLowerCase())
                    )
                );
            })).length>0
        );
    })

    const handleSelectItem = (id:string,isSelected:boolean)=>{
        setSelectedItems((prev)=>({
            ...prev,
            [id]:isSelected,    
        }));
    };

    const handleSelectAll = (e:React.ChangeEvent<HTMLInputElement>)=>{
        const isSelected = e.target.checked;
        const newSelecteditems:selectedItems = {};
        filteredTeams.forEach((value,index)=>{
            newSelecteditems[String(value.ID)] = isSelected;
        });

        setSelectedItems(newSelecteditems);
    };

    const isAllSelected = filteredTeams.length>0 && filteredTeams.every((item)=>(selectedItems[item.ID]));

    useEffect(() => {
        getTeams()
    }, []);

    useEffect(() => {
        getStaffForTeams();
    }, []);


    return(
        <div className='team_page'>
            <Sidebar />
            <div className='team_page_container'>
                <div className='team_page_header'>
                    <h1 className='team_page_title'>Teams</h1>
                    <div className='team_page_search'>
                        <input
                        type="text"
                        placeholder="Search"
                        className='team_page_search_input'
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <Search className='team_page_search_icon' size={20} />
                    </div>
                </div>

                <div className='team_page_table_container'>
                    <table className='team_page_table'>
                        <thead>
                        <tr>
                            <th className='team_page_checkbox_header'>
                                <input 
                                    type="checkbox" 
                                    checked={isAllSelected}
                                    onChange={handleSelectAll}
                                />
                            </th>
                            <th className='team_page_name_header'>
                                Name <span className='team_page_sort_icon'>↓</span>
                            </th>
                            <th className='team_page_members_header'>
                                Members <span className='team_page_sort_icon'>↓</span>
                            </th>
                            <th className='team_page_date_header'>
                                Date <span className='team_page_sort_icon'>↓</span>
                            </th>
                            {/*<th className='team_page_status_header'>
                                Status <span className='team_page_sort_icon'>↓</span>
                            </th>*/}
                            <th className='team_page_actions_header'></th>
                        </tr>
                        </thead>
                        <tbody>
                        {status === FETCH_STATUS.LOADING ? (
                            <tr>
                                <td colSpan={5} className="team_page_loading">Loading data...</td>
                            </tr>
                        ) : filteredTeams.length > 0 ? (
                            filteredTeams.map((item) => (
                                <TeamElement key={item.ID} item={item} isSelected={selectedItems[item.ID]} onSelect={handleSelectItem} staff={staff}/>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={5} className="team_page_no_data">No history data found</td>
                            </tr>
                        )}
                        </tbody>
                    </table>
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


export default TeamPage;