import React, { useEffect } from 'react';
import axios from 'axios';

function Home() {
  useEffect(() => {
    const token = localStorage.getItem('token');
    const fetchData = async () => {
      try {
       
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        const response = await axios.get('http://127.0.0.1:8000/api/userview/');
        console.log(response.data);
      } catch (error) {
        if (error.response) {
          console.log(error.response.data);
        }
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1 className="parentDiv">Welcome Home</h1>
    </div>
  );
}

export default Home;
