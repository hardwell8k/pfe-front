import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Accounts_element from './accounts_element/accounts_element';
import Sidebar from '../sidebar/Sidebar';
import {FETCH_STATUS} from '../fetchStatus'
import Loading from '../loading/loading';
import './accounts_page.css';
import searchIcon from '../assets/search_black.svg'
import arrow_back from '../assets/arrow_back_black.svg'
import arrow_forward from '../assets/arrow_forward_black.svg'

function Accounts_page(){
    const navigate = useNavigate();
    
    const getAllAccounts = async() =>{
        try {
            alert("get all accounts");
            setStatus(FETCH_STATUS.LOADING);
            const reponse = await fetch("http://localhost:5000/api/getAcounts",{
                method:'POST',
                headers:{'content-type':'application/json'},
                credentials:'include',
            });

            const result = await reponse.json();

            if(!result.success){
                throw({status:result.status,message:result.message})
            }
            setAccounts(result.data);
            setStatus(FETCH_STATUS.SUCCESS);
        } catch (error:any) {
            console.error("error while getting the accounts",error.message);
            setStatus(FETCH_STATUS.ERROR);
        }
    }

    const [status, setStatus] = useState(FETCH_STATUS.IDLE);
    const [accounts, setAccounts] = useState([]);

    useEffect(()=>{getAllAccounts()},[]);
    return(
        <>
        <Sidebar/>
        <div className="accounts_page_container">
            <div className='accounts_page_table'>
                <div className='accounts_page_header'>
                    <h2>Accounts</h2>
                    <div className='accounts_serch_div'>
                        <img src={searchIcon} alt="" />
                        <input type="text" placeholder='Search'/>
                    </div>
                    <select name="filter_accounts" id="filter_accounts">
                        <option value="nom">nom</option>
                        <option value="role">role</option>
                        <option value="email">email</option>
                        <option value="team">team</option>
                        <option value="type">type</option>
                    </select>
                    <button onClick={()=>{navigate('/AccountCreation')}}>+ add an account</button>
                </div>
                <div className='accounts_elements_div'>
                    {status === FETCH_STATUS.LOADING?<Loading/>
                    :accounts.map((item:any)=>(
                        <Accounts_element name={item.name} role={item.role} email={item.email} team={item.team} type={item.type}/>
                    ))}
                </div>
                <div className='accounts_page_footer'>
                    <button><img src={arrow_back} alt="" /></button>
                    <button>1</button>
                    {accounts.length>1 && <button>2</button>}
                    {accounts.length>3 && <button>...</button>}
                    {accounts.length>2 && <button>{accounts.length}</button>}
                    <button><img src={arrow_forward} alt="" /></button>
                </div>
            </div>
        </div>
        </>
    )
}

export default Accounts_page;