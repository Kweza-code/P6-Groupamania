import React, { useEffect, useState } from "react";

import Footer from "../components/Footer";
import Post from "../components/Post";

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/posts", {
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
            date={post.date}
            description={post.description}
            author={post.author}
            imageUrl={post.imageUrl}
            title={post.title}
            dislike={post.dislike}
            like={post.like}
          />
        ))}
      </section>
      <Footer />
    </div>
  );
};

export default Home;
