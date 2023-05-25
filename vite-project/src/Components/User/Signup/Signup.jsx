
import React ,{useState}from 'react'
import './Signup.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
function Signup() {
  const navigate = useNavigate();
  const [name,setName] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [error,setError] = useState('')



  const handleSubmit = async (e)=>{
    e.preventDefault();

     const userData = {
      username:name,
      email : email,
      password : password
     }

     try{
      const response = await axios.post('http://127.0.0.1:8000/api/register/',userData);
          console.log(response.data)
          navigate('/login')

     }catch(error){
      if (error.response){
       
        setError(error.response.data.email[0])
       
      }else if(error.request){
        setError('No response received from the server.');
        
      } else {
        setError('Error occurred while making the request.');
      }

     }

  }





  

  return (
        <div>

          
            <form  onSubmit={handleSubmit}>
                  <div className="loginParentDiv p-5 parentDiv">
                      <h2>SignUp</h2>
                     
                    {error}
                      <div className="form-outline mb-4 mt-5 ">
                      <input type="text" className="form-control"  onChange={(e)=>setName(e.target.value)}/>
                      <label className="form-label">Username</label>
                    </div>

                    <div className="form-outline mb-4 ">
                      <input type="email" className="form-control"  onChange={(e)=>setEmail(e.target.value)}/>
                      <label className="form-label" >Email address</label>
                    </div>


                    <div className="form-outline mb-4">
                      <input type="password" className="form-control"  onChange={(e)=>setPassword(e.target.value)}/>
                      <label className="form-label" >Password</label>
                    </div>


                    <button className="btn btn-primary btn-block mb-4" >Sign in</button>

                    <div className="text-center">
                      <p>Already have an account <a href="#!">Login</a></p>
                    </div>
                    </div>
            </form>


        </div>
  )
}

export default Signup