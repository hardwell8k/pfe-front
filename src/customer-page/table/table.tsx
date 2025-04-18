import { useState,useEffect } from 'react';
import dropImg from '../../assets/arrow_drop_down_black.svg'
import './table.css'

import Customer from '../customer/customer';
import ClientDepartments from './client-departments/client_departments';

function content(props:any){

    
    
    const [selectedClient,setSelectedClient] = useState(-1);

    const getClients = async ()=>{
        try {
            //alert("trying");
            const reponse = await fetch('http://localhost:5000/api/getAllClients',{
                method:'POST',
                headers:{"Content-Type":"application/json"},
            });

            const result = await reponse.json();

            if(!result.success){
                throw({status:reponse.status,message:result.message});
            }
            
            props.setClients(result.data);
        } catch (error:any) {
            console.error("failed to get clients",error.message);
        }
    }

    
    useEffect(()=>{getClients()},[]);
    return(
        
        <div className='table'>
            <div className="head">
                <div className="Customer_Table_Title">
                    <input type="checkbox" name="all_customers_checkbox" id="all_customers_checkbox" />
                </div>
                <div className="Customer_Table_Title">
                    <h3>Customer id</h3>
                    <img src={dropImg}/>
                </div>

                <div className="Customer_Table_Title">
                    <h3>name</h3>
                    <img src={dropImg}/>
                </div>

                <div className="Customer_Table_Title">
                    <h3>Email</h3>
                    <img src={dropImg}/>
                </div>

                <div className="Customer_Table_Title">
                    <h3>Phone number</h3>
                    <img src={dropImg}/>
                </div>

                <div className="Customer_Table_Title">
                    <h3>Domain</h3>
                    <img src={dropImg}/>
                </div>
            </div>
            
            <div className='customers'>
                {(props.clients).map((item:any)=>{
                    return(<>
                        <Customer client_id={item.ID} name={item.nom} email={item.email} phone_number={item.num_tel} domain={item.domain} extend extended={props.extended} openAddDepartment={props.openAddDepartment} setClientID={props.setClientID} setSelectedClient={setSelectedClient} addDepartmentISVisible={props.addDepartmentISVisible}/>
                        {selectedClient === item.ID && <ClientDepartments clientID={item.ID}/>}
                    </>);
                })}
            </div> 
        </div>
        
        
        
        
    );
}

export default content;