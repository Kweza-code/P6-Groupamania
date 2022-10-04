import React from "react";
import Footer from "../components/Footer";
import { NavLink } from "react-router-dom";
import { useRef } from "react";

const Create = () => {
  const titleInputRef = useRef();
  const descriptionInputRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();
  };
  console.log(titleInputRef);

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
