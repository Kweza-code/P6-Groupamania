import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import { useNavigate } from "react-router-dom";
import { isLoggedIn, setUserData } from "../utils/libs";

const Signin = () => {
  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  useEffect(() => {
    if (isLoggedIn()) {
      navigate("/home");
    }
  }, []);

  const sendData = (event) => {
    event.preventDefault();

    // -- Envoyer le formulaire au backend via un fetch POST
    fetch(`${process.env.REACT_APP_API_URL}api/auth/login`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then(async function (res) {
        let responseJson = await res.json();
        if (![200, 201].includes(res.status)) throw responseJson.error;
        // Custom code
        setUserData(responseJson);
        navigate("/home");
      })
      .catch(function (err) {
        console.log(err);
        alert(err);
      });
  };
  return (
    <div>
      <form onSubmit={sendData} id="sign-up-form">
        <h1>Sign in</h1>
        <div className="inscription__inputs">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="password.error"></div>
        <p className="connexion__txt">
          I don't own an account, i am{" "}
          <NavLink to="/signup">creating one</NavLink>
        </p>
        <div align="center">
          <button type="submit">Sign in</button>
        </div>
      </form>
    </div>
  );
};

export default Signin;
