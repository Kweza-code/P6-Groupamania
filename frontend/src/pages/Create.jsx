import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserData, isLoggedIn } from "../utils/libs";

const Create = () => {
  const userData = getUserData();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  let navigate = useNavigate();

  //check if he/she is loggin if not, he/she won't be able to be in the page and will be send to  signin
  useEffect(() => {
    if (isLoggedIn() === false) {
      navigate("/signin");
    }
  }, []);

  const submitHandler = (event) => {
    event.preventDefault();

    //Preparing the data we want to send to the backend API
    let formData = new FormData();
    formData.append(
      "post",
      JSON.stringify({
        title: title,
        content: content,
      })
    );
    formData.append("image", image);

    //Sending data to backend API
    fetch(`${process.env.REACT_APP_API_URL}api/posts`, {
      method: "POST",
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
        navigate("/");
      })
      .catch(function (err) {
        console.log(err);
        alert(err);
      });
  };

  return (
    <div>
      <form onSubmit={submitHandler}>
        <h1>Création d'une publication</h1>
        <div className="inputs">
          <label htmlFor="title">Titre de la publication</label>
          <input
            id="title"
            type="text"
            name="title"
            maxLength="100"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <label htmlFor="content">Description de la publication</label>
          <input
            id="content"
            type="text"
            name="description"
            value={content}
            maxLength="200"
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

export default Create;
