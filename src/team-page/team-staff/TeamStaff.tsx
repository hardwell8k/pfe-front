
import React from 'react';
import './TeamStaff.css'
import morePoints from '../../assets/more_horiz_black.svg'


interface TeamStaffitem{
    ID: number;
    nom: string;
    prenom: string;
    email: string;
    num_tel: number;
    team_id:number,
    status: string;
}

interface TeamStaffProps{
    item:TeamStaffitem;
    isSelected:boolean;
}


const TeamStaff: React.FC<TeamStaffProps> = ({item,isSelected})=>{
    return(
        <tr className={`team_staff ${isSelected ? 'team_staff--selected' : ''}`}>
      
      <td className="team_staff_name_cell">
        <div className="team_staff_logo_name">  
          <span className="team_staff_name">{item.nom} {item.prenom}</span>
        </div>
      </td>
      <td className="team_staff_phone_cell">{item.num_tel}</td>
      <td className="team_staff_email_cell">{item.email}</td>
      {/*<td className="team_staff_status_cell">
        <span className={`team_staff_status team_staff_status--${item.status}`}>
          {item.status}
        </span>
      </td>*/}

<td className="team_staff_actions_cell">
        <button 
          className="team_staff_more_actions" 
        >
          <img src={morePoints} alt="..." />
        </button>
      </td>
      
    </tr>
    )
}

export default TeamStaff