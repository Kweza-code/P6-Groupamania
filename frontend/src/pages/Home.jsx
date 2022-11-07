import React, { useEffect, useState } from "react";

import Post from "../components/Post";

const Home = () => {
  const [posts, setPosts] = useState([]);
  //Controle de la présence du token dans le local storage

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}api/posts`, {
      method: "GET",
    })
      .then(function (res) {
        if (res.ok) {
          return res.json();
        }
      })
      .then((res) => {
        console.log(res);
        setPosts(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <section className="posts">
        {posts.map((post, index) => (
          <Post
            key={post._id}
            id={post._id}
            date={post.date}
            description={post.content}
            author={post.author}
            imageUrl={post.imageUrl}
            title={post.title}
            dislikes={post.dislikes}
            likes={post.likes}
          />
        ))}
      </section>
    </div>
  );
};

export default Home;
