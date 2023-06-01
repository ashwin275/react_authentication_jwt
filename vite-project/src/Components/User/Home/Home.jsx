import React, { useEffect, useState } from 'react';
import axios from 'axios';
import instance from '../../../../axios';
import Button from 'react-bootstrap/Button';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

function Home() {
  const [SuperUser,setSuperUser] = useState(false)
  const [loading, setLoading] = useState(true);

 
  useEffect(() => {
    const jwtToken = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')).jwt : null;
    const fetchData = async () => {
      try {
       
        instance.defaults.headers.common['Authorization'] = `Bearer ${jwtToken}`;
        const response = await instance.get('/userview/');
        setSuperUser(response.data.is_superuser)
        setLoading(false)
      } catch (error) {
        if (error.response) {
          console.log(error.response.data);
        }
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }


  let content;


  if (SuperUser) {
    content = (
      <div>
        
        <h1  className="parentDiv" style={{ fontFamily:" IM FELL Great Primer SC" }}>WELCOME ADMIN</h1>
        

<Link to='/UserList'><Button variant="outline-secondary">DashBoard</Button></Link>

        
      </div>
    );
  } else {
    content = (
      <div>
        <h1  className="parentDiv" style={{ fontFamily:" IM FELL Great Primer SC" }}>WELCOME HOME</h1>
      </div>
    );
  }




  return (

  <div>{content}</div>
    
  );
}

export default Home;
