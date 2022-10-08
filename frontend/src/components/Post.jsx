import React from "react";

const Post = (props) => {
  return (
    <div className="post" data-id={props.id}>
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
              <span>{props.like}</span>
            </button>
            <button className="favorite styled" type="button">
              Dislike
              <span>{props.dislike}</span>
            </button>
            <button className="favorite styled" type="button">
              Update
            </button>
            <button className="favorite styled" type="button">
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
