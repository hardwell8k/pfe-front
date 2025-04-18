import {useState} from "react";
import { FETCH_STATUS } from "../../fetchStatus";

import Event_element from "./event-element/event_element";
import Loading from "../../loading/loading";

import searchImg from "../../assets/search_black.svg";
import backArrowImg from "../../assets/chevron_right_black.svg";

import './current_events.css';


function Current_events(props:any){

    const [isExpanded,setIsExpanded] = useState(false);
    
    return(
        <div className={isExpanded?"UpComingEvents expanded":"UpComingEvents"}>
            <button id="open_close" onClick={()=>{setIsExpanded(!isExpanded)}}><img src={backArrowImg} alt="error"/></button>
            <div className="search">
                <img src={searchImg} alt="error" />
                <input id="searchText" type="text" />
            </div>
            {(props.status === FETCH_STATUS.LOADING)&&<Loading/>}
            {(props.status === FETCH_STATUS.SUCCESS)&&<div className="events">
                {props.UpComingEvents.map((item:any,index:number)=>(
                    <div className={`upcoming_event ${index===props.selectedUpcomingEventIndex ? "selected":""}`} onClick={()=>{if(props.selectedUpcomingEventIndex === -1){props.setselectedUpcomingEventIndex(index)}else{props.setselectedUpcomingEventIndex(-1)}}}>
                        <Event_element key={index} ID={item.ID} name={item.nom} date={item.date_debut}/>
                    </div>
                ))}
            </div>}
            {(props.status===FETCH_STATUS.ERROR)&&<div className="events">error!</div>}
        </div>
    );
}

export default Current_events;