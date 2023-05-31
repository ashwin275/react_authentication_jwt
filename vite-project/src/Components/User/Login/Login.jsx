import React, { useState ,useEffect} from 'react';
import { useNavigate ,Link} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import axios from 'axios';
import { setCredentials } from '../../slice/authSlice';
import { toast } from 'react-toastify';

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

 
  const {userInfo} = useSelector((state)=>state.auth)

  console.log(userInfo)
   useEffect(()=>{

    if (userInfo){
      navigate('/home');
    }
  },[userInfo,navigate]);


  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      email: email,
      password: password
    };

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/login/', userData, {
        withCredentials: true
      });

      const { userInfo, jwt } = response.data;

      console.log(userInfo.username);

      dispatch(setCredentials({ userInfo,jwt }));
     
      navigate('/');
      toast.success(`Welcome ${userInfo.username}`)
      
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.detail)
        toast.error(error.response.data.detail);
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="loginParentDiv p-5 parentDiv">
          <h2>LOGIN</h2>
          <div className="form-outline mb-4 mt-5">
            <input type="email" className="form-control" onChange={(e) => setEmail(e.target.value)} />
            <label className="form-label">Email address</label>
          </div>

          <div className="form-outline mb-4">
            <input type="password" className="form-control" onChange={(e) => setPassword(e.target.value)} />
            <label className="form-label">Password</label>
          </div>

          <button className="btn btn-primary btn-block mb-4">Sign in</button>

          <div className="text-center">
            <p>
              Not a member? <Link to='/signup'>Signup</Link>
            </p>
            
          </div>
        </div>
      </form>
    </div>
  );
}

export default Login;
