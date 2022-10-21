import { useNavigate } from "react-router-dom";
import React from "react";

const Post = (props) => {
  const navigate = useNavigate();
  return (
    <div className="post" id="post-345" data-id={props.id}>
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
              Like
              <span>{props.like}</span> <span>(X)</span>
            </button>
            <button className="favorite styled" type="button">
              Dislike <span>(X)</span>
              <span>{props.dislike}</span>
            </button>
            <button
              className="favorite styled"
              type="button"
              onClick={() => navigate("update")}
            >
              Update
            </button>
            <button
              className="favorite styled"
              type="button"
              id="postDeleteButton"
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
