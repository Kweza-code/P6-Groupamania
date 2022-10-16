import React from "react";
import Footer from "../components/Footer";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    const emailError = document.querySelector(".email.error");
    const passwordError = document.querySelector(".password.error");

    axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}api/user/login`,
      withCredentials: true,
      data: {
        email,
        password,
      },
    })
      .then((res) => {
        console.log(res);
        if (res.data.errors) {
          emailError.innerHTML = res.data.errors.email;
          passwordError.innerHTML = res.data.errors.password;
        } else {
          window.location = "/";
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <form action="" onSubmit={handleLogin} id="sign-up-form">
        <h1>Sign in</h1>
        <div className="inputs">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            name="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="Email"
          />
          <div className="email.error"></div>
          <label htmlFor="password">Mot de passe</label>
          <input
            type="password"
            placeholder="Password"
            name="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
        <div className="password.error"></div>
        <p className="connexion__txt">
          I don't own an account, i am{" "}
          <NavLink to="/signup">creating one</NavLink>
        </p>
        <div align="center">
          <input type="submit" value="Se connecter" />
        </div>
      </form>
      <Footer />
    </div>
  );
};

export default Signin;
