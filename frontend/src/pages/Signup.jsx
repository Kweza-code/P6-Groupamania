import React from "react";
import { NavLink } from "react-router-dom";
import { useRef } from "react";

const Signup = () => {
  const emailInput = useRef();
  const passwordInput = useRef();

  const sendData = (event) => {
    event.preventDefault();
    const email = emailInput.current.value;
    const password = passwordInput.current.value;

    let formData = new FormData();
    formData.append(
      "post",
      JSON.stringify({
        email: email,
        password: password,
      })
    );

    fetch("http://localhost:3000/api/auth/signup", {
      method: "POST",
      body: formData,
    })
      .then(function (res) {
        if (res.ok) {
          return res.json();
        }
      })
      .then(function (post) {
        // Checking response
        console.log(post);
      })
      .catch(function (err) {
        alert(err);
      });
  };
  return (
    <div>
      <form onSubmit={sendData}>
        <h1>Sign up</h1>
        <div className="inscription__inputs">
          <label>Email</label>
          <input type="email" placeholder="Email" ref={emailInput} />
          <label>Password</label>
          <input type="password" placeholder="password" ref={passwordInput} />
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
