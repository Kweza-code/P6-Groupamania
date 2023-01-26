import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { isLoggedIn } from "../utils/libs";

const Signup = () => {
  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");

  //Checking if he/she is logged in, if yes, he/she will be send to the home page
  useEffect(() => {
    if (isLoggedIn()) {
      navigate("/");
    }
  }, []);

  const sendData = (event) => {
    event.preventDefault();

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
        userName: userName,
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
