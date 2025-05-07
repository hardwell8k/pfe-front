import { Search } from 'lucide-react';
import { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Accounts_element from './accounts_element/accounts_element';
import Sidebar from '../sidebar/Sidebar';
import {FETCH_STATUS} from '../fetchStatus'
import Loading from '../loading/loading';
import './accounts_page.css';
import searchIcon from '../assets/search_black.svg'
import arrow_back from '../assets/arrow_back_black.svg'
import arrow_forward from '../assets/arrow_forward_black.svg'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import arrowBack from '../assets/arrow_back_black.svg';
import arrowForward from '../assets/arrow_forward_black.svg';
import AddAccountModal from './add-account/AddAccountModal';
import UpdateAccountModal from './update-account/UpdateAccountModal';

interface accountItem{
ID:number;
nom:string;
role:string;
email:string;
team:string;
type:string;
activation_date:string;
deactivation_date:string;
}

interface selectedItems{
    [key:string]:boolean;
}

function Accounts_page(){
    const navigate = useNavigate();
    
    const getAllAccounts = async() =>{
        try {
            setStatus(FETCH_STATUS.LOADING);
            const reponse = await fetch("http://localhost:5000/api/getAcounts",{
                method:'GET',
                headers:{'content-type':'application/json'},
                credentials:'include',
            });

            const result = await reponse.json();

            if(!result.success){
                throw({status:result.status,message:result.message})
            }
            setAccounts(result.data);
            setStatus(FETCH_STATUS.SUCCESS);
            console.log(JSON.stringify(accounts));
        } catch (error:any) {
            console.error("error while getting the accounts",error.message);
            setStatus(FETCH_STATUS.ERROR);
            toast.error("error while getting the accounts");
        }
    }

    const [status, setStatus] = useState(FETCH_STATUS.IDLE);
    const [accounts, setAccounts] = useState<accountItem[]>([]);
    const [selectedItems, setSelectedItems] = useState<selectedItems>({});
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [isModalOpen, setIsModalOpen]= useState<boolean>(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false); 
    const [accountToUpdate , setAccountToUpdate] = useState<accountItem>({
        ID:0,
        nom:"",
        role:"",
        email:"",
        team:"",
        type:"",
        activation_date:"",
        deactivation_date:"",
        });
    const [currentPage, setCurrentPage] = useState(1);
    const itemPerPage = 5;

    const IndexOfLastItem = itemPerPage * currentPage;
    const IndexOfFirstItem = IndexOfLastItem - itemPerPage;


    const filteredAccounts = accounts.filter((item=>{
        return(
            (item.nom&&(item.nom).toLowerCase().includes(searchTerm.toLowerCase()))||
            (item.email&&(item.email).toLowerCase().includes(searchTerm.toLowerCase()))||
            (item.role&&(item.role).toLowerCase().includes(searchTerm.toLowerCase()))||
            (item.team&&(item.team).toLowerCase().includes(searchTerm.toLowerCase()))||
            (item.type&&(item.type).toLowerCase().includes(searchTerm.toLowerCase()))
        );
    }))

    const shownAccounts = filteredAccounts.slice(IndexOfFirstItem,IndexOfLastItem);

    const allSelected = shownAccounts.length>0&&shownAccounts.every((item)=>(selectedItems[item.ID]));

    const handleSelectItem = (id:string,isSelected:boolean)=>{
        setSelectedItems((prev)=>({
            ...prev,
            [id]:isSelected,
        }))
    }

    const handleSelectAll = (e:ChangeEvent<HTMLInputElement>)=>{
        const isSelected = e.target.checked;
        const newSelectedItems : selectedItems = {};

        shownAccounts.forEach((item)=>{
            newSelectedItems[item.ID] = isSelected;

        })
        setSelectedItems(newSelectedItems);
    }


    useEffect(()=>{getAllAccounts()},[]);
    return(          
        <div className='accounts_page'>
        <Sidebar />
        <div className='accounts_page_container'>
            <div className='accounts_page_container_header'>
            <div className='accounts_page_container_title'>Accounts</div>
            <div className='accounts_page_container_search'>
                <Search className='accounts_page_search_icon' size={20} />
                <input
                type="text"
                placeholder='Search'
                className='accounts_page_container_search_input'
                value={searchTerm}
                onChange={(e) => { setSearchTerm(e.target.value) }}
                />
            </div>
            <div className='accounts_page_container_add_accounts'>
                {/*<button onClick={()=>{navigate('/AccountCreation')}}>+ add an account</button>*/}
                <button 
                className='accounts_page_container_add_accounts_button'
                onClick={() => setIsModalOpen(true)}
                > + add Account</button>
                
            </div>
            </div>
            <div className='accounts_page_container_table_container'>
            <table className='accounts_page_container_table'>
                <thead>
                    <tr>
                        <th className='accounts_page_container_table_checkbox_header'>
                            <input
                                type="checkbox"
                                checked={allSelected}
                                onChange={handleSelectAll}
                            />
                        </th>
                        <th className='accounts_page_container_table_name_header'>
                        nom
                        </th>
                        <th className='accounts_page_container_table_matricule_header'>
                        role
                        </th>
                        <th className='accounts_page_container_table_category_header'>
                        email
                        </th>
                        <th className='accounts_page_container_table_nbr_place_header'>
                        team 
                        </th>
                        <th className='accounts_page_container_table_nbr_place_header'>
                        type 
                        </th>
                        <th className='accounts_page_container_table_actions_header'></th>
                    </tr>
                </thead>
                <tbody>
                {status === FETCH_STATUS.LOADING ? (
                    <tr>
                    <td colSpan={7} className="accounts_page_table_loading">Loading data...</td>
                    </tr>
                ) : filteredAccounts.length > 0 ? (
                    shownAccounts.map((item) => (
                        <Accounts_element key={item.ID} item={item} isSelected={selectedItems[item.ID]} onSelect={handleSelectItem} setUpdate={setAccountToUpdate} setIsUpdateModalOpen={setIsUpdateModalOpen}/>
                    ))
                ) : (
                    <tr>
                    <td colSpan={7} className="accounts_page_table_no_data">No Accounts data found</td>
                    </tr>
                )}
                </tbody>
                <tfoot>
                <tr>
                    <td colSpan={7}>
                    <div className='accounts_page_table_footer_nav_buttons'>
                        <button className='accounts_page_table_prev' onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}>
                        <img src={arrowBack} alt="" />
                        </button>
                        <button onClick={() => setCurrentPage(1)} className={currentPage === 1 ? 'active_page_button' : ''}>1</button>
                        {(filteredAccounts.length / 5) > 1 && (
                        <button onClick={() => setCurrentPage(2)} className={currentPage === 2 ? 'active_page_button' : ''}>2</button>
                        )}
                        {(filteredAccounts.length / 5) > 2 && (
                        <button onClick={() => setCurrentPage(3)} className={currentPage === 3 ? 'active_page_button' : ''}>3</button>
                        )}
                        {(filteredAccounts.length / 5) > 4 && <button disabled>...</button>}
                        {(filteredAccounts.length / 5) > 3 && (
                        <button onClick={() => setCurrentPage(Math.floor(filteredAccounts.length / 5) + 1)} className={currentPage === (Math.floor(filteredAccounts.length / 5) + 1) ? 'active_page_button' : ''}>
                            {Math.floor(filteredAccounts.length / 5) + 1}
                        </button>
                        )}
                        <button className='accounts_page_table_next' onClick={() => currentPage < Math.floor(filteredAccounts.length / 5) + 1 && setCurrentPage(currentPage + 1)}>
                        <img src={arrowForward} alt="" />
                        </button>
                    </div>
                    </td>
                </tr>
                </tfoot>
            </table>
            </div>
        </div>

        <AddAccountModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        getAccounts={getAllAccounts}
        />

        <UpdateAccountModal
        isOpen={isUpdateModalOpen}
        onClose={() => setIsUpdateModalOpen(false)}
        getAccounts={getAllAccounts}
        account={accountToUpdate}/>

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

export default Accounts_page;