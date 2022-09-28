import React from "react";
import Footer from "../components/Footer";
import { NavLink } from "react-router-dom";

const Signin = () => {
  return (
    <div>
      <form>
        <h1>Sign in</h1>
        <div class="inputs">
          <label>Email</label>
          <input type="email" placeholder="Email" />
          <label>Password</label>
          <input type="password" placeholder="Password" />
        </div>

        <p class="connexion__txt">
          I don't own an account, i am{" "}
          <NavLink to="/signup">creating one</NavLink>
        </p>
        <div align="center">
          <button type="submit">Sign in</button>
        </div>
      </form>
      <Footer />
    </div>
  );
};

export default Signin;
