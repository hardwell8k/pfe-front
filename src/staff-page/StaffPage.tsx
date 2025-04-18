import Sidebar from '../sidebar/Sidebar';
import { useState } from 'react';
import './StaffPage.css';

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
    const [status,setStatus] = useState(FETCH_STATUS.IDLE);
    
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
        cutout: '99%',
      };

    return(
        <div className='staff_page'>
            <Sidebar/>
            <div className='staff_page_content'>

                <div className='staff_page_content_graphs'>

                    <div className='staff_page_content_bargraph'>
                        <Bar options={BarOptions} data={BarData} />
                    </div>

                    <div className='staff_page_content_circlegraph'>
                        <Doughnut data={DoughnutData} options={DoughnutOptions} />
                    </div>

                </div>
                
                <div className='staff_page_content_table'>
                    <h1>Staff</h1>
                </div>

            </div>

        </div>
    );
}

export default StaffPage;