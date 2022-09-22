import React from "react";
import { NavLink } from "react-router-dom";

const Navigation = () => {
  return (
    <div className="navigation">
      <nav>
        <h2>Groupomania</h2>
        <ul>
          <NavLink to="/">
            <li>Home</li>
          </NavLink>
          <NavLink to="/create">
            <li>Create</li>
          </NavLink>
          <NavLink to="/signin">
            <li>Sign in</li>
          </NavLink>
          <NavLink to="/signup">
            <li>Sign up</li>
          </NavLink>
        </ul>
      </nav>
    </div>
  );
};

export default Navigation;
