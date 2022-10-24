import React, { useEffect, useState } from "react";
import Post from "../components/Post";

const Update = (props) => {
  useEffect(() => {
    fetch(`http://localhost:3000/api/posts/6356600dffd993a1c316241e`, {
      method: "GET",
    })
      .then(function (res) {
        if (res.ok) {
          return res.json();
        }
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <form>
        <h1>Modification de votre Publication</h1>
        <div className="inputs">
          <label>Titre de la publication</label>
          <textarea name="Title" id={props.title} cols="30" rows="10">
            {props.title}
          </textarea>
          <input type="text" name="title" />
          <label>Description de la publication</label>
          <textarea name="Title" id={props.title} cols="30" rows="10">
            {props.content}
          </textarea>
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

export default Update;
