import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { getUserData } from "../utils/libs";
import { AiFillLike, AiFillDislike } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";
import { GrUpdate } from "react-icons/gr";

import React from "react";

const Post = (props) => {
  const navigate = useNavigate();
  const userData = getUserData();
  const [likeCount, setLikeCount] = useState(props.likes);
  const [dislikeCount, setDislikeCount] = useState(props.dislikes);

  let currentActiveBtn = "none";
  //checking userdata.userId in the localstore to active The currentActiveBtn
  if (props.usersLiked.includes(userData.userId)) currentActiveBtn = "like";
  if (props.usersDisliked.includes(userData.userId))
    currentActiveBtn = "dislike";
  const [activeBtn, setActiveBtn] = useState(currentActiveBtn);

  const handleLikeBtn = (vote) => {
    // Sending to API
    fetch(`${process.env.REACT_APP_API_URL}api/posts/${props.id}/like`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${userData.token}`,
      },
      body: JSON.stringify({
        like: vote,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((res) => {
        setLikeCount(res.data.likes);
        setDislikeCount(res.data.dislikes);
        if (vote === 1) setActiveBtn("like");
        if (vote === -1) setActiveBtn("dislike");
        if (vote === 0) setActiveBtn("none");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Deleting Postid
  function deletePost() {
    fetch(`${process.env.REACT_APP_API_URL}api/posts/${props.id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${userData.token}`,
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((res) => {
        console.log(res);
        document.getElementById(`post-${props.id}`).remove();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="post" id={"post-" + props.id}>
      <div className="post-left">
        <img src={props.imageUrl} alt={props.title} />
      </div>
      <div className="post-right">
        <h2 className="post-right__title">{props.title}</h2>
        <p className="post-right__description">{props.description}</p>
        
        <div className="post-right__button">
          <div className="btn1 btnn ">
            <button
              className={`btn ${activeBtn === "like" ? "like-active" : ""}`}
              onClick={() => handleLikeBtn(activeBtn === "like" ? 0 : 1)}
            >
              <AiFillLike />
              {likeCount}
            </button>
            <button
              className={`btn ${
                activeBtn === "dislike" ? "dislike-active" : ""
              }`}
              onClick={() => handleLikeBtn(activeBtn === "dislike" ? 0 : -1)}
            >
              <AiFillDislike />
              {dislikeCount}
            </button>
          </div>
          <div className="btn1 btnn">
            {(userData.userId === props.userId || userData.admin === true) && (
              <button
                className="btnotheroptions"
                type="button"
                onClick={() => navigate(`update/${props.id}`)}
              >
                <GrUpdate />
              </button>
            )}
            {(userData.userId === props.userId || userData.admin === true) && (
              <button
                className="btnotheroptions"
                type="button"
                onClick={() => {
                  if (window.confirm("Voulez-vous supprimer cet article ?")) {
                    deletePost();
                  }
                }}
              >
                <BsTrash />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
