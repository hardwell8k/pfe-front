import { useEffect,useState } from 'react';

import './client_interface.css'

import ClientInterfaceClient from './client-interface-client/client_interface_client';
import ClientDepartments from './client-departments/client_departments';
import Add_new_client_interface from "../client-interface/add-new-client-interface/add_new_client_interface";
import { FETCH_STATUS } from '../../fetchStatus';
function ClientInterface(props:any){


    function handleAddNewClientInterfaceIsVisible(){
        setAddNewClientInterfaceIsVisible(!AddNewClientInterfaceIsVisible);
    }
    
    const [AddNewClientInterfaceIsVisible,setAddNewClientInterfaceIsVisible] = useState(false);
    
    

    if(props.status === FETCH_STATUS.LOADING){
        return <div className='client_interface_event_page_subdi'><p>Add New Client</p></div>
    }

    return(
        <div className='client_interface_event_page_subdi'>
            <div className='client_interface_subdiv_clients'>
            {props.clients.map((item:any)=>{
                    return(
                    <div className={`client_interface_subdiv_element ${props.storedClientId===item.ID ? "selected":"" }`} onClick={()=>{ if (props.storedClientId===item.ID){props.handleClient_id(null);props.setClientName("");}else{props.handleClient_id(item.ID);props.setClientName(item.nom)}}}>
                        <div className='client_interface_subdiv_client'>
                            <ClientInterfaceClient name={item.nom} domain={item.domain}/>
                        </div>

                        {props.storedClientId===item.ID&&<div className='client_interface_subdiv_department'>
                            <ClientDepartments clientID={item.ID}/>
                        </div>}
                    </div>
                        
                    )
                })
            }
            </div>
            <p onClick={handleAddNewClientInterfaceIsVisible} id='add_new_client_interface_button'>Add New Client</p>
            {AddNewClientInterfaceIsVisible&&<Add_new_client_interface handleAddNewClientInterfaceIsVisible={handleAddNewClientInterfaceIsVisible} setClients={props.setClients} clients={props.clients} />}
        </div>
    );
}

export default ClientInterface;