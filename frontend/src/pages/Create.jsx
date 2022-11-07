import React from "react";
import { NavLink } from "react-router-dom";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const titleInputRef = useRef();
  const descriptionInputRef = useRef();
  let navigate = useNavigate();

  const submitHandler = (event) => {
    event.preventDefault();

    const title = titleInputRef.current.value;
    const content = descriptionInputRef.current.value;

    //Preparing the data we want to send to the backend API
    let formData = new FormData();
    formData.append(
      "post",
      JSON.stringify({
        title: title,
        content: content,
      })
    );
    formData.append("image", document.getElementById("image").files[0]);

    function getUserToken() {
      let userToken = localStorage.getItem("token");
      console.log("userToken");
      if (userToken != null) {
        /////
      }
    }

    function getUserId() {
      let userId = localStorage.getItem("userId");
      if (userId != null) {
        /////
      }
    }

    //Sending data to backend API
    fetch(`${process.env.REACT_APP_API_URL}api/posts`, {
      method: "POST",
      body: formData,
    })
      .then(async function (res) {
        let responseJson = await res.json();
        if (![200, 201].includes(res.status)) throw responseJson.error;
      })
      .then(function (post) {
        getUserToken();
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
        <h1>Création d'une publication</h1>
        <div className="inputs">
          <label htmlFor="title">Titre de la publication</label>
          <input id="title" type="text" ref={titleInputRef} name="title" />
          <label htmlFor="content">Description de la publication</label>
          <input
            id="content"
            type="text"
            ref={descriptionInputRef}
            name="description"
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
          <button type="submit">Publier</button>
        </div>
      </form>
    </div>
  );
};

export default Create;
