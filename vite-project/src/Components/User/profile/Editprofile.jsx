import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { logout } from "../../slice/authSlice";
import { toast } from 'react-toastify';
import instance from "../../../../axios";

function Editprofile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const uploadRef = useRef();
  const { userInfo } = useSelector((state) => state.auth);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [ID, setId] = useState();
  const [profile, setProfile] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const jwtToken = localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo")).jwt
      : null;
    const fetchData = async () => {
      try {
        instance.defaults.headers.common["Authorization"] = `Bearer ${jwtToken}`;
        const response = await instance.get("/userview/");
        
        setName(response.data.username);
        setEmail(response.data.email);
        setId(response.data.id);
        setProfile(`http://127.0.0.1:8000/${response.data.profile}`);
      } catch (error) {
        if (error.response.status === 403) {
          dispatch(logout());
          navigate('/login');
          toast.error(error.response.detail);
        }
      }
    };

    fetchData();
  },[]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('username', name);
    formData.append('email', email);
    formData.append('profile', selectedImage);

    try {
      const response = await instance.patch(`/userprofile/${ID}/`, formData);

      console.log(response.data);
      navigate("/profile");
    } catch (error) {
      console.log(error);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
  };
  
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="loginParentDiv p-5 parentDiv">
          <div style={{ display: "flex", flexDirection: "column" }}>
            <img
              style={{ width: "210px", height: "170px" }}
              src={selectedImage ? URL.createObjectURL(selectedImage) : profile}
              alt="profile"
            />

            <label
              style={{
                backgroundColor: "grey",
                borderRadius: "2px",
                padding: "2px 2px 2px 2px",
                marginTop: "5px",
              }}
              htmlFor="uploadFile"
            >
              Upload
            </label>
            <input
              ref={uploadRef}
              id="uploadFile"
              style={{ display: "none" }}
              onChange={handleImageChange}
              type="file"
            />
          </div>
          <br></br>
          <div className="form-outline mb-4 mt-5">
            <input
              value={name}
              type="text"
              className="form-control"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-outline mb-4">
            <input
              value={email}
              type="email"
              className="form-control"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button className="btn btn-dark btn-block mb-4">Update</button>
        </div>
      </form>
    </div>
  );
}

export default Editprofile;
