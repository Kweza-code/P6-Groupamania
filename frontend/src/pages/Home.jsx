import React from "react";
import Footer from "../components/Footer";
import Post from "../components/Post";
import { useState } from "react";
import { Form } from "react-router-dom";

const Home = () => {
  const [posts, setPosts] = useState([]);

  fetch("http://localhost:3000/api/posts", {
    method: "GET",
  })
    .then((res) => {
      setPosts(res.data[0]);
    })
    .catch((err) => {
      console.log(err);
    });
  //
  {
    posts.map((post) => {
      return (
        <div>
          <section class="posts">
            <Post
              date={post.date}
              description={post.description}
              author={post.author}
              title={post.title}
              dislike={post.dislike}
              like={post.like}
            />
          </section>
          <Footer />
        </div>
      );
    });
  }
};

export default Home;
