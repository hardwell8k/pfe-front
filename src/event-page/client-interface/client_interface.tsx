import { useEffect,useState } from 'react';

import './client_interface.css'

import ClientInterfaceClient from './client-interface-client/client_interface_client';
import ClientDepartments from '../../customer-page/table/client-departments/client_departments';
import Add_new_client_interface from "../client-interface/add-new-client-interface/add_new_client_interface";
import { FETCH_STATUS } from '../../fetchStatus';
function ClientInterface(props:any){

    const [clients,setClients] = useState([]);
    const [status,setStatus] = useState(FETCH_STATUS.IDLE);
    
    const getClients = async ()=>{
        try {
            //alert("trying");
            setStatus(FETCH_STATUS.LOADING);
            const reponse = await fetch('http://localhost:5000/api/getAllClients',{
                method:'POST',
                headers:{"Content-Type":"application/json"},
            });
    
            const result = await reponse.json();
    
            if(!result.success){
                throw({status:reponse.status,message:result.message});
            }
                
            setClients(result.data);
            setStatus(FETCH_STATUS.SUCCESS);
        } catch (error:any) {
            console.error("failed to get clients",error.message);
            setStatus(FETCH_STATUS.ERROR);
        }
    }

    function handleAddNewClientInterfaceIsVisible(){
        setAddNewClientInterfaceIsVisible(!AddNewClientInterfaceIsVisible);
    }
    
    const [AddNewClientInterfaceIsVisible,setAddNewClientInterfaceIsVisible] = useState(false);
    
    useEffect(()=>{getClients()},[]);

    if(status === FETCH_STATUS.LOADING){
        return <div className='client_interface_event_page_subdi'><p>Add New Client</p></div>
    }

    return(
        <div className='client_interface_event_page_subdi'>
            {
                clients.map((item:any)=>{
                    return(
                    <div className={`lient_interface_subdiv_element ${props.storedClientId===item.ID ? "selected":"" }`} onClick={()=>{props.handleClient_id(item.ID)}}>
                        <div className='client_interface_subdiv_client'>
                            <ClientInterfaceClient name={item.nom} domain={item.domain}/>
                        </div>

                        <div className='client_interface_subdiv_department'>
                            <ClientDepartments clientID={item.ID}/>
                        </div>
                    </div>
                        
                    )
                })
            }
            <p onClick={handleAddNewClientInterfaceIsVisible}>Add New Client</p>
            {AddNewClientInterfaceIsVisible&&<Add_new_client_interface handleAddNewClientInterfaceIsVisible={handleAddNewClientInterfaceIsVisible} setClients={setClients} clients={clients} />}
        </div>
    );
}

export default ClientInterface;