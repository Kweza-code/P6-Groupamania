import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getUserData, isLoggedIn } from "../utils/libs";

const Update = (props) => {
  const { id } = useParams();
  let navigate = useNavigate();
  const userData = getUserData();
  const [post, setPost] = useState({});
  const [image, setImage] = useState();

  function setTitle(newTitle) {
    setPost({ ...post, title: newTitle });
  }

  function setContent(newContent) {
    setPost({ ...post, content: newContent });
  }

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

  const submitHandler = (event) => {
    event.preventDefault();

    //Preparing the data we want to send to the backend API
    let formData = new FormData();
    formData.append(
      "post",
      JSON.stringify({
        title: post.title,
        content: post.content,
      })
    );
    formData.append("image", image);

    //Sending data to backend API
    fetch(`${process.env.REACT_APP_API_URL}api/posts/${id}`, {
      method: "PUT",
      body: formData,
      headers: {
        Authorization: `Bearer ${userData.token}`,
      },
    })
      .then(async function (res) {
        let responseJson = await res.json();
        if (![200, 201].includes(res.status)) throw responseJson.error;
      })
      .then(function (post) {
        navigate("/home");
      })
      .catch(function (err) {
        console.log(err);
        alert(err);
      });
  };

  return (
    <div>
      <form onSubmit={submitHandler}>
        <h1>Modification de votre Publication</h1>
        <div className="inputs">
          <label htmlFor="title">Titre de la publication</label>
          <input
            id="title"
            type="text"
            name="title"
            value={post.title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <label htmlFor="description">Description de la publication</label>
          <input
            id="description"
            type="text"
            name="description"
            value={post.content}
            onChange={(e) => setContent(e.target.value)}
          />
          <label htmlFor="image">Image de la publication</label>
          <input
            id="image"
            name="image"
            type="file"
            accept="image/png, image/jpeg"
            onChange={(e) => setImage(e.target.files[0])}
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
