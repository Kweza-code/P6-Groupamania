import React from "react";
import Footer from "../components/Footer";
import { NavLink } from "react-router-dom";

const Signup = () => {
  return (
    <div>
      <form>
        <h1>Sign up</h1>
        <div className="inscription__inputs">
          <label>Email</label>
          <input type="email" placeholder="Email" />
          <label>Password</label>
          <input type="password" placeholder="password" />
        </div>

        <p className="inscription__txt">
          I already have an account. <NavLink to="/signin">I connect</NavLink>
        </p>
        <div align="center">
          <button type="submit">Sign up</button>
        </div>
      </form>
      <Footer />
    </div>
  );
};

export default Signup;
