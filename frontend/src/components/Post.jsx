import { useNavigate } from "react-router-dom";
import React from "react";

const Post = (props) => {
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
            <button className="favorite styled" type="button">
              Like ({props.likes})
            </button>
            <button className="favorite styled" type="button">
              Dislike ({props.dislikes})
            </button>
            <button
              className="favorite styled"
              type="button"
              onClick={() => navigate(`update/${props.id}`)}
            >
              Update
            </button>
            <button
              className="favorite styled"
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
