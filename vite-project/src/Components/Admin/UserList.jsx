import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Modal from 'react-bootstrap/Modal';
import { logout } from '../slice/authSlice';

function UserList() {
  const [show, setShow] = useState(false);
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState('');
  const [userList, setUserList] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClose = () => setShow(false);
  const handleShow = (userId, name) => {
    setUserId(userId);
    setUserName(name);
    setShow(true);
  };

  const fetchData = async () => {
    const jwtToken = localStorage.getItem('userInfo')
      ? JSON.parse(localStorage.getItem('userInfo')).jwt
      : null;

    try {
      axios.defaults.headers.common['Authorization'] = `Bearer ${jwtToken}`;
      const response = await axios.get('http://127.0.0.1:8000/api/userList/');
      setUserList(response.data);
    } catch (error) {
      if (error.response.status === 403) {
        dispatch(logout());
        navigate('/admin');
        toast.error(error.response.detail);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAction = async (userId, isActive) => {
    const setAction = !isActive;

    try {
      const response = await axios.patch(
        `http://127.0.0.1:8000/api/useredit/${userId}/`,
        {
          action: setAction,
        }
      );
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteUser = async () => {
    try {
      handleClose();
      const response = await axios.delete(
        `http://127.0.0.1:8000/api/useredit/${userId}/`
      );
      fetchData();
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
      }
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  
  const filteredUserList = userList.filter((user) =>
    user.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ paddingLeft: '5rem', paddingRight: '5rem' }}>
      <div>
        <div style={{margin:'2rem'}}>
        <h1 style={{ fontFamily:" IM FELL Great Primer SC" }}>User List</h1>


        <input
          type="text"
          placeholder="Search by username"
          value={searchQuery}
          onChange={handleSearch}
        />
        </div>

        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>NO</th>
              <th>UserName</th>
              <th>Email</th>
              <th>Status</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filteredUserList
              .sort((a, b) => a.id - b.id)
              .map((user, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td style={{ color: user.is_active ? 'green' : 'red' }}>
                    {user.is_active ? 'UnBlocked' : 'Blocked'}
                  </td>
                  <td>
                    <Button
                      variant={user.is_active ? 'outline-danger' : 'outline-success'}
                      onClick={() => handleAction(user.id, user.is_active)}
                    >
                      {user.is_active ? 'Block' : 'Unblock'}
                    </Button>{' '}
                  </td>
                  <td>
                    <Button
                      variant="outline-danger"
                      onClick={() => handleShow(user.id, user.username)}
                    >
                      Delete
                    </Button>{' '}
                  </td>
                </tr>
              ))}
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>DELETE User -- {userName}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                Delete <span> {userName}</span> Permanently
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="danger" onClick={deleteUser}>
                  Delete User
                </Button>
              </Modal.Footer>
            </Modal>
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default UserList;
