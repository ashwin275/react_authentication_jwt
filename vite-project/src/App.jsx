import './App.css';
import {  Routes, Route, Outlet } from 'react-router-dom';
import Login from './Components/User/Login/Login';
import Signup from './Components/User/Signup/Signup';
import Navbar from './Components/User/Navbar/navbar';
import Home from './Components/User/Home/Home';



function App() {
  return (
    <div>
     
    
    
       
       <Navbar/>
        <Routes>

         
            <Route path='/home' element={<Home />} />
           
    
        
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
       
        </Routes>
       
       
      
    
    
    </div>
  );
}

export default App;
