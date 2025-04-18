import './customer_page.css';
import Sidebar from '../sidebar/Sidebar';
import Table from './table/table';
import AddCustomer from './add-customer/AddCustomer';
import Department from './department/department';

import { useState } from 'react';

function Customer_page(){
    
    const [extended,setExtended] = useState(true);
    const [addDepartmentISVisible,setAddDepartmentIsVisible] = useState(false);
    const [clientID,setClientID] =useState();
    const [clients,setClients] = useState([]);

    function openAddDepartment(){
        setAddDepartmentIsVisible(!addDepartmentISVisible);
    }

    function extend(){
        setExtended(!extended);
    }

    return(
    <div className='Customer_Page_Container'>
        <Sidebar/>
        <button id='add_customer_side_open' onClick={()=>{setExtended(false)}}>+</button>
        <div className='Customer_Page_Content'>
            <Table openAddDepartment={openAddDepartment} addDepartmentISVisible={addDepartmentISVisible} extended={extended} setClientID={setClientID} clients={clients} setClients={setClients}/>
        </div>
        <AddCustomer extend={extend} extended={extended} clients={clients} setClients={setClients}/>
        {addDepartmentISVisible&&<Department clientID={clientID} openAddDepartment={openAddDepartment}/>}
    </div>
    );
}

export default Customer_page;