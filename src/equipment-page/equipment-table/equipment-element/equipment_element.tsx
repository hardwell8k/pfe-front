import './equipment_element.css'
import dropdown from '../../../assets/stat_minus_1_black.svg'
function Equipment_element(props:any){
    const clicked = false;
    return(
        <div className='equipement_containing_div'>
            
            <div className='equipement_containing_subdiv checkbox'>
                <input type="checkbox" name='equipment_checkbox' id='equipment_checkbox'/>
            </div>

            <div className='equipement_containing_subdiv'>
                <h3>{props.name??"name"}</h3>
            </div>

            <div className='equipement_containing_subdiv'>
                <h3>{props.categorie??"categorie"}</h3>
            </div>

            <div className='equipement_containing_subdiv'>
                <h3>{props.type??"type"}</h3>
            </div>

            <div className='equipement_containing_subdiv'>
                <h3>{props.quantite??"quantite"}</h3>
            </div>

            <div className='equipement_containing_subdiv'>
                <h3>{props.details??"-"}</h3>
            </div>

            <div className='equipement_containing_subdiv'>
                <h3>{props.disponibilite??"disponibilite"}</h3>
            </div>

            <div className={`customer_containing_dropdownarrow_subdiv `}>
                <img className={`dropdownarrow ${clicked ? 'extended':''}`} src={dropdown} alt="problem" />
            </div>
            
        </div>
    );
}

export default Equipment_element;