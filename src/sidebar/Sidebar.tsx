import { useState } from "react";
import Element from "./element";
import './Sidebar.css'


import clientImg from '../assets/handshake_black.svg'
import eventImg from '../assets/event_black.svg'
import teamImg from '../assets/groups_black.svg'
import equipmentImg from '../assets/package_black.svg'
import staffImg from '../assets/person_black.svg'
import historyImg from '../assets/history_black.svg'
import settingsImg from '../assets/settings_black.svg'
import logoutImg from '../assets/logout_black.svg'
import dropdown from '../assets/arrow_drop_down_black.svg'
import accountsImg from '../assets/accounts_black.svg'
import carImg from '../assets/swap_driving_black.svg'
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

type MenuState = Record<string, boolean>


function Sidebar(){

    const [menuIsVisible,setMenuIsVisible] = useState<MenuState>({
        equipment:false,
        staff:false
    });

    const updateInvisible = (name : string):void=>{
        setMenuIsVisible(
            (current)=>{
                return {
                    ...current,
                    [name] : !current[name],
                };
            }
        );

    }

    const navigate = useNavigate();

    return(
        
        <div className="sidebarholder">
            <img id="logo" src={eventImg}></img>
            
            <ul>
                
                <li>
                    <Element imgUrl={eventImg} link="/event" name="event"/>
                </li>

                <li>
                    <Element imgUrl={clientImg} link="/customer" name="customer"/>
                </li>

                <li>
                    <span>
                        <Element imgUrl={equipmentImg} link="/equipment" name="equipment"/>
                        <img className="dropdownarrow" onClick={()=>{updateInvisible("equipment")}} src={dropdown} alt="problem" />
                    </span>
                    <ul className={`sub_menu ${menuIsVisible.equipment? 'visible':''}`}>
                        <li><a href="/AddEquipment">add equipment</a></li>
                        <li><a href="/UpdateEquipment">update equipment</a></li>
                    </ul>
                </li>

                <li>
                    <Element imgUrl={teamImg} link="/teamPage" name="Teams"/>
                </li>

                <li>
                    <span>
                        <Element imgUrl={staffImg} link="/staff" name="Staff"/>
                        <img className="dropdownarrow" onClick={()=>{updateInvisible("staff")}} src={dropdown} alt="problem" />
                    </span>
                    <ul className={`sub_menu ${menuIsVisible.staff? 'visible':''}`}>
                        <li><a href="/AddStaff">add staff</a></li>
                        <li><a href="/UpdateStaff">update staff</a></li>
                    </ul>
                </li>

                <li>
                    <Element imgUrl={historyImg} link="/history" name="History"/>
                </li>

                <li>
                    <Element imgUrl={accountsImg} link="/Accounts" name="Accounts"/>
                </li>
                    <Element imgUrl={carImg} link="/car" name="car"/>
                <li>

                </li>
            </ul>

            <div className="account">
                <img id="setting" src={settingsImg} alt="problem" />
                <img id="accountimg" src={staffImg} alt="problem"/>
                <div className="username">
                    <h3>Easin Arafat</h3>
                    <p>Admin</p>
                </div>
                <img src={logoutImg} alt="problem" onClick={()=>{Cookies.remove("isLogedIn",{secure:true,sameSite:"strict"});navigate("/")}}/>
            </div>
        </div>
        
        
        
        
       
        
    );
}

export default Sidebar