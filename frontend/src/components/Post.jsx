import { useNavigate } from "react-router-dom";
import { useState } from "react";
import React from "react";

const Post = (props) => {
  const [likeCount, setLikeCount] = useState(50);
  const [dislikeCount, setDislikeCount] = useState(25);

  const [activeBtn, setActiveBtn] = useState("none");

  const handleLikeClick = () => {
    if (activeBtn === "none") {
      setLikeCount(likeCount + 1);
      setActiveBtn("like");
      return;
    }

    if (activeBtn === "like") {
      setLikeCount(likeCount - 1);
      setActiveBtn("none");
      return;
    }

    if (activeBtn === "dislike") {
      setLikeCount(likeCount + 1);
      setDislikeCount(dislikeCount - 1);
      setActiveBtn("like");
    }
  };

  const handleDisikeClick = () => {
    if (activeBtn === "none") {
      setDislikeCount(dislikeCount + 1);
      setActiveBtn("dislike");
      return;
    }

    if (activeBtn === "dislike") {
      setDislikeCount(dislikeCount - 1);
      setActiveBtn("none");
      return;
    }

    if (activeBtn === "like") {
      setDislikeCount(dislikeCount + 1);
      setLikeCount(likeCount - 1);
      setActiveBtn("dislike");
    }
  };

  const navigate = useNavigate();
  // Deleting PostD
  function deletePost() {
    fetch(`http://localhost:3000/api/posts/${props.id}`, {
      method: "DELETE",
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
        <p className="post-right__date">{props.date}</p>
        <h2>{props.title}</h2>
        <p className="post-right__description">{props.description}</p>
        <p className="post-right__author">{props.author}</p>
        <div className="post-right__buttons">
          <div className="post-righ__button">
            <button
              className={`btn ${activeBtn === "like" ? "like-active" : ""}`}
              onClick={handleLikeClick}
            >
              <span className="material-symbols-rounded"></span>
              Like {likeCount}
            </button>
            <button
              className={`btn ${
                activeBtn === "dislike" ? "dislike-active" : ""
              }`}
              onClick={handleDisikeClick}
            >
              <span className="material-symbols-rounded"></span>
              Dislike {dislikeCount}
            </button>
            <button
              className="btnotheroptions"
              type="button"
              onClick={() => navigate(`update/${props.id}`)}
            >
              Update
            </button>
            <button
              className="btnotheroptions"
              type="button"
              onClick={deletePost}
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
