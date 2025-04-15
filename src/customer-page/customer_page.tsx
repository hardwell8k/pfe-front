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
    

    function openAddDepartment(){
        setAddDepartmentIsVisible(!addDepartmentISVisible);
    }

    function extend(){
        setExtended(!extended);
    }

    return(
    <div className='Customer_Page_Container'>
        <Sidebar/>
        <button id='add_customer_side_open' onClick={()=>{extend()}}>+</button>
        <div className='Customer_Page_Content'>
            <Table openAddDepartment={openAddDepartment} extended={extended} setClientID={setClientID}/>
        </div>
        <AddCustomer extend={extend} extended={extended}/>
        {addDepartmentISVisible&&<Department clientID={clientID} openAddDepartment={openAddDepartment}/>}
    </div>
    );
}

export default Customer_page;