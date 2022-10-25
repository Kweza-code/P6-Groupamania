import React, { useEffect, useState } from "react";

const Update = (props) => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:3000/api/posts/${props.id}`, {
      method: "GET",
    })
      .then(function (res) {
        if (res.ok) {
          return res.json();
        }
      })
      .then((res) => {
        console.log(res);
        setPosts(res);
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
          <label htmlFor="Title">Titre de la publication</label>
          <input type="text" name="title" value={props.title} />
          <label htmlFor="Content">Description de la publication</label>
          <input type="text" name="description" value={props.content} />
          <label htmlFor="Image">Image de la publication</label>
          <input
            id="image"
            name="image"
            type="file"
            accept="image/png, image/jpeg"
          ></input>
        </div>
        <div align="center">
          <button type="submit">Publier</button>
        </div>
      </form>
    </div>
  );
};

export default Update;
