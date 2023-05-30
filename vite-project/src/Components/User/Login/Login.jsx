import React, { useState } from 'react';
import { useNavigate ,Link} from 'react-router-dom';

import axios from 'axios';


function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


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

      const { message, jwt } = response.data;

      console.log(jwt);
      localStorage.clear();
      localStorage.setItem('token', jwt);
     
      navigate('/home', { replace: true });
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
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
