import './accounts_element.css';

function Accounts_element(props:any){
    return(
        <div className="accounts_element_container">
            
            <div className='accounts_containing_subdiv checkbox'>
                <input type="checkbox" name='equipment_checkbox' id='equipment_checkbox'/>
            </div>

            <div className='accounts_containing_subdiv'>
                <h3>{props.name??"name"}</h3>
            </div>

            <div className='accounts_containing_subdiv'>
                <h3>{props.role??"Role"}</h3>
            </div>

            <div className='accounts_containing_subdiv'>
                <h3>{props.email??"email"}</h3>
            </div>

            <div className='accounts_containing_subdiv'>
                <h3>{props.team??"-"}</h3>
            </div>

            <div className='accounts_containing_subdiv'>
                <h3 id='accounts_type'>{props.type??"type"}</h3>
            </div>

        </div>
    )
}

export default Accounts_element;
