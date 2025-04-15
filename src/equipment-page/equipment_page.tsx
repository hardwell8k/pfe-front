import './equipment_page.css'
import Equipment_table from './equipment-table/equipment_table';
import Equipment_disponibility_graph from './equipment-disponibility-graph/equipment_disponibility_graph';
import Sidebar from '../sidebar/Sidebar';

function Equipment_page(){
    return(<>
    <Sidebar/>
    <div className='equipment_page_container'>
        <Equipment_disponibility_graph/>
        <Equipment_table/>
    </div>
    </>)
}

export default Equipment_page;