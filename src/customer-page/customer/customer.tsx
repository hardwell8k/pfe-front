import './customer.css';

function Customer(props:any){
    return(
        <div className="customer_containing_div" onClick={()=>{props.setSelectedClient(props.client_id)}}>
            <div className='customer_containing_subdiv checkbox'>
                <input type="checkbox" name='customer_checkbox' id='customer_checkbox'/>
            </div>
            <div className='customer_containing_subdiv'>
                <h3>{props.id??"id"}</h3>
            </div>
            <div className='customer_containing_subdiv'>
                <h3>{props.name??"name"}</h3>
            </div>
            <div className='customer_containing_subdiv'>
                <h3>{props.email??"email"}</h3>
            </div>
            <div className='customer_containing_subdiv'>
                <h3>{props.phone_number??"phone number"}</h3>
            </div>
            <div className='customer_containing_subdiv'>
                <h3>{props.domain??"domain"}</h3>
            </div>
            <div className={`customer_containing_button_subdiv ${(props.extended&&!props.addDepartmentISVisible)?'extended':''}`}>
                <button id='add_department_button' onClick={()=>{props.setClientID(props.client_id);props.openAddDepartment()}}> add department</button>
            </div>
        </div>
    );
}

export default Customer