import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Cookies from 'js-cookie';
import './index.css';
import App from './App.tsx';
import Event_page from './event-page/event_page.tsx';
import Customer_page from './customer-page/customer_page.tsx';
import Equipment_page from './equipment-page/equipment_page.tsx';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import Accounts_page from './accounts/accounts_page.tsx';
import Login_page from './login-page/login_page.tsx';
import AccountCreation from './account-creaton/AccountCreation.tsx';
import UpdateEquipment from './update-equipment/UpdateEquipment.tsx';
import AddEquipment from './add-equipment/AddEquipment.tsx';
import AddStaffInEvent from './add-staff-In-Event/AddStaffInEvent.tsx';
import AddStaff from './add-staff/AddStaff.tsx';
import AddAccomodation from './add-accomodation/AddAccomodation.tsx';
import AddWorkshop from './add-workshop/AddWorkshop.tsx';
import StaffUpdate from './update-staff/StaffUpdate.tsx';


const isLogedIn = ()=>{
  return Cookies.get('isLogedIn') === 'true';
}

const ProtectedRoute = ({ element }: { element: React.ReactNode }) => {
  return isLogedIn() ? element : <Navigate to="/" replace />;
};


const router = createBrowserRouter([
  {
    path: '/',
    element: <Login_page />,
    errorElement: <div> 404 PAGE NOT FOUND</div>
  },
  {
    path: '/event',
    element:<ProtectedRoute element={<Event_page />} />,
    errorElement: <div> 404 PAGE NOT FOUND</div>
  },
  {
    path: '/customer',
    element:<ProtectedRoute element={<Customer_page />} />,
    errorElement: <div> 404 PAGE NOT FOUND</div>
  },
  {
    path: '/equipment',
    element:<ProtectedRoute element={<Equipment_page/>} />,
    errorElement:<div> 404 PAGE NOT FOUND</div>
  },
  {
    path:'/Accounts',
    element:<ProtectedRoute element={<Accounts_page/>} />,
    errorElement:<div> 404 PAGE NOT FOUND</div>
  },
  {
    path:'/AccountCreation',
    element:<ProtectedRoute element={<AccountCreation/>} />,
    errorElement:<div> 404 PAGE NOT FOUND</div>
  },
  {
    path:'/UpdateEquipment',
    element:<ProtectedRoute element={<UpdateEquipment/>} />,
    errorElement:<div> 404 PAGE NOT FOUND</div>
  },
  {
    path:'/AddEquipment',
    element:<ProtectedRoute element={<AddEquipment/>} />,
    errorElement:<div> 404 PAGE NOT FOUND</div>
  },
  {
    path:'/AddStaffInEvent',
    element:<ProtectedRoute element={<AddStaffInEvent/>} />,
    errorElement:<div> 404 PAGE NOT FOUND</div>
  },
  {
    path:'/AddStaff',
    element:<ProtectedRoute element={<AddStaff/>} />,
    errorElement:<div> 404 PAGE NOT FOUND</div>
  },
  {
    path:'/UpdateStaff',
    element:<ProtectedRoute element={<StaffUpdate/>} />,
    errorElement:<div> 404 PAGE NOT FOUND</div>
  },
  {
    path:'/AddAccomodation',
    element:<ProtectedRoute element={<AddAccomodation/>} />,
    errorElement:<div> 404 PAGE NOT FOUND</div>
  },
  {
    path:'/AddWorkshop',
    element:<ProtectedRoute element={<AddWorkshop/>} />,
    errorElement:<div> 404 PAGE NOT FOUND</div>
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
