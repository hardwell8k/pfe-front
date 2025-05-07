import moreHorizontalIcon from '../../assets/more_horiz_black.svg';
import './StaffElement.css';

import {useState} from 'react';
import { useNavigate } from 'react-router-dom';

function StaffElement(props:any){
    const navigate = useNavigate();
    
    const deleteStaff = async ()=>{
        try {
          
            const reponse = await fetch("http://localhost:5000/api/deleteStaff",{
                method:"DELETE",
                headers:{'Content-Type':'application/json'},
                credentials:'include',
                body:JSON.stringify({"ID":props.id}),
            });
    
            const result = await reponse.json();
            if(!result.success){
                throw({status: reponse.status,message:result.message});
            }
            
            setDeleted(true);
        
        }catch (error:any) {
          console.error("error while getting upcoming events",error.message);
          alert(error.message);
        }
      }


    const [isOptionsVisible, setIsOptionsVisible] = useState(false);
    const [deleted,setDeleted] = useState(false);
    return(
        <div className={`accounts_element_container ${deleted ? "deleted":""}`}>
            
            {<div className='accounts_containing_subdiv checkbox'>
                <input type="checkbox" name='equipment_checkbox' id='equipment_checkbox'/>
            </div>}

            <div className='accounts_containing_subdiv'>
                <h3>{props.name?`${props.name} ${props.surname}`:"nom"}</h3>
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
                <h3 onClick={() => {navigate('/UpdateStaff',{state:{ID:props.id,nom:props.name,prenom:props.surname,num_tel:props.tel,email:props.email,team:props.team}})}}>edit</h3>
                <h3 onClick={()=>{deleteStaff()}}>delete</h3>
            </div>}
        </div>
    );
}

export default StaffElement;