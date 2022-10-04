import React from "react";

const Post = (props) => {
  return (
    <div class="post" data-id={props.id}>
      <div class="post-left">
        <img src={props.imageUrl} alt={props.title} />
      </div>
      <div class="post-right">
        <p class="post-right__date">{props.date}</p>
        <h2>{props.title}</h2>
        <p class="post-right__description">{props.description}</p>
        <p class="post-right__author">{props.author}</p>
        <div class="post-right__buttons">
          <div class="post-righ__button">
            <button class="favorite styled" type="button">
              Like
              <span>{props.like}</span>
            </button>
            <button class="favorite styled" type="button">
              Dislike
              <span>{props.dislike}</span>
            </button>
            <button class="favorite styled" type="button">
              Update
            </button>
            <button class="favorite styled" type="button">
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
