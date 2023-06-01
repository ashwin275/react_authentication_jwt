import React, { useEffect, useState } from "react";
import "./profile.css";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import instance from "../../../../axios";

function Profile() {
  const { userInfo } = useSelector((state) => state.auth);
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  function fetchData() {
    const jwtToken = localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo")).jwt
      : null;

    instance.defaults.headers.common["Authorization"] = `Bearer ${jwtToken}`;

    instance.get("/userview/").then((res) => {
    
      setUserName(res.data.username);
      setEmail(res.data.email);
      setImage(res.data.profile);
    });
  }

  return (
    <div>
      <h2 className="heading"  style={{ fontFamily:" IM FELL Great Primer SC" }}>User Profile</h2>

      <div className="customdiv">
        <Card style={{ width: "18rem" }}>
          <Card.Img
            variant="top"
            src={
              image
                ? `http://localhost:8000/${image}`
                : "https://static.vecteezy.com/system/resources/previews/016/293/983/original/profile-avatar-ui-element-template-user-account-editable-isolated-dashboard-component-flat-user-interface-visual-data-presentation-web-design-widget-for-mobile-application-with-dark-theme-vector.jpg"
            }
          />
          
          <ListGroup className="list-group-flush">
            <ListGroup.Item>
              <strong>Name:</strong> {username}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Email:</strong> {email}
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </div>
      <Link to='/editProfile'><button type="button" className="btn btn-dark  px-3 me-2">Update</button></Link>
    </div>
  );
}

export default Profile;
