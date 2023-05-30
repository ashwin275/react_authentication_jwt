import React from 'react'
import './navbar.css'
import { Link } from 'react-router-dom'

import { Navigate } from 'react-router-dom'
function Navbar() {

  const handleLogout = ()=>{
    localStorage.clear();
    <Navigate to ="/login"/>

  }
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

       


    <Link to='/login'><button type="button" className="btn btn-secondary  px-3 me-2">Login</button></Link>
    <Link to='/signup'><button type="button" className="btn btn-secondary  px-3 me-2">Signup</button></Link>


    <Link to='/login'><button onClick={handleLogout} type="button" className="btn btn-secondary  px-3 me-2">Logout</button></Link>
  


      
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
