import React from "react";
import Navigation from "../components/Navigation";

const Signin = () => {
  return (
    <div>
      <Navigation />
      <form>
        <h1>Sign in</h1>
        <div class="inputs">
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
        </div>

        <p class="connexion__txt">
          I don't own an account, i am <a href="Signup.html">creating</a> one.
        </p>
        <div align="center">
          <button type="submit">Sign in</button>
        </div>
      </form>
    </div>
  );
};

export default Signin;
