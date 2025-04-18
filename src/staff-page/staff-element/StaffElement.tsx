import moreHorizontalIcon from '../../assets/more_horiz_black.svg';
import './StaffElement.css';

import {useState} from 'react';
import { useNavigate } from 'react-router-dom';

function StaffElement(props:any){
    const navigate = useNavigate();
    const [isOptionsVisible, setIsOptionsVisible] = useState(false);
    return(
        <div className="accounts_element_container">
            
            {<div className='accounts_containing_subdiv checkbox'>
                <input type="checkbox" name='equipment_checkbox' id='equipment_checkbox'/>
            </div>}

            <div className='accounts_containing_subdiv'>
                <h3>{props.name??"nom"}</h3>
            </div>

            <div className='accounts_containing_subdiv'>
                <h3>{props.departement??"departement"}</h3>
            </div>

            <div className='accounts_containing_subdiv'>
                <h3>{props.tel??"numero de telephone"}</h3>
            </div>

            <div className='accounts_containing_subdiv'>
                <h3>{props.email??"email"}</h3>
            </div>

            <div className='accounts_containing_subdiv'>
                <h3 id='accounts_type'>{props.team??"-"}</h3>
            </div>

            {/*<div className='accounts_containing_subdiv'>
                <h3 id='accounts_type'>{props.team??"-"}</h3>
            </div>*/}

            <div className='accounts_containing_subdiv'>
                <img src={moreHorizontalIcon} alt="" onClick={() => setIsOptionsVisible(!isOptionsVisible)}/>
            </div>
            {isOptionsVisible && <div className='StaffElement_options_div'>
                <h3 onClick={() => {navigate('/UpdateStaff')}}>edit</h3>
                <h3>delete</h3>
            </div>}
        </div>
    );
}

export default StaffElement;