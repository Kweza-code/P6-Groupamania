import React from "react";

const Signin = () => {
  return (
    <div>
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
      <footer>
        <h3 class="Copiright">&copy; Groupamania 2022</h3>
      </footer>
    </div>
  );
};

export default Signin;
