
import './TeamElement.css'
import addCircle from '../../assets/add_circle_24dp_blue.svg'
import dropDownarrow from '../../assets/arrow_drop_down_black.svg'
import { useState } from 'react';
import TeamStaff from '../team-staff/TeamStaff';

interface TeamElementItem{
  ID:number;
  nom:string;
  created_at : string;
  status : string;
}

interface TeamStaffitem{
  ID: number;
  nom: string;
  prenom: string;
  email: string;
  num_tel: number;
  team_id:number,
  status: string;
}

interface TeamElmentProps{
  item:TeamElementItem;
  isSelected:boolean;
  onSelect:(id:string,isSelected:boolean)=>void;
  staff:TeamStaffitem[],
}

const TeamElement : React.FC<TeamElmentProps>=({item,isSelected,onSelect,staff})=>{

  const [isOpen , setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const filteredStaff=staff.filter((staffitem)=>(staffitem.team_id===item.ID));

  return(<>
    <tr className={`team_element ${isSelected ? 'team_element--selected' : ''}`}>
      <td className="team_element_checkbox_cell">
        <input 
          type="checkbox" 
          checked={isSelected} 
          onChange={(e) => onSelect(String(item.ID), e.target.checked)}
          className="team_element_checkbox"
        />
      </td>
      <td className="team_element_name_cell">
        <div className="team_element_logo_name">  
            {/* add the logo here*/ }
          <span className="team_element_name">{item.nom}</span>
        </div>
      </td>
      <td className="team_element_members_cell">{filteredStaff.length}</td>
      <td className="team_element_creation_date_cell">
        <div className="team_element_creation_date_container">
          <span className="team_element_calendar_icon">📅</span>
          <span>{new Date(item.created_at).toLocaleDateString('en-GB',{day:'2-digit',month:'short',year:'numeric'})}</span>
        </div>
      </td>
      {/*<td className="team_element_status_cell">
        <span className={`team_element_status team_element_status--${item.status}`}>
          {item.status}
        </span>
      </td>*/}
      
      <td className="team_element_actions_cell">
        <button 
          className="team_element_more_actions" 
        >
          <img src={addCircle} alt="..." />
        </button>
        <button 
          className="team_element_more_actions" 
          onClick={()=>{toggleDropdown()}}
        >
          <img src={dropDownarrow} alt="..." className={`team_element_dropdown_button ${isOpen? '.team_element_dropdown_button--open':''}`} />
        </button>
      </td>
    </tr>
    {isOpen && filteredStaff.length>0&&(
      <tr>
        <td colSpan={6}>
          <div className={`team_element_staff_container ${isOpen? 'team_element_staff_container--open':''}`}>
            <table style={{width:'100%'}}>
              <tbody>
                {filteredStaff.map((staffItem)=>(
                  <TeamStaff key={staffItem.ID} item={staffItem} isSelected={isSelected} />
                ))}
              </tbody>
            </table>

          </div>
        </td>
      </tr>
    )}
  </>)
}

export default TeamElement;