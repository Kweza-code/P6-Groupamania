import React from "react";
import Footer from "../components/Footer";

const Signup = () => {
  return (
    <div>
      <form>
        <h1>Sign up</h1>
        <div class="inscription__inputs">
          <input type="pseudo" placeholder="username" />
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="password" />
        </div>

        <p class="inscription__txt">
          I already have an account. <a href="Signin.html">sign in</a>
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
