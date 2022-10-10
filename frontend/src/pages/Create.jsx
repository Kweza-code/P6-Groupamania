import React from "react";
import Footer from "../components/Footer";
import { NavLink } from "react-router-dom";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const titleInputRef = useRef();
  const descriptionInputRef = useRef();
  let navigate = useNavigate();

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredTitle = titleInputRef.current.value;
    const enteredDescription = descriptionInputRef.current.value;

    //Preparing the data we want to send to the backend API
    let formData = new FormData();
    formData.append("title", enteredTitle);
    formData.append("description", enteredDescription);

    //Sending data to backend API
    fetch("http://localhost:3000/api/posts", {
      method: "POST",
      data: formData,
      config: { headers: { "Content-Type": "multipart/form-data" } },
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
          <input type="file" accept="image/png, image/jpeg"></input>
        </div>
        <div align="center">
          <button className="cancel">
            <NavLink to="/home">Annuler et Retourner au Home</NavLink>
          </button>
          <button type="submit">Publier</button>
        </div>
      </form>
      <Footer />
    </div>
  );
};

export default Create;
