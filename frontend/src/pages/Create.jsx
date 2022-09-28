import React from "react";
import Footer from "../components/Footer";

const Create = () => {
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
          <button type="submit">Publier</button>
        </div>
      </form>
      <Footer />
    </div>
  );
};

export default Create;
