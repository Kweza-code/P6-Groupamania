import React from "react";
import Footer from "../components/Footer";
import { NavLink } from "react-router-dom";

const Create = () => {
  const handlePost = () => {};

  const cancelPost = () => {};
  return (
    <div>
      <form>
        <h1>Création d'une publication</h1>
        <div className="inputs">
          <label>Titre de la publication</label>
          <input type="text" name="title" />
          <label>Description de la publication</label>
          <input type="text" name="description" />
          <label>Image de la publication</label>
          <input type="file" accept="image/png, image/jpeg"></input>
        </div>
        <div align="center">
          <button className="cancel" onClick={cancelPost}>
            <NavLink to="/home">Annuler et Retourner au Home</NavLink>
          </button>
          <button type="submit" onClick={handlePost}>
            Publier
          </button>
        </div>
      </form>
      <Footer />
    </div>
  );
};

export default Create;
