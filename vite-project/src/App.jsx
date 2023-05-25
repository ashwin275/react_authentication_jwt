import './App.css';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import Login from './Components/User/Login/Login';
import Signup from './Components/User/Signup/Signup';
import Navbar from './Components/User/Navbar/navbar';
import Home from './Components/User/Home/Home';

function App() {
  return (
    <div>
      <Router>
       <Navbar/>
        <Routes>
          <Route exact path="/" element={<Outlet />}>
            <Route index element={<Home />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
