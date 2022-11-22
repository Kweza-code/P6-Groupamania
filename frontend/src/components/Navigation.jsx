import React from "react";
import { NavLink } from "react-router-dom";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { isLoggedIn, setUserData } from "../utils/libs";

const Navigation = () => {
  const [post, setPosts] = useState([]);

  //Logout
  let navigate = useNavigate();
  function logout() {
    setUserData({});
    navigate("/signin");
  }
  // Using Navlink for my navigation || is LoggedIn check if he is loggin
  return (
    <div className="navigation">
      <nav>
        <Header />
        <ul>
          {isLoggedIn() && (
            <NavLink to="/">
              <li>Home</li>
            </NavLink>
          )}
          {isLoggedIn() && (
            <NavLink to="/create">
              <li>Create</li>
            </NavLink>
          )}
          {isLoggedIn() === false && (
            <NavLink to="/signin">
              <li>Signin</li>
            </NavLink>
          )}
          {isLoggedIn() === false && (
            <NavLink to="/signup">
              <li>Signup</li>
            </NavLink>
          )}
          {isLoggedIn() && (
            <button className="btnlogout" type="button" onClick={logout}>
              logout
            </button>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Navigation;
