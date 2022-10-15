import React from "react";
import Footer from "../components/Footer";
import Post from "../components/Post";
import { useState } from "react";
import { Form } from "react-router-dom";

const Home = () => {
  const [post, setPost] = useState([]);

  fetch("http://localhost:3000/api/posts", {
    method: "GET",
  })
    .then((res) => {
      setPost(res.data[0]);
    })
    .catch((err) => {
      console.log(err);
    });
  //
  {
    Form.map((post) => {
      return (
        <div>
          <section class="posts">
            <Post
              date={props.date}
              description={props.description}
              author={props.author}
              title={props.title}
              dislike={props.dislike}
              like={props.like}
            />
          </section>
          <Footer />
        </div>
      );
    });
  }
};

export default Home;
