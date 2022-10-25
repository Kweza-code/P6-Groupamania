import React from "react";

import { NavLink } from "react-router-dom";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const titleInputRef = useRef();
  const descriptionInputRef = useRef();
  let navigate = useNavigate();

  const submitHandler = (event) => {
    event.preventDefault();

    const title = titleInputRef.current.value;
    const content = descriptionInputRef.current.value;

    //Preparing the data we want to send to the backend API
    let formData = new FormData();
    formData.append(
      "post",
      JSON.stringify({
        title: title,
        content: content,
      })
    );
    formData.append("image", document.getElementById("image").files[0]);

    //Sending data to backend API
    fetch(`${process.env.REACT_APP_API_URL}api/posts`, {
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
        navigate("/home");
      })
      .catch(function (err) {
        alert(err);
      });
  };

  return (
    <div>
      <form onSubmit={submitHandler}>
        <h1>Création d'une publication</h1>
        <div className="inputs">
          <label>Titre de la publication</label>
          <input type="text" ref={titleInputRef} name="title" />
          <label>Description de la publication</label>
          <input type="text" ref={descriptionInputRef} name="description" />
          <label>Image de la publication</label>
          <input
            id="image"
            name="image"
            type="file"
            accept="image/png, image/jpeg"
          ></input>
        </div>
        <div align="center">
          <button className="cancel">
            <NavLink to="/home">Annuler et Retourner au Home</NavLink>
          </button>
          <button type="submit">Publier</button>
        </div>
      </form>
    </div>
  );
};

export default Create;
