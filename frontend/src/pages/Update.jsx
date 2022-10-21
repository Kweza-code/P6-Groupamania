import React from "react";

const update = () => {
  return (
    <div>
      <form>
        <h1>Modification de votre Publication</h1>
        <div className="inputs">
          <label>Titre de la publication</label>
          <input type="text" name="title" />
          <label>Description de la publication</label>
          <input type="text" name="description" />
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
            Annuler la modification et Retourner au Home
          </button>
          <button ontype="submit">Publier</button>
        </div>
      </form>
    </div>
  );
};

export default update;
