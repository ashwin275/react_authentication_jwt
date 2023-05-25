import React from 'react'
import './Login.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import axios from 'axios'


function Login() {
    const navigate = useNavigate();
    const [email,setEmail] = useState('')
    const [password,setPassword] =  useState('')

    const handleSubmit = async (e)=>{
        e.preventDefault();
        
        const userData = {
            email:email,
            password:password
        }
        
        try{
            const response = await axios.post('http://127.0.0.1:8000/api/login/',userData,{
                withCredentials:true
            });
            console.log(response.data)
            console.log(response.headers)
            localStorage.setItem('token', response.data.token);
            navigate('/',{replace:true})
           
        }catch (error){
            if (error.response){
                console.log(error.response.data)
                
            }

        }

        

    }



       return (
    <div>


<form onSubmit={handleSubmit}>
<div className="loginParentDiv p-5 parentDiv">
    <h2>LOGIN</h2>
  <div className="form-outline mb-4 mt-5 ">
    <input type="email"  className="form-control" onChange={(e)=>setEmail(e.target.value)}/>
    <label className="form-label">Email address</label>
  </div>


  <div className="form-outline mb-4">
    <input type="password"  className="form-control" onChange={(e)=>setPassword(e.target.value)} />
    <label className="form-label" >Password</label>
  </div>




  <button  className="btn btn-primary btn-block mb-4">Sign in</button>


  <div className="text-center">
    <p>Not a member? <a href="#!">Signup</a></p>
    
    {/* <button type="button" class="btn btn-link btn-floating mx-1">
      <i class="fab fa-facebook-f"></i>
    </button>

    <button type="button" class="btn btn-link btn-floating mx-1">
      <i class="fab fa-google"></i>
    </button>

    <button type="button" class="btn btn-link btn-floating mx-1">
      <i class="fab fa-twitter"></i>
    </button>

    <button type="button" class="btn btn-link btn-floating mx-1">
      <i class="fab fa-github"></i>
    </button> */}
  </div>
  </div>
</form>
      
    </div>
  )
}

export default Login
