import { useEffect, useState } from 'react';
import Equipment_element from './equipment-element/equipment_element';
import dropdown from '../../assets/arrow_drop_down_black.svg';
import deleteIcon from '../../assets/delete_black.svg' ;
import filterIcon from '../../assets/filter_black.svg'
import './equipment_table.css'
import { FETCH_STATUS } from '../../fetchStatus';
import Loading from '../../loading/loading';

import arrow_back from '../../assets/arrow_back_black.svg';
import arrow_forward from '../../assets/arrow_forward_black.svg';

function Equipment_table(){

    const getAllEquipment = async()=>{
        try {
                    setStatus(FETCH_STATUS.LOADING);
                    const reponse = await fetch("http://localhost:5000/api/getAllEquipment",{
                        method:"POST",
                        headers:{'Content-Type':'application/json'},
                        credentials:'include',
                    });
        
                    const result = await reponse.json();
                    if(!result.success){
                        throw({status: reponse.status,message:result.message});
                    }
                    
                    setEquipments(result.data);
                    setStatus(FETCH_STATUS.SUCCESS);
                } catch (error:any) {
                    console.error("error while getting upcoming events",error.message);
                    alert(error.message);
                    setStatus(FETCH_STATUS.ERROR)
                }
    }
    
    const create_graph_data = (equipments:any)=>{
        
    }

    const [equipments,setEquipments] = useState([]);
    const [status,setStatus] = useState(FETCH_STATUS.IDLE);

    useEffect(()=>{getAllEquipment()},[]);

    return(
        <div className='equipment_table_containing_div'>
            
            <div className='equipement_table_header_div'>

                <div className='equipment_table_header_subdiv'>
                    <h3>Equipments</h3>

                    <div className='search_equipments'>

                    </div>

                    <div className='quiment_table_header_subdiv_buttons'>
                        <button id='quiment_table_header_subdiv_delete_button'><img src={deleteIcon}/>delete</button>
                        <button id='quiment_table_header_subdiv_filter_button'><img src={filterIcon}/>Filter</button>
                        <button id='quiment_table_header_subdiv_print_button'></button>
                    </div>
                </div>

                <div className='equipment_table_header_names_subdiv'>
                    <div className='equipment_table_header_names_subdiv_subdiv checkbox'>
                        <input type="checkbox" name='equipment_checkbox' id='equipment_checkbox'/>
                    </div>

                    <div className='equipment_table_header_names_subdiv_subdiv'>
                       <h3>equipment</h3> 
                       <img src={dropdown} alt="" />
                    </div>

                    <div className='equipment_table_header_names_subdiv_subdiv'>
                       <h3>Categorie</h3> 
                       <img src={dropdown} alt="" />
                    </div>

                    <div className='equipment_table_header_names_subdiv_subdiv'>
                       <h3>type</h3> 
                       <img src={dropdown} alt="" />
                    </div>

                    <div className='equipment_table_header_names_subdiv_subdiv'>
                       <h3>Quantite</h3> 
                       <img src={dropdown} alt="" />
                    </div>

                    <div className='equipment_table_header_names_subdiv_subdiv'>
                       <h3>Details</h3> 
                       <img src={dropdown} alt="" />
                    </div>

                    <div className='equipment_table_header_names_subdiv_subdiv'>
                       <h3>Disponibilite</h3>
                       <img src={dropdown} alt="" /> 
                    </div>

                </div>

            </div>

            <div className='equipment_table_elements_div'>
                {status === FETCH_STATUS.LOADING?<Loading/>
                :equipments.map((item:any)=>(
                    <Equipment_element name={item.nom} categorie={item.category_nom} type={item.type_nom} quantite={item.quantity} disponibilite={item.disponibility} details={item.details}/>
                ))}
            </div>

            <div className='equipment_table_footer_div'>
                <button><img src={arrow_back} alt="" /></button>
                <button>1</button>
                {equipments.length>1 && <button>2</button>}
                {equipments.length>3 && <button>...</button>}
                {equipments.length>2 && <button>{equipments.length}</button>}
                <button><img src={arrow_forward} alt="" /></button>
            </div>
        </div>
    );
}

export default Equipment_table;