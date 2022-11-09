import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { isLoggedIn, setUserData } from "../utils/libs";

const Signin = () => {
  const emailInput = useRef();
  const passwordInput = useRef();
  let navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn()) {
      navigate("/home");
    }
  }, []);

  const sendData = (event) => {
    event.preventDefault();
    const email = emailInput.current.value;
    const password = passwordInput.current.value;

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
          <input id="email" type="email" placeholder="Email" ref={emailInput} />
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="password"
            ref={passwordInput}
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
