import Sidebar from '../sidebar/Sidebar';
import { useState } from 'react';
import './StaffPage.css';
import arrow_back from '../assets/arrow_back_black.svg';
import arrow_forward from '../assets/arrow_forward_black.svg';
import searchIcon from '../assets/search_black.svg';
import StaffElement from './staff-element/StaffElement';

import { FETCH_STATUS } from '../fetchStatus';

import { Bar, Doughnut } from 'react-chartjs-2';
import {
    ChartOptions,
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
  } from 'chart.js';
import Loading from '../loading/loading';
import { useNavigate } from 'react-router-dom';

  ChartJS.register(
    CategoryScale,
    LinearScale,
    ArcElement,
    BarElement,
    Title,
    Tooltip,
    Legend
);

function StaffPage(){
    const navigate = useNavigate();
    const StaticStaff = [
        {
          name: "Jane Cooper",
          departement: "Marketing",
          phoneNumber: "(225) 555-0118",
          email: "jane@microsoft.com",
          team: "team10",
          status: "Available"
        },
        {
          name: "Floyd Miles",
          departement: "RH",
          phoneNumber: "(205) 555-0100",
          email: "floyd@yahoo.com",
          team: "team3",
          status: "not Available"
        },
        {
          name: "Ronald Richards",
          departement: "Finance",
          phoneNumber: "(302) 555-0107",
          email: "ronald@adobe.com",
          team: "team1",
          status: "not Available"
        },
        {
          name: "Marvin McKinney",
          departement: "Marketing",
          phoneNumber: "(252) 555-0126",
          email: "marvin@tesla.com",
          team: "team2",
          status: "Available"
        },
        {
          name: "Jerome Bell",
          departement: "Finance",
          phoneNumber: "(629) 555-0129",
          email: "jerome@google.com",
          team: "team13",
          status: "Available"
        },
        {
          name: "Kathryn Murphy",
          departement: "RH",
          phoneNumber: "(406) 555-0120",
          email: "kathryn@microsoft.com",
          team: "team2",
          status: "Available"
        },
        {
          name: "Jacob Jones",
          departement: "RH",
          phoneNumber: "(208) 555-0112",
          email: "jacob@yahoo.com",
          team: "team14",
          status: "Available"
        },
        {
          name: "Kristin Watson",
          departement: "Marketing",
          phoneNumber: "(704) 555-0127",
          email: "kristin@facebook.com",
          team: "team1",
          status: "can"
        }
      ];

    const [status,setStatus] = useState(FETCH_STATUS.IDLE);
    const [staff,setStaff] = useState(StaticStaff);

    const BarOptions:ChartOptions<'bar'> = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: '',
          },
        },
        scales: {
          x: {
            stacked: false,
          },
          y: {
            stacked: false,
          },
        },
    };
    
    
    
    const BarData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
        datasets: [
          {
            label: 'participated events',
            data: [5, 6, 6, 4, 1],
            backgroundColor: 'rgba(0, 68, 255, 0.6)',
            barPercentage: 0.6,
            categoryPercentage: 1.0,
            grouped: false, 
          },
          {
            label: 'total events',
            data: [8, 7, 6, 9, 13],
            backgroundColor: 'rgba(153, 102, 255, 0.3)',
            barPercentage: 0.6,
            categoryPercentage: 1.0,
            grouped: false, 
          },
        ],
    };
    
    const DoughnutData = {
        labels: ['disponible', 'non disponible'],
        datasets: [
          {
            label: 'Progress',
            data: [70, 30],
            backgroundColor: [
              'rgba(75, 192, 192, 0.8)', 
              'rgba(200, 200, 200, 0.3)'  
            ],
            borderWidth: 1,
          },
        ],
      };
    
      const DoughnutOptions = {
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom' as const,
          },
          title: {
            display: true,
            text: 'Progress Overview',
          },
        },
        cutout: '95%',
      };

      

    return(
        <div className='staff_page'>
            <Sidebar/>
            <div className='staff_page_content'>
                <button onClick={()=>{navigate('/AddStaff')}}>+</button>
                <div className='staff_page_content_graphs'>

                    <div className='staff_page_content_bargraph'>
                        <Bar options={BarOptions} data={BarData} />
                    </div>

                    <div className='staff_page_content_circlegraph'>
                        <Doughnut data={DoughnutData} options={DoughnutOptions} />
                    </div>

                </div>
                
                <div className='staff_page_content_table'>
                <div className='staff_page_header'>
                    <h2>Staff</h2>
                    <div className='staff_search_filter_div'>
                        <div className='staff_serch_div'>
                            <img src={searchIcon} alt="" />
                            <input type="text" placeholder='Search'/>
                        </div>
                        <select name="filter_staff" id="filter_staff">
                            <option value="nom">nom</option>
                            <option value="email">role</option>
                            <option value="team">email</option>
                            <option value="departement">team</option>
                            
                        </select>
                    </div>
                </div>
                <div className='staff_page_content_table_header'>
                    <h3>employee</h3>
                    <h3>departement</h3>
                    <h3>phone number</h3>
                    <h3>email</h3>
                    <h3>team</h3>
                    
                </div>
                <div className='staff_elements_div'>
                    {status === FETCH_STATUS.LOADING?<Loading/>
                    :staff.map((item:any)=>(
                        <StaffElement name={item.name} departement={item.departement} email={item.email} team={item.team} tel={item.phoneNumber}/>
                    ))}
                </div>
                <div className='staff_page_footer'>
                    <button><img src={arrow_back} alt="" /></button>
                    <button>1</button>
                    {staff.length>1 && <button>2</button>}
                    {staff.length>3 && <button>...</button>}
                    {staff.length>2 && <button>{staff.length}</button>}
                    <button><img src={arrow_forward} alt="" /></button>
                </div>
                </div>

            </div>

        </div>
    );
}

export default StaffPage;