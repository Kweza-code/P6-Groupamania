import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { isLoggedIn, getUserData } from "../utils/libs";

const Signup = () => {
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
    fetch(`${process.env.REACT_APP_API_URL}api/auth/signup`, {
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

        navigate("/signin");
      })
      .catch(function (err) {
        console.log(err);
        alert(err);
      });
  };
  return (
    <div>
      <form onSubmit={sendData}>
        <h1>Sign up</h1>
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

        <p className="inscription__txt">
          I already have an account. <NavLink to="/signin">I connect</NavLink>
        </p>
        <div align="center">
          <button type="submit">Sign up</button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
