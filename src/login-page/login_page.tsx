import{useForm} from 'react-hook-form';
import { useState } from 'react';
import { FETCH_STATUS } from '../fetchStatus';
import {useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import './login_page.css';
import Loading from '../loading/loading';


function Login_page(){
    const navigate = useNavigate();
    const logIn = async (data:any)=>{
        try {
            setStatus(FETCH_STATUS.LOADING);
            const reponse = await fetch("http://localhost:5000/api/LogIn",{
                method:"POST",
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify({email:data.email,password:data.password}),
                credentials: 'include',
            });

            const result = await reponse.json();
            
            if(!result.success){
                throw({status: reponse.status,message:result.message});
            }
            
            setStatus(FETCH_STATUS.SUCCESS);

            Cookies.set('isLogedIn',result.success,{expires:1/8,secure:true,sameSite:'strict'});
            navigate('/event');
        } catch (error:any) {
            console.error("error while getting upcoming events",error.message);
            alert(error.message);
            setStatus(FETCH_STATUS.ERROR)
        }
    }

    const {register, handleSubmit, formState:{errors}} = useForm();
    const [status,setStatus] = useState(FETCH_STATUS.IDLE);
    
    return(<div className='login_page_container'>
        <div className='login_page_img'>
            <img src='' alt='login_img'/>
        </div>
        <div className='login_page_form_containing_div' onSubmit={handleSubmit(logIn)}>
            {status === FETCH_STATUS.LOADING?<Loading/>
            :<form className='login_page_form'>
                <div className='login_page_form_input_div'>
                    <p>Email</p>
                    <input type='text' placeholder='Enter your email' {...register('email',{required:'EMAIL IS REQUIRED',pattern:/^[^\s@]+@[^\s@]+\.[^\s@]+$/i})}/>
                    {errors.email && <p className='error-message'>{String(errors.email.message)}</p>}
                </div>
                <div className='login_page_form_input_div'>
                    <p>Password</p>
                    <input type='password' placeholder='Enter your password' {...register('password',{required:'PASSWORD IS REQUIRED'})}/>
                    {errors.password && <p className='error-message'>{String(errors.password.message)}</p>}
                </div>
                <button type='submit'>Log In</button>
            </form>}
        </div>
    </div>)
}

export default Login_page;