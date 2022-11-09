import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { isLoggedIn, getUserData } from "../utils/libs";

import Post from "../components/Post";

const Home = () => {
  const [posts, setPosts] = useState([]);
  let navigate = useNavigate();
  const userData = getUserData();

  useEffect(() => {
    if (isLoggedIn() === false) {
      navigate("/signin");
    } else {
      fetch(`${process.env.REACT_APP_API_URL}api/posts`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${userData.token}`,
        },
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
    }
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
            likes={post.likes}
            dislikes={post.dislikes}
          />
        ))}
      </section>
    </div>
  );
};

export default Home;
