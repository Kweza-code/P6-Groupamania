import React from "react";
import { NavLink } from "react-router-dom";
import Header from "./Header";

const Navigation = () => {
  return (
    <div className="navigation">
      <nav>
        <Header />
        <ul>
          <NavLink to="/">
            <li>Home</li>
          </NavLink>
          <NavLink to="/create">
            <li>Create</li>
          </NavLink>
          <NavLink to="/signin">
            <li>Signin</li>
          </NavLink>
          <NavLink to="/signup">
            <li>Signup</li>
          </NavLink>
          <NavLink to="/signup">
            <li>Logout</li>
          </NavLink>
        </ul>
      </nav>
    </div>
  );
};

export default Navigation;
