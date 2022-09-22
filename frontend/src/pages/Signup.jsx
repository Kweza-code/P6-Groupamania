import React from "react";
import Navigation from "../components/Navigation";
const Signup = () => {
  return (
    <div>
      <Navigation />
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
      <footer>
        <h3 class="Copiright">&copy; Groupamania 2022</h3>
      </footer>
    </div>
  );
};

export default Signup;
