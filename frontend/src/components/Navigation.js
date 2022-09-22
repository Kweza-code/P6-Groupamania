import React from "react";
import { NavLink } from "react-router-dom";

const Navigation = () => {
  return (
    <div className="navigation">
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
    </div>
  );
};

export default Navigation;
