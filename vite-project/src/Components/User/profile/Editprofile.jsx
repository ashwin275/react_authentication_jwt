import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Editprofile() {
  const navigate = useNavigate();
  const uploadRef = useRef();
  const { userInfo } = useSelector((state) => state.auth);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [ID, setId] = useState("");
  const [profile, setProfile] = useState(null);
  let image;

  useEffect(() => {
    const jwtToken = localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo")).jwt
      : null;
    const fetchData = async () => {
      try {
        axios.defaults.headers.common["Authorization"] = `Bearer ${jwtToken}`;
        const response = await axios.get("http://127.0.0.1:8000/api/userview/");
        console.log(response.data);
        setName(response.data.username);
        setEmail(response.data.email);
        setId(response.data.id);
        console.log(ID);
      } catch (error) {
        if (error.response) {
          console.log(error.response.data);
        }
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
console.log(profile,'//////////');
    const Userdata = {
      username: name,
      email: email,
      profile: profile,
    };

    try {
      const response = await axios.patch(
        `http://127.0.0.1:8000/api/userprofile/${ID}/`,
        Userdata,
        {
          headers: {
            'Content-Type': `multipart/form-data`,
          },
        }
      );

      console.log(response.data);
      navigate("/profile");
    } catch (error) {
      console.log(error);
    }
  };

  {
    profile
      ? (image = URL.createObjectURL(profile))
      : userInfo.userInfo.profile
      ? (image = `http://127.0.0.1:8000/${userInfo.userInfo.profile}`)
      : (image = false);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="loginParentDiv p-5 parentDiv">
          <div style={{ display: "flex", flexDirection: "column" }}>
            <img
              style={{ width: "210px", height: "170px" }}
              src={
                image
                  ? image
                  : "https://static.vecteezy.com/system/resources/previews/016/293/983/original/profile-avatar-ui-element-template-user-account-editable-isolated-dashboard-component-flat-user-interface-visual-data-presentation-web-design-widget-for-mobile-application-with-dark-theme-vector.jpg"
              }
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
              onChange={(e) => setProfile(e.target.files[0])}
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
