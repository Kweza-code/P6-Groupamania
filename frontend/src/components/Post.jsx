import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { getUserData } from "../utils/libs";
import React from "react";
//userData.userId

const Post = (props) => {
  const navigate = useNavigate();
  const userData = getUserData();
  const [likeCount, setLikeCount] = useState(props.likes);
  const [dislikeCount, setDislikeCount] = useState(props.dislikes);
  const [activeBtn, setActiveBtn] = useState("none");
  const [post, setPosts] = useState([]);

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

  // Deleting PostD
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

  function update() {
    if (userData.userId === post.userId)
      <button
        className="btnotheroptions"
        type="button"
        onClick={() => navigate(`update/${props.id}`)}
      >
        Update
      </button>;
  }

  return (
    <div className="post" id={"post-" + props.id}>
      <div className="post-left">
        <img src={props.imageUrl} alt={props.title} />
      </div>
      <div className="post-right">
        <p className="post-right__date">{props.date}</p>
        <h2 className="post-right__title">{props.title}</h2>
        <p className="post-right__description">{props.description}</p>
        <p className="post-right__author">{props.author}</p>
        <div className="post-right__buttons">
          <div className="post-right__button">
            <button
              className={`btn ${activeBtn === "like" ? "like-active" : ""}`}
              onClick={() => handleLikeBtn(activeBtn === "like" ? 0 : 1)}
            >
              <span className="material-symbols-rounded"></span>
              Like {likeCount}
            </button>
            <button
              className={`btn ${
                activeBtn === "dislike" ? "dislike-active" : ""
              }`}
              onClick={() => handleLikeBtn(activeBtn === "dislike" ? 0 : -1)}
            >
              <span className="material-symbols-rounded"></span>
              Dislike {dislikeCount}
            </button>
            {userData.userId === post._id && (
              <button
                className="btnotheroptions"
                type="button"
                onClick={() => navigate(`update/${props.id}`)}
              >
                Update
              </button>
            )}
            <button
              className="btnotheroptions"
              type="button"
              onClick={() => {
                if (window.confirm("Voulez-vous supprimer cet article ?")) {
                  deletePost();
                }
              }}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
