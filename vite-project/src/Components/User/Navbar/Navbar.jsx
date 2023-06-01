import React from 'react'
import './navbar.css'
import { Link, useNavigate } from 'react-router-dom'
import { NavDropdown ,Badge} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../slice/authSlice';
import instance from '../../../../axios';
import { toast } from 'react-toastify';
// import { Navigate } from 'react-router-dom'
function Navbar() {

  const {userInfo} = useSelector((state) => state.auth)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const res = await instance.post('/logout/');
    
      toast.success(res.data.message)
      
      dispatch(logout());
      navigate('/login');
    } catch (err) {
      console.error(err);
    }
  };
  const token = localStorage.getItem('token')


  return (


<nav className="navbar navbar-expand-lg navbar-light bg-light parent-div">

<div className="container">

  <a className="navbar-brand me-2" href="https://mdbgo.com/">
    
  </a>


  <button
    className="navbar-toggler"
    type="button"
    data-mdb-toggle="collapse"
    data-mdb-target="#navbarButtonsExample"
    aria-controls="navbarButtonsExample"
    aria-expanded="false"
    aria-label="Toggle navigation"
  >
    <i className="fas fa-bars"></i>
  </button>

  <div className="collapse navbar-collapse" id="navbarButtonsExample">
   
    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
      <li className="nav-item">

        <a className="nav-link" href="#">Home</a>

        
      </li>
    </ul>


    <div className="d-flex align-items-center">
   
   {userInfo? <NavDropdown title={userInfo.username} id='username'>

  {
    userInfo.is_superuser?

  null
    
    :
    
    (<LinkContainer to='/profile'>
       <NavDropdown.Item>Profile</NavDropdown.Item>
     </LinkContainer>)
   
    

  }

    

    <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>

   </NavDropdown>  :
    (<><Link to='/login'><button type="button" className="btn btn-secondary  px-3 me-2">Login</button></Link>
    <Link to='/signup'><button type="button" className="btn btn-secondary  px-3 me-2">Signup</button></Link></>)

}
       


    
  


      
      {/* <a
        className="btn btn-dark px-3"
        href="https://github.com/mdbootstrap/mdb-ui-kit"
        role="button"
        ><i className="fab fa-github"></i></a> */}
    </div>
  </div>

</div>

</nav>










  )
}

export default Navbar
