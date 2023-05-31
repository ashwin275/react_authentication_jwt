import './App.css';
import {  Routes, Route, Outlet } from 'react-router-dom';
import Login from './Components/User/Login/Login';
import Signup from './Components/User/Signup/Signup';
import Navbar from './Components/User/Navbar/navbar';
import Home from './Components/User/Home/Home';
import Profile from './Components/User/profile/Profile';
import Editprofile from './Components/User/profile/Editprofile';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoute from './Components/privateRoute/PrivateRoute';


function App() {
  return (
    <div>
     
    
    
       
       <Navbar/>
       <ToastContainer/>
        <Routes>

         <Route path='' element={<PrivateRoute/>}>
         <Route path='/' element={<Home />} />
         <Route path='/home' element={<Home />} />
         <Route path='/profile' element={<Profile/>}/>
         <Route path='/editProfile' element={<Editprofile/>}/>


         </Route>
         
           
         
        
          <Route path="/login" element={<Login  />} />
          <Route path="/signup" element={<Signup />} />
       
        </Routes>
       
       
      
    
    
    </div>
  );
}

export default App;
