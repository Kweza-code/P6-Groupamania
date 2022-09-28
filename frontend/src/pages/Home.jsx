import React from "react";
import Footer from "../components/Footer";
import Post from "../components/Post";

const Home = () => {
  return (
    <div>
      <section class="posts">
        <Post />
        <Post />
      </section>
      <Footer />
    </div>
  );
};

export default Home;
