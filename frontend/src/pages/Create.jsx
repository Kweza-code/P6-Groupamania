import React from "react";
import Navigation from "../components/Navigation";

const Create = () => {
  return (
    <div>
      <Navigation />
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
          <button type="submit">Publier</button>
        </div>
      </form>
    </div>
  );
};

export default Create;
