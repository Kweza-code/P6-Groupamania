import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getUserData, isLoggedIn } from "../utils/libs";

const Update = (props) => {
  const { id } = useParams();
  let navigate = useNavigate();
  const userData = getUserData();
  const [post, setPost] = useState({});

  useEffect(() => {
    if (isLoggedIn() === false) {
      navigate("/signin");
    } else {
      fetch(`${process.env.REACT_APP_API_URL}api/posts/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${userData.token}`,
        },
      })
        .then(function (res) {
          if (res.ok) {
            return res.json();
          }
        })
        .then((res) => {
          console.log(res);
          setPost(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  return (
    <div>
      <form>
        <h1>Modification de votre Publication</h1>
        <div className="inputs">
          <label htmlFor="title">Titre de la publication</label>
          <input id="title" type="text" name="title" value={post.title} />
          <label htmlFor="description">Description de la publication</label>
          <input
            id="description"
            type="text"
            name="description"
            value={post.content}
          />
          <label htmlFor="image">Image de la publication</label>
          <input
            id="image"
            name="image"
            type="file"
            accept="image/png, image/jpeg"
          ></input>
        </div>
        <div align="center">
          <button className="publish" type="submit">
            Publier
          </button>
        </div>
      </form>
    </div>
  );
};

export default Update;
