import './equipment_disponibility_graph.css'
import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';


ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

function Equipment_disponibility_graph(props:any){

    const labels = ['jan','feb','mar','apr','may','jun','jul','aug','sep','oct','nov','dec'];
    
    const empty_graph_data = {
        labels: labels, 
        datasets: [
          {
            label: 'disponibilite',
            data: [], 
            borderColor: 'rgba(75,192,192,1)',
            backgroundColor: 'rgba(75,192,192,0.2)',
            tension: 0.4,
          },
        ],
      };

    const [data, setData] = useState(empty_graph_data);

    //useEffect(()=>{setData(props.data);},[props.data]);

    return(<div className='quipment_disponibility_graph_containing_div'>
        <Line data={data} />
    </div>);
}

export default Equipment_disponibility_graph;